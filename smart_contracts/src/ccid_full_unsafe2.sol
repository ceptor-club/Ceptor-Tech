// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
// are these CCIP libaries able to work with proxy contracts? @Chainlink Dev Experts
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface ICeptors {
    function balanceOf(address account) external view returns (uint256);
}

contract CeptorClubID is Ownable, CCIPReceiver {
    // User stats structure
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
    // i think we should let users leave the system and get their money back or 80%

    // XP multiplier based on Level. Level will be based on something.
    
    // address public ceptorsContractAddress; // ceptors might have to be deployed on each chain.
    AggregatorV3Interface internal priceFeed;
    string public chainSelector;
    // approved list of sender addresses for CCIP messages
    mapping(address => bool) public approvedSenders;

    // Events
    event UsernameRegistered(address indexed user, string username, bool isFree);
    event StatsUpdated(address indexed user, uint256 statId, uint256 value);
    event LootReceived(address indexed user, string loot);

    // Constructor for a non-proxy version, change to initializer if we want to do proxy
    // constructor(address _ceptorsAddress, address _priceFeed, address _router, string memory _chainSelector) CCIPReceiver(_router) Ownable(msg.sender) {
    //     ceptorsContractAddress = _ceptorsAddress;
    constructor(address _priceFeed, address _router, string memory _chainSelector) CCIPReceiver(_router) Ownable(msg.sender) {
        priceFeed = AggregatorV3Interface(_priceFeed);
        chainSelector = _chainSelector;
    }

    // function to let the owner set the approved senders
    function setApprovedSender(address _sender, bool _approved) public onlyOwner {
        approvedSenders[_sender] = _approved;
    }

    // Function to register or update a username
    function registerUsername(string memory _username) public payable {
        require(usernameAvailable(_username), "Username is taken");
        uint256 cost = getRegistrationCost(); 
        if (msg.sender != owner()) {
            require(msg.value >= cost, "Insufficient funds for registration");
        }
        users.push(msg.sender);
        usernames[msg.sender] = _username;
        emit UsernameRegistered(msg.sender, _username, msg.sender == owner());
    }

    // Helper function to check username availability
    function usernameAvailable(string memory _username) private view returns (bool) {
        for (uint i = 0; i < users.length; i++) {
            if (keccak256(bytes(usernames[users[i]])) == keccak256(bytes(_username))) {
                return false;
            }
        }
        return true;
    }

    // Function to get registration cost -- its crap
    function getRegistrationCost() public view returns (uint256) {
        (, int price,,,) = priceFeed.latestRoundData();
        return uint256(price) * 1e18;
    }

    // Function to update user stats
    function updateBigStats(uint256 statId, uint256 value) public onlyOwner {
        if (statId == 0) userStats[msg.sender].strong = uint8(value);
        else if (statId == 1) userStats[msg.sender].agile = uint8(value);
        else if (statId == 2) userStats[msg.sender].tanky = uint8(value);
        else if (statId == 3) userStats[msg.sender].clever = uint8(value);
        else if (statId == 4) userStats[msg.sender].wise = uint8(value);
        else if (statId == 5) userStats[msg.sender].cute = uint8(value);
        else if (statId == 6) userStats[msg.sender].lucky = uint8(value);
        emit StatsUpdated(msg.sender, statId, value);
    }

    // Function to store loot
    function storeLoot(string memory loot) public onlyOwner {
        for (uint256 i = 0; i < amount; i++) {
            userLoot[msg.sender].push(loot);
            emit LootReceived(msg.sender, loot);
        }
    }

    // CCIP Receive function -- have a seperate contract for each recieve (Loot and Stats)
    
    function _ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) internal override {
        // Does this work? @Chainlink Dev Experts
        require(approvedSenders[abi.decode(any2EvmMessage.sender, (address))], "Sender not approved");
        
        // Example: Update stats or perform other actions based on received data
        // Not sure about how we can have security based on making sure that the Loot and Stats are from the right contract
        // I guess we can have an allowlist of contracts that can send data to this contract
        // And depending on the structure of the message we can update the stats or store the loot
        // Extract the user's address and loot from the message
        (address userAddress, string memory loot) = abi.decode(any2EvmMessage.data, (address, string));
        // Store the loot for the user
        require(bytes(users[userAddress].username).length != 0, "User must have a username");
        users[userAddress].loot.push(loot);
        emit LootReceived(userAddress, loot);
    }

    // Function to check the blockchain this CCID is deployed to
    function checkDeployedChain() public view returns (string memory) {
        if (chainSelectors.length > 0) {
            return chainSelectors[chainSelectors.length - 1];
        }
        return "Chain selector not found";
    }

    // Additional functions and logic as needed...
}