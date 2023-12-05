// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import "../src/Dice.sol";
import "../src/Ceptor.sol";
import "../src/PromptCollection.sol";
// import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
// import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
// import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";

contract Deployer is Script, Helper {
    function deployAll(
    ) external  {

        
     
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);

    

        vm.stopBroadcast();
         
    }

}