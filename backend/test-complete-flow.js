import dotenv from "dotenv";
dotenv.config();

import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/digital-id';

async function testCompleteFlow() {
    try {
        console.log('=== Testing Complete Digital ID Flow ===\n');
        
        // Step 1: Generate Digital ID
        console.log('1. Generating Digital ID...');
        const generateResponse = await axios.post(`${API_BASE}/generate`, {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            address: 'Test Address'
        });
        
        if (!generateResponse.data.success) {
            throw new Error('Generation failed: ' + generateResponse.data.error);
        }
        
        console.log('✅ Digital ID generated successfully!');
        console.log('ID:', generateResponse.data.data.digitalID._id);
        
        // Extract QR data from the generated response
        const digitalID = generateResponse.data.data.digitalID;
        const qrData = {
            mongoId: digitalID._id,
            transactionHash: digitalID.blockchainData.transactionHash
        };
        
        console.log('\n2. QR Code Data:', qrData);
        
        // Step 2: Verify Digital ID using QR data
        console.log('\n3. Verifying Digital ID...');
        const verifyResponse = await axios.post(`${API_BASE}/verify`, qrData);
        
        console.log('\n=== Verification Result ===');
        console.log('Success:', verifyResponse.data.success);
        console.log('Verified:', verifyResponse.data.verified);
        console.log('Message:', verifyResponse.data.message);
        
        if (verifyResponse.data.verified) {
            console.log('✅ VERIFICATION SUCCESSFUL - Digital ID is valid!');
            console.log('Tourist Details:', verifyResponse.data.data.touristDetails);
        } else {
            console.log('❌ VERIFICATION FAILED');
            console.log('Reason:', verifyResponse.data.reason);
            if (verifyResponse.data.data) {
                console.log('Hash Match:', verifyResponse.data.data.hashMatch);
                console.log('Blockchain Verified:', verifyResponse.data.data.blockchainVerified);
            }
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testCompleteFlow();
