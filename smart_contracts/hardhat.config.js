require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-foundry");
/**import 'hardhat-deploy';
import 'hardhat-deploy-ethers'; */
require("hardhat-deploy")
require("hardhat-deploy-ethers")
const  dotenv = require("dotenv");
dotenv.config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  namedAccounts: {
    deployer: 0,
  },
  solidity: "0.8.20",
  networks: {
   
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/tCbwTAqlofFnmbVORepuHNcsrjNXWdRJ',
      accounts: [process.env.PRIVATE_KEY || ''],
      saveDeployments: true,
    },
    sepolia: {
      url: process.env.ETHEREUM_SEPOLIA_RPC_URL || "UNSET",
      accounts: [process.env.PRIVATE_KEY || ''],
      saveDeployments: true,
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts: [process.env.PRIVATE_KEY || ''],
      saveDeployments: true,
    },
  },
  paths: {
    sources: './src',
    deploy: 'deploy',
    deployments: 'deployments',
    tests: './test',
    cache: './cache',
   },
};
