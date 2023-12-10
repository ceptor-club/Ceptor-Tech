// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceFeedCCID {
    AggregatorV3Interface internal dataFeed;

    // Base costs in USD with 3 decimal places
    uint256 private constant BASE_PLAYER_REGISTRATION_COST = 50; // $0.05
    uint256 private constant BASE_GAMEMASTER_REGISTRATION_COST = 200; // $0.20

    constructor(address _priceFeed) {
        // Avalanche Fuji AVAX/USD price feed 0x5498BB86BC934c8D34FDA08E81D444153d0D06aD
        dataFeed = AggregatorV3Interface(_priceFeed);

    }

    // Returns the latest AVAX/USD price
    function getLatestPrice() public view returns (uint256) {
        (, int256 price,,,) = dataFeed.latestRoundData();
        return uint256(price);
    }

    // Calculate and return the player registration cost in Wei
    function playerPrice() public view returns (uint256) {
        uint256 latestPrice = getLatestPrice();
        return calculateCostInWei(BASE_PLAYER_REGISTRATION_COST, latestPrice);
    }

    // Calculate and return the gamemaster registration cost in Wei
    function gameMasterPrice() public view returns (uint256) {
        uint256 latestPrice = getLatestPrice();
        return calculateCostInWei(BASE_GAMEMASTER_REGISTRATION_COST, latestPrice);
    }

    function calculateCostInWei(uint256 baseCost, uint256 price) private pure returns (uint256) {
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
