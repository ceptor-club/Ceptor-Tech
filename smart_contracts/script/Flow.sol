// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "./Helper.sol";
import {CeptorDice} from "../src/CeptorDice.sol";
import {Ceptors} from "../src/Ceptors.sol";
import "../src/PromptCollection.sol";
import "../src/Reward.sol";
import "../src/interfaces/ICeptorClubID.sol";

// import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
// import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
// import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";

contract Flow is Script, Helper {
    function gameMasterFlow(
        address reward,
        address prompt,
        address dice,
        address ccid,
        address ceptor
    ) external {
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);
        
        // let's have  instance of all the contracts
        Reward rewardContract = Reward(reward);
        CeptorDice diceContract = CeptorDice(dice);
        PromptCollection promptContract = PromptCollection(prompt);
        ICeptorClubID ccidContract = ICeptorClubID(ccid);
        Ceptors ceptorsContract = Ceptors(ceptor);
        uint256[] memory _ids = new uint256[](4);
        _ids[0] = 0;
        _ids[1] = 1;
        _ids[2] = 2;
        _ids[3] = 3;

        uint256[] memory _amounts = new uint256[](4);
        _amounts[0] = 2;
        _amounts[1] = 2;
        _amounts[2] = 2;
        _amounts[3] = 2;

        // Mint NFTs using the Dices contract
       // diceContract.minterMintBatch(msg.sender, _ids, _amounts, "");
        // prompt should be started via chainlink automation but for now , let call it manually
        //  promptContract.requestPromptUpdate();
        // // let's have the game master address
        // address gameMaster = vm.envAddress("GAME_MASTER");
        // // let's fund the game master with some ether
        // vm.call(gameMaster, 1000000000000000000);
        // let's register the game master
        // calculate the price of registration
        uint256 price = ccidContract.getLatestPrice();
        price = calculateCostInWei(200, price);
        ccidContract.registerGameMaster{value: price}("GameMaster1");
        // let's say he wants to participate in prompt
        // fist he needs to burn dice to paly
        diceContract.timerBurn(msg.sender, 1, 1);
        //promptContract.mint();
        // // he might be lucky and get a reward after a week and he can get more dice

        // now let's imagine he wants to mint a ceptor
        // first he needs to burn dice to mint
        diceContract.timerBurn(msg.sender, 1, 1);
        // now he can mint a ceptor
        string
            memory uri = "https://cdn.discordapp.com/attachments/1082779671369887798/1082780320153214986/logo.png";

        ceptorsContract.mint(uri);

        vm.stopBroadcast();
    }

    function calculateCostInWei(
        uint256 baseCost,
        uint256 price
    ) private pure returns (uint256) {
        // Convert base cost from cents to USD and then to AVAX units, taking into account the 8 decimal places from the price feed
        // The goal is to first multiply before dividing to avoid rounding down to zero

        // Convert base cost to full USD amount with 18 decimals
        uint256 baseCostInUSD = baseCost * 1e15;

        // Adjust the price to 18 decimals for calculation
        uint256 priceAdjusted = price * 1e10;

        // Calculate cost in AVAX (convert USD cost to AVAX, both represented with 18 decimals)
        uint256 costInAVAX = (baseCostInUSD * 1e18) / priceAdjusted;

        return costInAVAX;
    }
}
