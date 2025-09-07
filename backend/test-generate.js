import dotenv from "dotenv";
dotenv.config();

import QRCode from 'qrcode';
import crypto from 'crypto';

async function testGenerate() {
    try {
        console.log('Testing QR code generation...');
        
        const userData = { name: "Test", email: "test@test.com", phone: "123", address: "Test Address" };
        const userDataString = JSON.stringify({ ...userData, timestamp: Date.now() });
        const hash = crypto.createHash('sha256').update(userDataString).digest('hex');
        
        console.log('Generated hash:', hash);
        
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
