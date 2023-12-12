// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {CeptorDice} from "../src/CeptorDice.sol";
import {Ceptors} from "../src/Ceptors.sol";
import "../src/PromptCollection.sol";
import "../src/Reward.sol";
// import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
// import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
// import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";

contract Deployer is Script, Helper {
    function deployAll() external {
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);
        // first deploy dice contract
        CeptorDice dice = new CeptorDice();
        // deploy ceptor contract
        Ceptors ceptor = new Ceptors(address(dice));
        address _diceContract =address(dice);

        // deploy the prompt collection contract
        // Fuji
        // address vrfCoordindatorV2 = 0x2eD832Ba664535e5886b75D64C46EB9a228C2610;
        // bytes32 keyhash = 0x354d2f95da55398f44b7cff77da56283d9c6c829a4bdf1bbcaf2ad6a4d081f61;
        // /* gasLane */
        // uint64 subscriptionId = 7650;
        // uint32 callbackGasLimit = 2500000;

        // Sepolai 
             address vrfCoordindatorV2 = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;

        bytes32 keyhash=0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
         /* gasLane */
        uint64 subscriptionId=7650;
        uint32 callbackGasLimit =	2500000;
        // Mumbai 
        //      address vrfCoordindatorV2 = 0x7a1bac17ccc5b313516c5e16fb24f7659aa5ebed;

        // bytes32 keyhash=0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;
        //  /* gasLane */
        // uint64 subscriptionId=6627;
        // uint32 callbackGasLimit =	2500000;

        PromptCollection prompt =
            new PromptCollection( vrfCoordindatorV2, _diceContract, keyhash, subscriptionId, callbackGasLimit);



         
  
 
        // timer management role for dice contract
        dice.grantRole(dice.TIMER_MANAGEMENT_ROLE(), address(prompt));
        dice.grantRole(dice.TIMER_MANAGEMENT_ROLE(), address(ceptor));
        // setup tokens 
              uint256[] memory _ids = new uint256[](4);
        _ids[0] = 0;
        _ids[1] = 1;
        _ids[2] = 2;
        _ids[3] = 3;
 
        uint256[] memory _prices = new uint256[](4);
        _prices[0] = 1;
        _prices[1] = 5;
        _prices[2] = 15;
        _prices[3] = 25;
         uint256[] memory _times = new uint256[](4);
        _times[0] = 3 minutes;
        _times[1] = 10 minutes;
        _times[2] = 15 minutes;
        _times[3] = 20 minutes;
         string[] memory _uris = new string[](4);
        _uris[0] = "https://cdn.discordapp.com/attachments/1082779671369887798/1082780320153214986/logo.png";
        _uris[1] = " https://cdn.discordapp.com/attachments/1082779671369887798/1082780320153214986/logo.png";
        _uris[2] = " https://cdn.discordapp.com/attachments/1082779671369887798/1082780320153214986/logo.png";
        _uris[3] = " https://cdn.discordapp.com/attachments/1082779671369887798/1082780320153214986/logo.png";
       
      dice.addNewTokens(_ids,_prices,_times,_uris);
    //         uint256[] memory _amounts = new uint256[](4);
    //     _amounts[0] = 2;
    //     _amounts[1] = 2;
    //     _amounts[2] = 2;
    //     _amounts[3] = 2;
    //   dice.minterMintBatch(msg.sender, _ids, _amounts, "");
    //   dice.timerBurn(msg.sender, 3, 1);
    // //   bool timer = dice.checkTimer(msg.sender);
    // //   console.log("Timer status", timer);
    //   prompt.mint();
        vm.stopBroadcast();
    }

    /**
     * 1. dice contract : 
     *     -What are the contracts that should be MINTER ? 
     *         - Reward contract
     *         - CCID contract
     *     -   what are the contracts that should be in TIMER_MANAGEMENT_ROLE ?
     *          - PromptCollection contract
     *          - Ceptors contract
     *     2. Reward contract : What are the contracs that should be in WINNER_MANAGEMENT_ROLE ? 
     *          - PromptCollection contract
     *     - 
     *     3. PromptCollection contract we should set reward cntract address via setRewardContract ? 
     * -
     */
    function postDeploy( address prompt, address dice, address ceptor , address ccid,address reward)
        external
        returns (bytes32)
    {
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);
        Reward rewardContract = Reward(reward);
        CeptorDice diceContract = CeptorDice(dice);
        PromptCollection promptContract = PromptCollection(prompt);
        rewardContract.grantRole(rewardContract.WINNER_MANAGEMENT_ROLE(), prompt);

        /// minter role for dice contract
        diceContract.grantRole(diceContract.MINTER(), ccid);
        diceContract.grantRole(diceContract.MINTER(), reward);

        // timer management role for dice contract
        diceContract.grantRole(diceContract.TIMER_MANAGEMENT_ROLE(), prompt);
        diceContract.grantRole(diceContract.TIMER_MANAGEMENT_ROLE(), ceptor);
        // setup tokens 
              uint256[] memory _ids = new uint256[](4);
        _ids[0] = 0;
        _ids[1] = 1;
        _ids[2] = 2;
        _ids[3] = 3;
 
        uint256[] memory _prices = new uint256[](4);
        _prices[0] = 1;
        _prices[1] = 5;
        _prices[2] = 15;
        _prices[3] = 25;
         uint256[] memory _times = new uint256[](4);
        _times[0] = 3 minutes;
        _times[1] = 10 minutes;
        _times[2] = 15 minutes;
        _times[3] = 20 minutes;
         string[] memory _uris = new string[](4);
        _uris[0] = "https://cdn.discordapp.com/attachments/1082779671369887798/1082780320153214986/logo.png";
        _uris[1] = " https://cdn.discordapp.com/attachments/1082779671369887798/1082780320153214986/logo.png";
        _uris[2] = " https://cdn.discordapp.com/attachments/1082779671369887798/1082780320153214986/logo.png";
        _uris[3] = " https://cdn.discordapp.com/attachments/1082779671369887798/1082780320153214986/logo.png";
       
      diceContract.addNewTokens(_ids,_prices,_times,_uris);
        promptContract.setRewardContract(reward);
        vm.stopBroadcast();

        return keccak256("WINNER_MANAGEMENT_ROLE");
    }
}
