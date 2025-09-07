require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.INFURA_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY // you'll need this for contract verification
  }
};
