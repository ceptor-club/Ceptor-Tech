// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
// import {CeptorDice} from  "../src/CeptorDice.sol";
// import {Ceptors} from "../src/Ceptors.sol";
// import "../src/PromptCollection.sol";
// import "../src/Reward.sol";
import "../src/CeptorClubID.sol";
// import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
// import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
// import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";

contract Deployer is Script, Helper {
    function deployAll(SupportedNetworks destination, address dice) external {
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);

        (address desinationRouter,,,, address priceFeed) = getConfigFromNetwork(destination);
        // deploy the CeptorClubID contract
        // (address _priceFeed, address _router, address dice_)
        CeptorClubID ccid = new CeptorClubID( priceFeed, desinationRouter,dice );
        vm.stopBroadcast();
    }
}
