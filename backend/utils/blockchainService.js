import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Read contract info dynamically
const getContractInfo = async () => {
    const contractInfoPath = path.join(__dirname, '..', 'contractInfo.json');
    const contractInfoRaw = await readFile(contractInfoPath, 'utf8');
    return JSON.parse(contractInfoRaw);
};

// Initialize provider and contract
const initializeContract = async () => {
    try {
        const contractInfo = await getContractInfo();
        const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
        
        // Create wallet from mnemonic
        const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
        const signer = wallet.connect(provider);

        console.log('Wallet address:', wallet.address);
        console.log('Contract address:', contractInfo.address);

        return new ethers.Contract(
            contractInfo.address,
            contractInfo.abi,
            signer
        );
    } catch (error) {
        console.error('Error initializing contract:', error);
        throw error;
    }
};

const blockchainService = {
    storeHash: async (hash) => {
        try {
            const contract = await initializeContract();
            const contractInfo = await getContractInfo();
            
            console.log('Storing hash on blockchain:', hash);
            const tx = await contract.storeHash(hash);
            console.log('Transaction sent:', tx.hash);
            
            const receipt = await tx.wait();
            console.log('Transaction confirmed:', receipt.transactionHash);
            
            return {
                success: true,
                transactionHash: receipt.transactionHash,
                contractAddress: contractInfo.address
            };
        } catch (error) {
            console.error('Error storing hash on blockchain:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    verifyHash: async (hash) => {
        try {
            const contract = await initializeContract();
            console.log('Verifying hash on blockchain:', hash);
            
            const isValid = await contract.verifyHash(hash);
            console.log('Hash verification result:', isValid);
            
            return {
                success: true,
                isValid: isValid
            };
        } catch (error) {
            console.error('Error verifying hash on blockchain:', error);
            return {
                success: false,
                isValid: false,
                error: error.message
            };
        }
    }
};

export default blockchainService;