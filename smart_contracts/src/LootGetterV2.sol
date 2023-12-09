// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

// TOODO: add interface to CCID and logic to call it after recieving CCIP

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for receiving string data across chains.
contract Receiver is CCIPReceiver {
    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        address whoGotLoot, // the address sent in with the message
        string loot // The text that was received
    );

    bytes32 private s_lastReceivedMessageId; // Store the last received messageId.
    struct LootMessage {
        address userAddress;
        string lootText;
    }
    LootMessage private s_lootMessage;

    address public CCIDContractAddress;
    address public tippi;

    /// @notice Constructor initializes the contract with the router address.
    /// @param router The address of the router contract.
    constructor(address router) CCIPReceiver(router) {
        tippi = msg.sender;
    }

    function setCCID(address _ccid) public {
        require(msg.sender == tippi, "gotta be Tippi");
        CCIDContractAddress = _ccid;
    }
    
    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        s_lastReceivedMessageId = any2EvmMessage.messageId; // fetch the messageId
        (address userAddress, string memory lootText) = abi.decode(any2EvmMessage.data, (address, string));
        s_lootMessage = LootMessage(userAddress, lootText);

        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            userAddress,
            s_lootMessage.lootText // are there different gas costs for these
        );
    }

    /// @notice Fetches the details of the last received loot.
    /// @return messageId The ID of the last received message.
    /// @return userAddress The address of the user who got the loot.
    /// @return loot The last received text loot.
    function getLastReceivedMessageDetails()
        external
        view
        returns (bytes32 messageId, address userAddress, string memory loot)
    {
        return (s_lastReceivedMessageId, s_lootMessage.userAddress, s_lootMessage.lootText);
    }
}
