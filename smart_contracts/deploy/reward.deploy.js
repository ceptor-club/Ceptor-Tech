// const { parseEther } = require('ethers/lib/utils')
const fs = require("fs").promises; // Import 'promises' from 'fs' module

// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, get, execute } = deployments
    const { deployer } = await getNamedAccounts()
    let prompt =  "0x16441906972dB87d1498FF462C7351c46B55406F"
    let dice =  "0xf67Ad9EB4f909A330A78D30750966a883C07877D"
    const oracle = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
    const subscriptionId = 1839;
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
