// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface ICeptors {
    function balanceOf(address account) external view returns (uint256);
}

contract CCID is Ownable, CCIPReceiver {
    // User stats structure
    struct UserStats {
        uint256 strong;
        uint256 agile;
        uint256 tanky;
        uint256 clever;
        uint256 wise;
        uint256 cute;
        uint256 lucky;
    }

    // State variables
    address[] public users;
    mapping(address => string) public usernames;
    mapping(address => UserStats) public userStats;
    mapping(address => string[]) public userLoot; // Mapping to store loot
    address public ceptorsContractAddress;
    AggregatorV3Interface internal priceFeed;

    // Events
    event UsernameRegistered(address indexed user, string username, bool isFree);
    event StatsUpdated(address indexed user, uint256 statId, uint256 value);
    event LootReceived(address indexed user, string loot);

    // Constructor
    constructor(address _ceptorsAddress, address _priceFeed, address _router) CCIPReceiver(_router) Ownable(msg.sender) {
        ceptorsContractAddress = _ceptorsAddress;
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    // Function to register or update a username
    function registerUsername(string memory _username) public payable {
        require(usernameAvailable(_username), "Username is taken");
        uint256 cost = getRegistrationCost(); // this needs some work
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

    // Function to get registration cost
    function getRegistrationCost() public view returns (uint256) {
        (, int price,,,) = priceFeed.latestRoundData();
        // Adjust the calculation as needed based on the Chainlink price feed
        return uint256(price) * 1e18; // Placeholder calculation
    }

    // Function to update user stats
    function updateBigStats(uint256 statId, uint256 value) public onlyOwner {
        // Update logic for each stat based on statId
        // For example, update userStats[msg.sender].strength = value; if statId corresponds to strength
        if (statId == 0) userStats[msg.sender].strength = value;
        else if (statId == 1) userStats[msg.sender].dexterity = value;
        else if (statId == 2) userStats[msg.sender].constitution = value;
        else if (statId == 3) userStats[msg.sender].intelligence = value;
        else if (statId == 4) userStats[msg.sender].wisdom = value;
        else if (statId == 5) userStats[msg.sender].charisma = value;
        else if (statId == 6) userStats[msg.sender].lucky = value;
        emit StatsUpdated(msg.sender, statId, value);
    }

    // Function to store loot
    function storeLoot(string memory loot) public onlyOwner {
        uint256 amount = ICeptors(ceptorsContractAddress).balanceOf(msg.sender);
        for (uint256 i = 0; i < amount; i++) {
            userLoot[msg.sender].push(loot);
            emit LootReceived(msg.sender, loot);
        }
    }

    // CCIP Receive function
    function _ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) internal override {
        // Handle received CCIP messages
        // Example: Update stats or perform other actions based on received data
        // Not sure about how we can have security based on making sure that the Loot and Stats are from the right contract
        // I guess we can have an allowlist of contracts that can send data to this contract
        // And depending on the structure of the message we can update the stats or store the loot

    }

    // Additional functions and logic as needed...
}

// Proxy contract setup...