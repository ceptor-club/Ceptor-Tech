// const { parseEther } = require('ethers/lib/utils')
const fs = require('fs').promises;  // Import 'promises' from 'fs' module

// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, get, execute } = deployments
    const { deployer } = await getNamedAccounts()
    let prompt =  "0x425c05E479C94227f6CeBB52aF899330B542de88"
    let dice =  "0x71B80d94645ddF04BAa56d8D3c92792496A23B27"
    const oracle = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
    const subscriptionId = 20;
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

   }
module.exports.tags = ['Reward']