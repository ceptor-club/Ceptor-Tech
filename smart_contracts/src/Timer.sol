// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title Timer Contract
/// @dev Manages timers for users, allowing them to start a timer and check its status.
contract Timer is AccessControl {
    // Roles for access control
    bytes32 public constant TIMER_MANAGEMENT_ROLE = keccak256("TIMER_MANAGEMENT_ROLE");
    bytes32 public constant MINTER = keccak256(abi.encodePacked("MINTER")); // Minter role is for other contracts to mint tokens

    // Constructor sets up initial roles
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER, msg.sender);
    }

    // Struct to represent a user's timer
    struct UserTimer {
        uint256 endTime; // The timestamp when the timer will end
        bool isUsed; // Flag indicating if the timer has been used in any operation
    }

    // Mapping from user address to their timer information
    mapping(address => UserTimer) public userToTimer;

    /// @dev Internal function to start a timer for a user.
    /// @param to The address of the user for whom the timer is started.
    /// @param _time The duration of the timer in seconds.
    function _startTimer(address to, uint256 _time) internal {
        userToTimer[to].endTime = block.timestamp + _time;
        userToTimer[to].isUsed=false;
    }

    /// @dev Public function to check if a user's timer is still running and hasn't been used.
    /// @param user The address of the user to check.
    /// @return A boolean indicating whether the timer is still active and unused.
    function checkTimer(address user) public view returns (bool) {
        return userToTimer[user].endTime > block.timestamp && !userToTimer[user].isUsed;
    }

    /// @dev Function to mark a user's timer as used, typically called by a role with TIMER_MANAGEMENT_ROLE.
    /// @param user The address of the user whose timer is marked as used.
    function makeTimerUsed(address user) public onlyRole(TIMER_MANAGEMENT_ROLE) {
        userToTimer[user].isUsed = true;
    }
}
