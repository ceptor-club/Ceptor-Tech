// const { parseEther } = require('ethers/lib/utils')
const fs = require("fs").promises; // Import 'promises' from 'fs' module

// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, get, execute } = deployments
    const { deployer } = await getNamedAccounts()
  let prompt =  "0x0346FD18AeE90dC45472cdF71b55A698c91C3834"
  let dice = "0x6fBcC51a9fCFe22181c1C299bfbE0b424BCE1d1a"
  // fuji 
    // const oracle = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0";
  // const subscriptionId = 20;

  const oracle = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
  const subscriptionId = 1839;

  

  // mumbai 
  // const oracle = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
  // const subscriptionId = 338;
    const _checkLogic = await fs.readFile("./source.js", "utf8");

  // variables go here
  // const _owner = deployer// 0xac701BB1557F6c06070Bc114Ca6Ace4a358D3A84
  await deploy("Reward", {
    from: deployer,
    args: [oracle, subscriptionId, _checkLogic, dice, prompt],
    log: true,
  });
  execute("Reward", { from: deployer }, "setReward");
};
module.exports.tags = ["Reward"];
