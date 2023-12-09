
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./ccid/CrossChainRegisteration.sol";
import "./ccid/PriceFeedCCID.sol";

contract CeptorCCID  is PriceFeedCCID, CrossChainRegisteration {
        struct Stats {
        uint8 strong;
        uint8 agile;
        uint8 tanky;
        uint8 clever;
        uint8 wise;
        uint8 cute;
        uint8 lucky;
    }

    struct UserBody {
        Stats head;
        Stats body;
        Stats legs;
        Stats feet;
        Stats weapon;
        Stats shield;
        Stats pet;
    }

    struct UserMind {
        uint8 artXP;
        uint8 techXP;
        uint8 gamesXP;
        string themeSong;
    }

    // what is a "user"?
    struct UserStruct {
        string username;
        Stats stats;
        UserBody body;
        UserMind mind;
        string[] loot;
        uint256 level;
        uint256 availableXP; // XP that can be gifted to others, and refreshed monthly or weekly based on Automation
    }

    // State variables
    mapping (address => UserStruct) public users;

    constructor(address _priceFeed, address _router) CrossChainRegisteration(_router) PriceFeedCCID(_priceFeed) {
        
    }



        // Function to update user stats
    function updateBigStats(uint256 statId, uint256 value) public onlyOwner {
        // if (statId == 0) userStats[msg.sender].strong = uint8(value);
        // else if (statId == 1) userStats[msg.sender].agile = uint8(value);
        // else if (statId == 2) userStats[msg.sender].tanky = uint8(value);
        // else if (statId == 3) userStats[msg.sender].clever = uint8(value);
        // else if (statId == 4) userStats[msg.sender].wise = uint8(value);
        // else if (statId == 5) userStats[msg.sender].cute = uint8(value);
        // else if (statId == 6) userStats[msg.sender].lucky = uint8(value);
        emit StatsUpdated(msg.sender, statId, value);
    }

    // Function to store loot
    function storeLoot(string memory loot) public onlyOwner {
        // for (uint256 i = 0; i < amount; i++) {
        //     //userLoot[msg.sender].push(loot);
        //     emit LootReceived(msg.sender, loot);
        // }
    }

    // CCIP Receive function -- have a seperate contract for each recieve (Loot and Stats)
    
    function _ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) internal override {
        // // Does this work? @Chainlink Dev Experts
        // require(approvedSenders[abi.decode(any2EvmMessage.sender, (address))], "Sender not approved");
        
        // // Example: Update stats or perform other actions based on received data
        // // Not sure about how we can have security based on making sure that the Loot and Stats are from the right contract
        // // I guess we can have an allowlist of contracts that can send data to this contract
        // // And depending on the structure of the message we can update the stats or store the loot
        // // Extract the user's address and loot from the message
        // (address userAddress, string memory loot) = abi.decode(any2EvmMessage.data, (address, string));
        // // Store the loot for the user
        // require(bytes(users[userAddress].username).length != 0, "User must have a username");
        // users[userAddress].loot.push(loot);
        // emit LootReceived(userAddress, loot);
    }



    // Events
    event UsernameRegistered(address indexed user, string username, bool isFree);
    event StatsUpdated(address indexed user, uint256 statId, uint256 value);
    event LootReceived(address indexed user, string loot);
}