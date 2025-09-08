import Web3 from 'web3';
import CryptoJS from 'crypto-js';
import HDWalletProvider from '@truffle/hdwallet-provider';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Web3 with Infura
const provider = new HDWalletProvider({
    mnemonic: {
        phrase: process.env.MNEMONIC
    },
    providerOrUrl: process.env.INFURA_URL
});

const web3 = new Web3(provider);

export const generateHash = (data) => {
    // Convert the data object to a sorted string to ensure consistent hashing
    const sortedData = Object.keys(data)
        .sort()
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});

    // Generate SHA-256 hash
    return CryptoJS.SHA256(JSON.stringify(sortedData)).toString();
};

export const storeHashOnBlockchain = async (hash) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0];

        // Create the transaction data (the hash will be stored in the input data field)
        const txData = web3.utils.asciiToHex(hash);

        // Send transaction to store the hash
        const transaction = await web3.eth.sendTransaction({
            from: fromAddress,
            to: process.env.CONTRACT_ADDRESS, // Your smart contract address
            data: txData,
            gas: 100000
        });

        return {
            transactionId: transaction.transactionHash,
            timestamp: new Date(),
            success: true
        };
    } catch (error) {
        console.error('Blockchain Error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const verifyHash = async (storedHash, transactionId) => {
    try {
        const transaction = await web3.eth.getTransaction(transactionId);
        const hashFromBlockchain = web3.utils.hexToAscii(transaction.input);
        return hashFromBlockchain === storedHash;
    } catch (error) {
        console.error('Verification Error:', error);
        return false;
    }
};
