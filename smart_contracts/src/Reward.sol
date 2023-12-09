// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Functions, FunctionsClient} from "@chainlink/contracts/src/v0.8/dev/functions/FunctionsClient.sol";
 import "./PromptCollection.sol";
import "./CeptorDice.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title Reward Contract
/// @author Eman Herawy
/// @dev Manages minting Dice NFTs for the most-liked POW NFT each week. Consumes Chainlink function to call the API and retrieve winning NFT.
/// This contract must have the minter role in the Dices contract.
contract Reward is AccessControl, FunctionsClient {
    using Functions for Functions.Request;

    uint64 subscriptionId;
    PromptCollection prompt;
    CeptorDice dice;

    string internal checkLogic;

    mapping(string => bool) public usedRequests;

    event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);
    event Claimed(uint amount, address by);
 bytes32 public constant WINNER_MANAGEMENT_ROLE = keccak256("WINNER_MANAGEMENT_ROLE");
 
    /// @dev Constructor initializes the contract with the specified oracle, subscription ID, check logic, and contract addresses.
    constructor(
        address oracle,
        uint64 _subscriptionId,
        string memory _checkLogic,
        address diceContract,
        address promptContract
    ) FunctionsClient(oracle)  {
        checkLogic = _checkLogic;
        subscriptionId = _subscriptionId;
        dice = CeptorDice(diceContract);
        prompt = PromptCollection(promptContract);
         _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(WINNER_MANAGEMENT_ROLE, msg.sender);
    }

    /// @notice Sends a request to the Chainlink oracle to get the winner.
    function getWinner(string memory weektimeStamp) public  onlyRole(WINNER_MANAGEMENT_ROLE) {
        Functions.Request memory req;

        string[] memory args = new string[](1);
        args[0] = weektimeStamp;
        req.addArgs(args);
        req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, checkLogic);
        bytes32 assignedReqID = sendRequest(req, subscriptionId, 300000);
    }

    /// @notice Callback that is invoked once the Chainlink node resolves the request or encounters an error.
    /// @param requestId The request ID returned by sendRequest().
    /// @param response Aggregated response from the user code.
    /// @param err Aggregated error from the user code or from the execution pipeline.
    /// Either response or error parameter will be set, but never both.
    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        emit OCRResponse(requestId, response, err);

        // Decode the response to get the winning token ID
        uint256 tokenId = abi.decode(response, (uint256));
        address _to = prompt.ownerOf(tokenId);

        // Arrays for NFT minting
        uint256[] memory _ids = new uint256[](4);
        _ids[0] = 0;
        _ids[1] = 1;
        _ids[2] = 2;
        _ids[3] = 3;
        _ids[4] = 4;

        uint256[] memory _amounts = new uint256[](4);
        _amounts[0] = 1;
        _amounts[1] = 1;
        _amounts[2] = 1;
        _amounts[3] = 1;
        _amounts[4] = 1;

        // Mint NFTs using the Dices contract
        dice.minterMintBatch(_to, _ids, _amounts, "");

        // Stop the timer for the user
        dice.makeTimerUsed(_to);

        // Additional logic for calling the owner of the token and minting NFT
    }

    /// @notice Allows the Functions oracle address to be updated.
    /// @param oracle New oracle address.
    function updateOracleAddress(address oracle) public onlyRole(AccessControl.DEFAULT_ADMIN_ROLE) {
        setOracle(oracle);
    }
}
