// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceCheckerFUJI.sol";

interface IPriceCheckerFUJI {
    function playerPrice() external view returns (uint256);
    function gameMasterPrice() external view returns (uint256);
}

contract Register {
    IPriceCheckerFUJI priceChecker;


    mapping (address => UserStruct) public users;

    // simplified version of the user struct for CCID. 
    // first test, check if a registered new user has level 1 and username
    struct UserStruct {
        string username;
        uint256 level;
        bool isGamemaster;
    }

    constructor(address _priceCheckerAddress, string memory _username) {
    priceChecker = IPriceCheckerFUJI(_priceCheckerAddress);
    users[msg.sender].username = _username;
    users[msg.sender].level = 5; // tippi is level 5   

}

    // a new player can register with a username and pay the registration fee
    // if they don't pay enough they get an error
    function registerPlayer(string memory _username) public payable {
        uint256 playerPrice = priceChecker.playerPrice();
        require(msg.value >= playerPrice, "Insufficient funds for player registration");

        // construct a temporary user struct to write into the mapping
        UserStruct memory newUser;
        newUser.username = _username;
        newUser.level = 1; // default level for a player

        users[msg.sender] = newUser;
    }


    // a new game master can register with a username and pay the registration fee: 20
    // if they don't pay enough they get an error
    function registerGameMaster(string memory _username) public payable {
        uint256 gameMasterPrice = priceChecker.gameMasterPrice();
        require(msg.value >= gameMasterPrice, "Insufficient funds for game master registration");

        UserStruct memory newUser;
        newUser.username = _username;
        newUser.isGamemaster = true;
        newUser.level = 1; // default level for a game master

        users[msg.sender] = newUser;
    }
}