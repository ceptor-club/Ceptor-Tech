// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {CeptorDice} from  "../src/CeptorDice.sol";
import {Ceptors} from "../src/Ceptors.sol";
import "../src/PromptCollection.sol";
import "../src/Reward.sol";
// import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
// import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
// import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";

contract Deployer is Script, Helper {
    function deployAll(
    ) external  {

        
     
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);
    // first deploy dice contract 
        CeptorDice dice = new CeptorDice();
    // deploy ceptor contract
     Ceptors ceptor = new Ceptors(address(dice));

     // deploy the prompt collection contract

        address vrfCoordindatorV2 = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;

        address _diceContract =address(dice);
        bytes32 keyhash=0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
         /* gasLane */
        uint64 subscriptionId=7650;
        uint32 callbackGasLimit =	2500000;

        
         PromptCollection prompt = new PromptCollection( vrfCoordindatorV2, _diceContract, keyhash, subscriptionId, callbackGasLimit);
    

        vm.stopBroadcast();
         
    }


    /**
        1. dice contract : 
        -What are the contracts that should be MINTER ? 
            - Reward contract
            - CCID contract
        -   what are the contracts that should be in TIMER_MANAGEMENT_ROLE ?
             - PromptCollection contract
             - Ceptors contract
        2. Reward contract : What are the contracs that should be in WINNER_MANAGEMENT_ROLE ? 
             - PromptCollection contract
        - 
        3. PromptCollection contract we should set reward cntract address via setRewardContract ? 
    - 
    
     */
       function postDeploy(address reward, address prompt, address dice, address ccid, address ceptor) external  returns (bytes32) {
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

        promptContract.setRewardContract(reward);
        vm.stopBroadcast();
        
   return  keccak256("WINNER_MANAGEMENT_ROLE");

}

}