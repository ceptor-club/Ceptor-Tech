
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
          bool isGamemaster;
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


    // a new player can register with a username and pay the registration fee
    // if they don't pay enough they get an error
    function registerPlayer(string memory _username) public payable {
        uint256 _playerPrice = playerPrice();
        require(msg.value >= _playerPrice, "Insufficient funds for player registration");

        // construct a temporary user struct to write into the mapping
        UserStruct memory newUser;
        newUser.username = _username;
        newUser.level = 1; // default level for a player

        users[msg.sender] = newUser;
    }


    // a new game master can register with a username and pay the registration fee: 20
    // if they don't pay enough they get an error
    function registerGameMaster(string memory _username) public payable {
        uint256 _gameMasterPrice = gameMasterPrice();
        require(msg.value >= _gameMasterPrice, "Insufficient funds for game master registration");

        UserStruct memory newUser;
        newUser.username = _username;
        newUser.isGamemaster = true;
        newUser.level = 1; // default level for a game master

        users[msg.sender] = newUser;
    }
        // Function to update user stats, only called _ccipReceive
    function _updateBigStats(uint256 statId, uint256 value, address _user) internal {
       
        if (statId == 0) users[_user].stats.strong = uint8(value);
        else if (statId == 1) users[_user].stats.agile = uint8(value);
        else if (statId == 2) users[_user].stats.tanky = uint8(value);
        else if (statId == 3) users[_user].stats.clever = uint8(value);
        else if (statId == 4) users[_user].stats.wise = uint8(value);
        else if (statId == 5) users[_user].stats.cute = uint8(value);
        else if (statId == 6) users[_user].stats.lucky = uint8(value);
         emit StatsUpdated(msg.sender, statId, value);
    }

    // Function to store loot. Only called by _ccipReceive
    function _storeLoot(string memory loot, address user) internal  {
         require(bytes(users[user].username).length != 0, "User must have a username");
        users[user].loot.push(loot);
        emit LootReceived(user, loot);
    }

    // CCIP Receive function -- have a seperate contract for each recieve (Loot and Stats)
    
    function _ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) internal override onlyAllowedSenders(abi.decode(any2EvmMessage.sender, (address))) {
     
        if ( any2EvmMessage.sourceChainSelector == chainIdAvalancheFuji) {
            // Example: Update stats or perform other actions based on received data
            // Not sure about how we can have security based on making sure that the Loot and Stats are from the right contract
            // I guess we can have an allowlist of contracts that can send data to this contract
            // And depending on the structure of the message we can update the stats or store the loot
            // Extract the user's address and loot from the message
            (address userAddress, string memory loot) = abi.decode(any2EvmMessage.data, (address, string));
            // Store the loot for the user
            if (bytes(users[userAddress].username).length == 0) {
                revert UserIsNotRegistered(userAddress);
            }
             users[userAddress].loot.push(loot);
            emit LootReceived(userAddress, loot);
        } else if (any2EvmMessage.sourceChainSelector == chainIdPolygonMumbai) {
            // Example: Update stats or perform other actions based on received data
            // Not sure about how we can have security based on making sure that the Loot and Stats are from the right contract
            // I guess we can have an allowlist of contracts that can send data to this contract
            // And depending on the structure of the message we can update the stats or store the loot
            // Extract the user's address and loot from the message
            (address userAddress, uint256 statId, uint256 value) = abi.decode(any2EvmMessage.data, (address, uint256, uint256));
            // Store the loot for the user
              if (bytes(users[userAddress].username).length == 0) {
                revert UserIsNotRegistered(userAddress);
            }
            _updateBigStats(statId, value, userAddress);
        } else {
            revert DestinationChainNotAllowlisted(any2EvmMessage.sourceChainSelector );
        }
     
     
    }



    // Events
    event UsernameRegistered(address indexed user, string username, bool isFree);
    event StatsUpdated(address indexed user, uint256 statId, uint256 value);
    event LootReceived(address indexed user, string loot);


    // errors
    error UsernameAlreadySet(string username);
    error UsernameNotSet(address user);
    error StatIdOutOfRange(uint256 statId);
    error UserIsNotRegistered(address user);
}