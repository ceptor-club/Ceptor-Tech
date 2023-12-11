//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract CrossChainRegistration is CCIPReceiver, Ownable {
    //  uint64 constant chainIdEthereumSepolia = 16015286601757825753;
    uint64   artChainSelector ;
    uint64   gameChainSelector ;
    // approved list of sender addresses for CCIP messages
    mapping(address => bool) public approvedSenders;

    modifier onlyAllowedSenders(address _sender) {
        if (!approvedSenders[_sender]) {
            revert SenderNotAllowed(_sender);
        }
        _;
    }

    constructor(address router, uint64 _gameChain, uint64 artChain) CCIPReceiver(router) Ownable(msg.sender) {
        gameChainSelector = _gameChain;
        artChainSelector = artChain;
    }

    // function to let the owner set the approved senders
    function setApprovedSender(address _sender, bool _approved) public onlyOwner {
        approvedSenders[_sender] = _approved;
    }

    // Event emitted when a message is received from another chain.
    event MessageReceived( // The unique ID of the CCIP message.
        // The chain selector of the source chain.
        // The address of the sender from the source chain.
        // The text that was received.
        // The token address that was transferred.
        // The token amount that was transferred.
        bytes32 indexed messageId,
        uint64 indexed sourceChainSelector,
        address sender,
        string text,
        address token,
        uint256 tokenAmount
    );

    error SenderNotAllowed(address sender);
    error DestinationChainNotAllowlisted(uint64 destinationChainSelector); // Used when the destination chain has not been allowlisted by the contract owner.
}
