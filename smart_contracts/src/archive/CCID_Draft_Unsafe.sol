// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

/// @title - A simple contract for receiving string data across chains.
contract Receiver is CCIPReceiver {
    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId,
        uint64 indexed sourceChainSelector,
        address sender,
        string text
    );

    event UsernameRegistered(address indexed user, string username);
    event LootReceived(address indexed user, string loot);

    struct UserData {
        string username;
        string[] loot;
    }

    mapping(address => UserData) public users;

    bytes32 private s_lastReceivedMessageId;
    string private s_lastReceivedText;

    constructor(address router) CCIPReceiver(router) {}

    function registerUsername(string calldata _username) external {
        require(bytes(users[msg.sender].username).length == 0, "Username already set");
        users[msg.sender].username = _username;
        emit UsernameRegistered(msg.sender, _username);
    }

    function manuallyPushLoot(address _userAddress, string calldata _loot) public {
        users[_userAddress].loot.push(_loot);
        emit LootReceived(_userAddress, _loot);
    }

    

    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        s_lastReceivedMessageId = any2EvmMessage.messageId;
        s_lastReceivedText = abi.decode(any2EvmMessage.data, (string));

        // Extract the user's address and loot from the message
        (address userAddress, string memory loot) = abi.decode(any2EvmMessage.data, (address, string));

        // Store the loot for the user
        // require(bytes(users[userAddress].username).length != 0, "User must have a username");
        users[userAddress].loot.push(loot);
        emit LootReceived(userAddress, loot);

        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address)),
            s_lastReceivedText
        );
    }

    function getLastReceivedMessageDetails()
        external
        view
        returns (bytes32 messageId, string memory text)
    {
        return (s_lastReceivedMessageId, s_lastReceivedText);
    }
}