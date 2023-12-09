//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceFeedCCID{
  // i think we should let users leave the system and get their money back or 80%

    // XP multiplier based on Level. Level will be based on something.
    
    // address public ceptorsContractAddress; // ceptors might have to be deployed on each chain.
    AggregatorV3Interface internal priceFeed;

    // set prices in USD for player (.05$) and gamemaster (.2$) registration  [as a temporary price]
    uint256 public playerRegistrationCost = 50 * 10 ** 16; // for a 5 dollar we change 16 to 18
    uint256 public gamemasterRegistrationCost = 200 * 10 ** 16; // for a 20 dollar we change 16 to 18
      // Function to get registration cost -- its crap
    function getRegistrationCost() public view returns (uint256) {
        (, int price,,,) = priceFeed.latestRoundData();
        return uint256(price) * 1e18;
    }
    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
}