// const { parseEther } = require('ethers/lib/utils')
const fs = require('fs').promises;  // Import 'promises' from 'fs' module

// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, get, execute } = deployments
    const { deployer } = await getNamedAccounts()
    let prompt =  "0xC39DDba991CF05A7D24505b76d1ec4D4e12EABC2"
    let dice =  "0x642b3B4B9ce6A0480D248Cd589D54a00C86bd72a"
    const oracle = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
    const subscriptionId = 1839;
    const _checkLogic = await fs.readFile("./source.js", "utf8");

   
    // variables go here 
    // const _owner = deployer// 0xac701BB1557F6c06070Bc114Ca6Ace4a358D3A84
     await deploy('Reward', {
        from: deployer,
        args: [


            oracle, subscriptionId, _checkLogic, dice, prompt
        ],
        log: true,
    })
    execute('Reward', { from: deployer }, 'setReward')
   }
module.exports.tags = ['Reward']