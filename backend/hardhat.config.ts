import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.INFURA_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    }
  }
};

export default config;
