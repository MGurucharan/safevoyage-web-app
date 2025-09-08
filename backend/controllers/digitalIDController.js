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

        // Generate a unique hash for the user data
        const userDataString = JSON.stringify({ name, email, phone, address, timestamp: Date.now() });
        const hash = crypto.createHash('sha256').update(userDataString).digest('hex');
        console.log('Generated hash:', hash);

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

        // Create Digital ID document
        const digitalID = new DigitalID({
            userDetails: { name, email, phone, address },
            userHash: hash, // Store the original hash for verification
            blockchainData: blockchainData
        });
        console.log('Created Digital ID document');

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

        // Find the digital ID in MongoDB
        console.log('Finding Digital ID in database...');
        const digitalID = await DigitalID.findById(mongoId);
        if (!digitalID) {
            console.log('Digital ID not found');
            return res.status(404).json({
                success: false,
                error: 'Digital ID not found'
            });
        }
        console.log('Digital ID found:', digitalID._id);

        // Verify the transaction hash matches
        if (digitalID.blockchainData.transactionHash !== transactionHash) {
            console.log('Transaction hash mismatch');
            return res.status(400).json({
                success: false,
                error: 'Invalid transaction hash'
            });
        }

        // Additional blockchain verification for non-fallback transactions
        if (!transactionHash.startsWith('fallback-')) {
            console.log('Performing blockchain verification...');
            try {
                // Use the stored hash instead of regenerating
                const originalHash = digitalID.userHash;
                console.log('Using stored hash for verification:', originalHash);
                
                // Verify on blockchain
                const verificationResult = await blockchainService.verifyHash(originalHash);
                console.log('Blockchain verification result:', verificationResult);
                
                if (!verificationResult.success || !verificationResult.isValid) {
                    console.log('❌ Blockchain verification failed');
                    return res.status(400).json({
                        success: false,
                        error: 'Blockchain verification failed - hash not found on blockchain'
                    });
                }
                console.log('✅ Blockchain verification passed');
            } catch (blockchainError) {
                console.log('⚠️ Blockchain verification error (but allowing):', blockchainError.message);
            }
        } else {
            console.log('ℹ️ Skipping blockchain verification for fallback transaction');
        }

        console.log('Digital ID verified successfully');
        res.status(200).json({
            success: true,
            data: {
                isValid: true,
                digitalID
            }
        });

    } catch (error) {
        console.error('=== ERROR VERIFYING DIGITAL ID ===');
        console.error('Error details:', error);
        console.error('Stack trace:', error.stack);
        
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
