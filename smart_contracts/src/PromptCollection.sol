/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Prompt.sol";

contract PromptCollection is ERC721, Prompt{
    constructor(
        address new_owner,
        address vrfCoordindatorV2,
        bytes32 keyhash, /* gasLane */
        uint64 subscriptionId,
        uint32 callbackGasLimit
    ) ERC721("PromptCollection", "PC") Prompt (new_owner, vrfCoordindatorV2, keyhash, subscriptionId, callbackGasLimit)
    
    {}

   
    mapping(uint256 => uint256[]) public weekNFTs;
 
    function mint() public {
        require(weekTimeStamp != 0, "week not set");
        if (block.timestamp < weekTimeStamp + 604800) {
            // check burning timer
            uint256 tokenId = encodeTokenId(weekTimeStamp, weekNFTs[weekNumber].length);
            weekNFTs[weekTimeStamp].push(tokenId);
            _mint(msg.sender, tokenId);
        }
    }

    /**
     * This function takes two numbers (num1 and num2) as input parameters.
     * It shifts the bits of num1 to the left by 128 positions. This effectively places the bits of num1 in the higher-order bits of the resulting token ID.
     * It then uses the bitwise OR (|) operator to combine the shifted num1 with num2. This creates a 256-bit integer where the higher-order bits represent num1 and the lower-order bits represent num2.
     * The combined integer is returned as the unique token ID.
     */
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
}
