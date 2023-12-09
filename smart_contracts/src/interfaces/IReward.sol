// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
 
/// @title Reward Contract
/// @author Eman Herawy
/// @dev Manages minting Dice NFTs for the most-liked POW NFT each week. Consumes Chainlink function to call the API and retrieve winning NFT.
/// This contract must have the minter role in the Dices contract.
interface IReward   {
    
 
 
    event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);
    event Claimed(uint amount, address by);
  
    /// @dev Constructor initializes the contract with the specified oracle, subscription ID, check logic, and contract addresses.
 

    /// @notice Sends a request to the Chainlink oracle to get the winner.
    function getWinner(string memory weektimeStamp) external ;


    /// @notice Allows the Functions oracle address to be updated.
    /// @param oracle New oracle address.
    function updateOracleAddress(address oracle) external ;
}
