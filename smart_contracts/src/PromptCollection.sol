// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Prompt.sol";
import "./Timer.sol";

/// @title PromptCollection Contract
/// @dev Extends ERC721 and Prompt contracts to manage collections of NFTs with specific functionality.
contract PromptCollection is ERC721, Prompt {
    address public diceContract;

    /// @dev Constructor initializes the contract with the specified parameters and sets the Dice contract address.
    constructor(
         address vrfCoordindatorV2,
        address _diceContract,
        bytes32 keyhash,
        uint64 subscriptionId,
        uint32 callbackGasLimit
    )
        ERC721("PromptCollection", "PC")
        Prompt( vrfCoordindatorV2, keyhash, subscriptionId, callbackGasLimit)
    {
        diceContract = _diceContract;
    }

    // Mapping from a week timestamp to an array of NFT IDs minted during that week
    mapping(uint256 => uint256[]) public weekNFTs;

    /// @notice Mints an NFT if the current timestamp is within the current week.
    /// @dev Requires the burning timer to be active, checks the week timestamp, and mints a unique NFT ID.
    function mint() public {
        require(weekTimeStamp != 0, "week not set");
        if (block.timestamp < weekTimeStamp + 604800) {
            // Check if the burning timer is still active
            if (!Timer(diceContract).checkTimer(msg.sender)) {
                revert TimerExpired();
            }

            // Generate a unique token ID and mint the NFT
            uint256 tokenId = encodeTokenId(weekTimeStamp, weekNFTs[weekNumber].length);
            weekNFTs[weekTimeStamp].push(tokenId);

            // Stop the burning timer
            Timer(diceContract).makeTimerUsed(msg.sender);

            // Mint the NFT to the sender
            _mint(msg.sender, tokenId);
        }
    }

    /// @dev Encodes two numbers into a unique token ID.
    /// @param num1 The higher-order bits of the token ID.
    /// @param num2 The lower-order bits of the token ID.
    /// @return The unique token ID combining num1 and num2.
    function encodeTokenId(uint256 num1, uint256 num2) internal pure returns (uint256) {
        return (num1 << 128) | num2;
    }


    /**
     * This function takes a token ID (tokenId) as an input parameter.
     * It uses bitwise AND (&) with ((1 << 128) - 1) to extract the lower-order 128 bits of the tokenId, which represent num2.
     * It uses the right shift (>>) operator to extract the higher-order bits of the tokenId, which represent num1.
     * The function returns a tuple (num1, num2) representing the original pair of numbers.
     */
    // function decodeTokenId(uint256 tokenId) internal pure returns (uint256, uint256) {
    //     uint256 num2 = tokenId & ((1 << 128) - 1);
    //     uint256 num1 = tokenId >> 128;
    //     return (num1, num2);
    // }
    /// @dev Error thrown when the burning timer has expired.
    error TimerExpired();
}
