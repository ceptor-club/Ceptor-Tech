// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NiftyD20 is ERC721, ERC721Enumerable, ERC721Burnable, Ownable, VRFConsumerBaseV2 {
    uint256 private _nextTokenId;
    uint256 private constant ROLL_IN_PROGRESS = 42;
    uint64 s_subscriptionId = 7632;
    address vrfCoordinator = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;
    bytes32 s_keyHash = 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
    uint32 callbackGasLimit = 40000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;
    address s_owner;

    VRFCoordinatorV2Interface COORDINATOR;

    mapping(uint256 => uint256) private s_rollers;
    //mapping(address => uint256) private s_results;
    mapping(uint256 => uint256) private tokenIdToRollResult;

    event DiceRolled(uint256 indexed requestId, address indexed roller);
    event DiceLanded(uint256 indexed requestId, uint256 indexed result);


    constructor(address initialOwner)
        ERC721("Nifty D20", "ND20")
        Ownable(initialOwner)
        VRFConsumerBaseV2(vrfCoordinator)
    {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_owner = msg.sender; // ?
       
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        uint256 d20Value = (randomWords[0] % 20) + 1;
        tokenIdToRollResult[s_rollers[requestId]] = d20Value;
        emit DiceLanded(requestId, d20Value);
    }

    function rollDice(uint256 tokenId    
    ) public onlyOwner returns (uint256 requestId) {
        require(ownerOf(tokenId) == msg.sender, "Must own the token to roll");
        require(tokenIdToRollResult[tokenId] == 0 || tokenIdToRollResult[tokenId] == ROLL_IN_PROGRESS, "Dice already rolled for this token");
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        s_rollers[requestId] = tokenId;
        tokenIdToRollResult[tokenId] = ROLL_IN_PROGRESS;
        emit DiceRolled(requestId, msg.sender);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function getRollResult(uint256 tokenId) public view returns (uint256) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenIdToRollResult[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");

        uint256 rollResult = getRollResult(tokenId);

        // Base IPFS URL for metadata files
        string memory baseIPFSUrl = "https://bafybeiflbu7gwosuxb4testqt4opg67lsdomwakmr3lia725awx6dsjaxq.ipfs.nftstorage.link/";

        // Determine the correct metadata file based on the roll result
        string memory metadataFile;
        if (rollResult == 0 || rollResult == ROLL_IN_PROGRESS) {
            metadataFile = "42.json"; // Assuming you have a default.json for the rolling state
        } else {
        metadataFile = string(abi.encodePacked(Strings.toString(rollResult),".json"));
        }
    
    return string(abi.encodePacked(baseIPFSUrl,metadataFile));

    }
}