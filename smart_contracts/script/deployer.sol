// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {CeptorDice} from  "../src/Dice.sol";
import {Ceptors} from "../src/Ceptor.sol";
import "../src/PromptCollection.sol";
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

           address new_owner = msg.sender;
        address vrfCoordindatorV2=0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed;
        address _diceContract =address(dice);
        bytes32 keyhash=0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;
         /* gasLane */
        uint64 subscriptionId=6627;
        uint32 callbackGasLimit =	2500000;

        
         PromptCollection prompt = new PromptCollection(new_owner, vrfCoordindatorV2, _diceContract, keyhash, subscriptionId, callbackGasLimit);
    

        vm.stopBroadcast();
         
    }

}