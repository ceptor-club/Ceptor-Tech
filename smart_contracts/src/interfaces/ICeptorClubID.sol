interface ICeptorClubID  {
     

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

 
    function registerPlayer(string memory _username) external payable  ;
   
    function registerGameMaster(string memory _username) external payable  ;
    function getLatestPrice() external view returns (uint256);
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