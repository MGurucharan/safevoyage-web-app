import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { ethers } from 'ethers';
import solc from 'solc';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function main() {
    try {
        console.log('Starting deployment...');
        
        // Connect to Sepolia network using Infura
        const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
        console.log('Connected to Infura');
        
        // Create a wallet instance
        const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
        const signer = wallet.connect(provider);

        // Read and compile the contract
        const contractPath = path.join(__dirname, '..', 'contracts', 'DigitalIDStorage.sol');
        const source = fs.readFileSync(contractPath, 'utf8');

        const input = {
            language: 'Solidity',
            sources: {
                'DigitalIDStorage.sol': {
                    content: source,
                },
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*'],
                    },
                },
            },
        };

        console.log('Compiling contract...');
        const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
        const artifact = compiledContract.contracts['DigitalIDStorage.sol'].DigitalIDStorage;

        // Get contract factory and deploy
        const factory = new ethers.ContractFactory(
            artifact.abi,
            artifact.evm.bytecode.object,
            signer
        );

        console.log('Deploying contract...');
        const contract = await factory.deploy();
        console.log('Waiting for deployment transaction...');
        await contract.deployed();

        console.log('Contract deployed successfully!');
        console.log('Contract address:', contract.address);

        // Save the contract address and ABI
        const contractInfo = {
            address: contract.address,
            abi: artifact.abi
        };

        fs.writeFileSync(
            path.join(__dirname, '..', 'contractInfo.json'),
            JSON.stringify(contractInfo, null, 2)
        );

        console.log('Contract information saved to contractInfo.json');
        
        // Update .env file
        const envPath = path.join(__dirname, '..', '.env');
        let envContent = fs.readFileSync(envPath, 'utf8');
        envContent = envContent.replace(
            /CONTRACT_ADDRESS=.*/,
            `CONTRACT_ADDRESS="${contract.address}"`
        );
        fs.writeFileSync(envPath, envContent);
        
        console.log('Update your .env CONTRACT_ADDRESS with:', contract.address);
    } catch (error) {
        console.error('Deployment failed:', error);
        process.exit(1);
    }
}

main().catch(console.error);