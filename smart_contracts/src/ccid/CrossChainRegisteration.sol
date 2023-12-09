
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract CrossChainRegisteration is CCIPReceiver, Ownable{
  // approved list of sender addresses for CCIP messages
    mapping(address => bool) public approvedSenders;
    constructor(address router) CCIPReceiver(router) Ownable(msg.sender) {}

      // function to let the owner set the approved senders
    function setApprovedSender(address _sender, bool _approved) public onlyOwner {
        approvedSenders[_sender] = _approved;
    }


    
}