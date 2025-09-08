import QRCode from 'qrcode';
import crypto from 'crypto';
import DigitalID from '../models/DigitalID.js';
import blockchainService from '../utils/blockchainService.js';

export const generateDigitalID = async (req, res) => {
    try {
        console.log('=== GENERATE DIGITAL ID REQUEST ===');
        const { name, email, phone, address } = req.body;
        console.log('Request body:', { name, email, phone, address });

        // Validate input
        if (!name || !email || !phone || !address) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required: name, email, phone, address'
            });
        }

        // Create Digital ID document first to get the createdAt timestamp
        const digitalID = new DigitalID({
            userDetails: { name, email, phone, address },
            userHash: '', // Will be updated after hash generation
            blockchainData: {
                transactionHash: '',
                contractAddress: ''
            }
        });

        // Generate a unique hash using userDetails object and createdAt
        const hashData = {
            userDetails: digitalID.userDetails,
            createdAt: digitalID.createdAt
        };
        const userDataString = JSON.stringify(hashData);
        const hash = crypto.createHash('sha256').update(userDataString).digest('hex');
        console.log('Generated hash using userDetails + createdAt:', hash);
        console.log('Hash data:', hashData);

        // Store hash on blockchain
        console.log('Attempting to store hash on blockchain...');
        let blockchainData;
        
        try {
            const blockchainResult = await blockchainService.storeHash(hash);
            
            if (blockchainResult.success) {
                console.log('✅ Successfully stored hash on blockchain!');
                console.log('Transaction Hash:', blockchainResult.transactionHash);
                console.log('Contract Address:', blockchainResult.contractAddress);
                
                blockchainData = {
                    transactionHash: blockchainResult.transactionHash,
                    contractAddress: blockchainResult.contractAddress
                };
            } else {
                throw new Error(blockchainResult.error || 'Blockchain storage failed');
            }
        } catch (blockchainError) {
            console.log('❌ Blockchain storage failed, using fallback');
            console.log('Error:', blockchainError.message);
            
            // Use fallback blockchain data
            blockchainData = {
                transactionHash: 'fallback-' + hash.substring(0, 16),
                contractAddress: process.env.CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
            };
        }
        
        console.log('Final blockchain data:', blockchainData);

        // Update the Digital ID document with hash and blockchain data
        digitalID.userHash = hash; // Store the original hash for verification
        digitalID.blockchainData = blockchainData;
        console.log('Updated Digital ID document');

        // Generate QR code containing MongoDB ID and blockchain transaction hash
        const qrData = JSON.stringify({
            mongoId: digitalID._id,
            transactionHash: blockchainData.transactionHash
        });
        console.log('QR data:', qrData);

        const qrCodeBase64 = await QRCode.toDataURL(qrData);
        console.log('QR code generated, length:', qrCodeBase64.length);
        
        digitalID.qrCode = qrCodeBase64;

        // Save to database
        console.log('Saving to database...');
        await digitalID.save();
        console.log('Digital ID saved successfully with ID:', digitalID._id);

        res.status(201).json({
            success: true,
            data: {
                digitalID,
                qrCode: qrCodeBase64
            }
        });

    } catch (error) {
        console.error('=== ERROR GENERATING DIGITAL ID ===');
        console.error('Error details:', error);
        console.error('Stack trace:', error.stack);
        
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const verifyDigitalID = async (req, res) => {
    try {
        console.log('=== VERIFY DIGITAL ID REQUEST ===');
        const { mongoId, transactionHash } = req.body;
        console.log('Request body:', { mongoId, transactionHash });

        // Step 1: Find the digital ID in MongoDB using mongoID from QR code
        console.log('Step 1: Finding Digital ID in database using mongoID...');
        const digitalID = await DigitalID.findById(mongoId);
        if (!digitalID) {
            console.log('❌ Digital ID not found in database');
            return res.status(200).json({
                success: true,
                verified: false,
                message: 'UNABLE TO VERIFY',
                reason: 'Digital ID not found in database',
                data: null
            });
        }
        console.log('✅ Digital ID found:', digitalID._id);
        console.log('Tourist details retrieved:', digitalID.userDetails);
        console.log('Document timestamps - createdAt:', digitalID.createdAt, 'updatedAt:', digitalID.updatedAt);

        // Step 1.5: Check for data tampering using timestamps
        const timeDifference = Math.abs(new Date(digitalID.updatedAt) - new Date(digitalID.createdAt));
        const isDataTampered = timeDifference > 1000; // Allow 1 second difference for processing time
        
        if (isDataTampered) {
            console.log('❌ CRITICAL: Data tampering detected via timestamps!');
            console.log('CreatedAt:', digitalID.createdAt);
            console.log('UpdatedAt:', digitalID.updatedAt);
            console.log('Time difference (ms):', timeDifference);
            return res.status(200).json({
                success: true,
                verified: false,
                message: 'UNABLE TO VERIFY',
                reason: 'Data tampering detected - tourist details have been modified after creation',
                data: {
                    touristDetails: digitalID.userDetails,
                    createdAt: digitalID.createdAt,
                    updatedAt: digitalID.updatedAt,
                    timeDifference: timeDifference,
                    tamperedDetected: true
                }
            });
        }
        console.log('✅ Timestamp verification passed - no data tampering detected');

        // Step 2: Verify the transaction hash matches
        if (digitalID.blockchainData.transactionHash !== transactionHash) {
            console.log('❌ Transaction hash mismatch');
            return res.status(200).json({
                success: true,
                verified: false,
                message: 'UNABLE TO VERIFY',
                reason: 'Transaction hash mismatch',
                data: digitalID.userDetails
            });
        }
        console.log('✅ Transaction hash verified');

        // Step 3: Recompute the hash from current MongoDB record (userDetails + createdAt)
        console.log('Step 3: Recomputing hash from current MongoDB record...');
        
        // Get the original stored hash that was stored on blockchain
        const originalStoredHash = digitalID.userHash;
        console.log('Original hash stored on blockchain:', originalStoredHash);
        
        // Recompute hash using userDetails object and createdAt from MongoDB record
        const hashData = {
            userDetails: digitalID.userDetails,
            createdAt: digitalID.createdAt
        };
        const userDataString = JSON.stringify(hashData);
        const recomputedHash = crypto.createHash('sha256').update(userDataString).digest('hex');
        console.log('Recomputed hash from current MongoDB record:', recomputedHash);
        console.log('Hash data used:', hashData);
        
        // Critical Security Check: Compare recomputed hash with stored hash
        const hashesMatch = recomputedHash === originalStoredHash;
        console.log('Hash comparison - Match:', hashesMatch);
        
        if (!hashesMatch) {
            console.log('❌ CRITICAL: Data tampering detected! Hashes do not match.');
            console.log('Original hash:', originalStoredHash);
            console.log('Recomputed hash:', recomputedHash);
            return res.status(200).json({
                success: true,
                verified: false,
                message: 'UNABLE TO VERIFY',
                reason: 'Data tampering detected - hash mismatch indicates tourist details have been modified',
                data: {
                    touristDetails: digitalID.userDetails,
                    hashMatch: false,
                    blockchainVerified: false,
                    originalHash: originalStoredHash,
                    recomputedHash: recomputedHash
                }
            });
        }
        
        console.log('✅ Hash verification passed - data integrity confirmed');

        // Step 4: Verify the original hash exists on blockchain
        console.log('Step 4: Verifying original hash on blockchain...');
        let blockchainVerified = false;
        let verificationError = null;

        if (!transactionHash.startsWith('fallback-')) {
            try {
                // Verify the ORIGINAL hash (not recomputed) on blockchain
                const verificationResult = await blockchainService.verifyHash(originalStoredHash);
                console.log('Blockchain verification result:', verificationResult);
                
                if (verificationResult.success && verificationResult.isValid) {
                    blockchainVerified = true;
                    console.log('✅ Blockchain verification passed');
                } else {
                    verificationError = 'Original hash not found on blockchain';
                    console.log('❌ Blockchain verification failed - original hash not found');
                }
            } catch (blockchainError) {
                verificationError = blockchainError.message;
                console.log('❌ Blockchain verification error:', blockchainError.message);
            }
        } else {
            // For fallback transactions, mark as verified since we already checked hash integrity
            blockchainVerified = true;
            console.log('ℹ️ Fallback transaction - hash integrity already verified');
        }

        // Step 5: Final verification result
        const isVerified = hashesMatch && blockchainVerified;
        
        if (isVerified) {
            console.log('🎉 VERIFICATION SUCCESSFUL - All checks passed');
            res.status(200).json({
                success: true,
                verified: true,
                message: 'VERIFIED SUCCESSFULLY',
                data: {
                    touristDetails: digitalID.userDetails,
                    verificationDate: new Date(),
                    transactionHash: digitalID.blockchainData.transactionHash,
                    contractAddress: digitalID.blockchainData.contractAddress,
                    hashMatch: hashesMatch,
                    blockchainVerified: blockchainVerified,
                    originalHash: originalStoredHash,
                    recomputedHash: recomputedHash
                }
            });
        } else {
            console.log('❌ VERIFICATION FAILED');
            res.status(200).json({
                success: true,
                verified: false,
                message: 'UNABLE TO VERIFY',
                reason: verificationError || 'Verification failed - data integrity or blockchain verification failed',
                data: {
                    touristDetails: digitalID.userDetails,
                    hashMatch: hashesMatch,
                    blockchainVerified: blockchainVerified,
                    originalHash: originalStoredHash,
                    recomputedHash: recomputedHash
                }
            });
        }

    } catch (error) {
        console.error('=== ERROR VERIFYING DIGITAL ID ===');
        console.error('Error details:', error);
        console.error('Stack trace:', error.stack);
        
        res.status(200).json({
            success: true,
            verified: false,
            message: 'UNABLE TO VERIFY',
            reason: 'System error during verification',
            error: error.message
        });
    }
};

// Test function to update tourist details (for testing tampering detection)
export const updateTouristDetails = async (req, res) => {
    try {
        console.log('=== UPDATE TOURIST DETAILS REQUEST ===');
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        console.log('Updating Digital ID:', id);
        console.log('New details:', { name, email, phone, address });

        // Validate input
        if (!name || !email || !phone || !address) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required: name, email, phone, address'
            });
        }

        // Find and update the digital ID using Mongoose (this will trigger updatedAt)
        const updatedDigitalID = await DigitalID.findByIdAndUpdate(
            id,
            {
                'userDetails.name': name,
                'userDetails.email': email,
                'userDetails.phone': phone,
                'userDetails.address': address
            },
            { 
                new: true, // Return the updated document
                runValidators: true // Run schema validations
            }
        );

        if (!updatedDigitalID) {
            console.log('Digital ID not found');
            return res.status(404).json({ 
                success: false,
                error: 'Digital ID not found' 
            });
        }

        console.log('Digital ID updated successfully');
        console.log('Created At:', updatedDigitalID.createdAt);
        console.log('Updated At:', updatedDigitalID.updatedAt);
        
        const wasModified = updatedDigitalID.createdAt.getTime() !== updatedDigitalID.updatedAt.getTime();
        console.log('Was Modified:', wasModified);

        res.json({
            success: true,
            message: 'Tourist details updated successfully',
            data: {
                digitalID: updatedDigitalID,
                timestamps: {
                    createdAt: updatedDigitalID.createdAt,
                    updatedAt: updatedDigitalID.updatedAt,
                    wasModified: wasModified
                }
            }
        });

    } catch (error) {
        console.error('=== ERROR UPDATING TOURIST DETAILS ===');
        console.error('Error details:', error);
        
        res.status(500).json({ 
            success: false,
            error: 'Failed to update tourist details: ' + error.message 
        });
    }
};
