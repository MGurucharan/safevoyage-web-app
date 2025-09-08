import dotenv from "dotenv";
dotenv.config();

import blockchainService from './utils/blockchainService.js';

async function testBlockchainConnection() {
    try {
        console.log('🔗 Testing blockchain connection...');
        console.log('Infura URL:', process.env.INFURA_URL);
        console.log('Contract Address:', process.env.CONTRACT_ADDRESS);
        
        // Test storing a simple hash
        const testHash = 'test-hash-' + Date.now();
        console.log('📝 Testing hash storage:', testHash);
        
        const result = await blockchainService.storeHash(testHash);
        console.log('📊 Blockchain storage result:', result);
        
        if (result.success) {
            console.log('✅ Blockchain storage successful!');
            console.log('Transaction Hash:', result.transactionHash);
            
            // Test verification
            console.log('🔍 Testing hash verification...');
            const verifyResult = await blockchainService.verifyHash(testHash);
            console.log('📊 Verification result:', verifyResult);
            
            if (verifyResult.success && verifyResult.isValid) {
                console.log('✅ Blockchain verification successful!');
            } else {
                console.log('❌ Blockchain verification failed');
            }
        } else {
            console.log('❌ Blockchain storage failed:', result.error);
        }
        
    } catch (error) {
        console.error('💥 Blockchain test error:', error.message);
        console.error('Stack trace:', error.stack);
    }
}

testBlockchainConnection();
