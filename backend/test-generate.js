import dotenv from "dotenv";
dotenv.config();

import QRCode from 'qrcode';
import crypto from 'crypto';

// Helper function to create consistent hash from user details (same as controller)
function createConsistentHash(userDetails) {
    // Ensure consistent property order for hash generation
    const orderedData = {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address
    };
    const userDataString = JSON.stringify(orderedData);
    return crypto.createHash('sha256').update(userDataString).digest('hex');
}

async function testGenerate() {
    try {
        console.log('Testing QR code generation...');
        
        const userDetails = { 
            name: "Test", 
            email: "test@test.com", 
            phone: "123", 
            address: "Test Address" 
        };
        
        const hash = createConsistentHash(userDetails);
        
        console.log('Generated hash using userDetails ONLY:', hash);
        console.log('UserDetails used:', userDetails);
        
        const qrData = JSON.stringify({
            mongoId: "test-mongo-id",
            transactionHash: "test-tx-hash"
        });
        
        console.log('QR Data:', qrData);
        
        const qrCodeBase64 = await QRCode.toDataURL(qrData);
        console.log('QR Code generated successfully, length:', qrCodeBase64.length);
        
        console.log('Test completed successfully!');
        
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testGenerate();
