
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract CrossChainRegisteration is CCIPReceiver, Ownable{
    //  uint64 constant chainIdEthereumSepolia = 16015286601757825753;
     uint64 constant chainIdAvalancheFuji = 14767482510784806043;
     uint64 constant chainIdPolygonMumbai = 12532609583862916517;
  // approved list of sender addresses for CCIP messages
    mapping(address => bool) public approvedSenders;


     
    modifier onlyAllowedSenders(address _sender) {
        if (! approvedSenders[_sender])
            revert SenderNotAllowed(_sender);
        _;
    }
    constructor(address router) CCIPReceiver(router) Ownable(msg.sender) {}

      // function to let the owner set the approved senders
    function setApprovedSender(address _sender, bool _approved) public onlyOwner {
        approvedSenders[_sender] = _approved;
    }

    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        string text, // The text that was received.
        address token, // The token address that was transferred.
        uint256 tokenAmount // The token amount that was transferred.
    );
error SenderNotAllowed(address sender);
    error DestinationChainNotAllowlisted(uint64 destinationChainSelector); // Used when the destination chain has not been allowlisted by the contract owner.

}