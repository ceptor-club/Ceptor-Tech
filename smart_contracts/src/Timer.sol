/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/access/AccessControl.sol";
contract Timer is AccessControl{
    // user and timer to end timer 
    bytes32 public constant TIMER_MANAGEMENT_ROLE = keccak256("TIMER_MANAGEMENT_ROLE");
    bytes32 public constant MINTER = keccak256(abi.encodePacked("MINTER")); // minter role is for other contracts to mint tokens

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
         _grantRole(MINTER, msg.sender);
    }
    struct UserTimer {
        
        uint256 endTime;
        // check if it's used in any operation before, if yes, no longer working
        bool isUsed;
    }
    // user to timer, 
    mapping(address => UserTimer) public userToTimer;

    function _startTimer(uint256 _time) internal {
        userToTimer[msg.sender].endTime = block.timestamp + _time;
     }
        // shoud return true if timer is still running and not used in any operation
     function checkTimer(address user) public view returns (bool) {
           return userToTimer[user].endTime > block.timestamp && !userToTimer[user].isUsed;
     }

     function makeTimerUsed(address user) public onlyRole(TIMER_MANAGEMENT_ROLE) {
         userToTimer[user].isUsed = true;
     }


}