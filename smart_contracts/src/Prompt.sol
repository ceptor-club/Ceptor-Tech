// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract Prompt is VRFConsumerBaseV2, Ownable {
  VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
  bytes32 private immutable i_keyhash; //gas Lane
  uint64 private immutable i_subscriptionId;
  uint16 private constant REQUEST_CONFIRMATIONS = 3;
  uint32 private immutable i_callbackGasLimit;
  uint32 private constant NUM_WORDS = 1;

  string[10] private i_prompts = [
    "Prompt 1",
    "Prompt 2",
    "Prompt 3",
    "Prompt 4",
    "Prompt 5",
    "Prompt 6",
    "Prompt 7",
    "Prompt 8",
    "Prompt 9",
    "Prompt 10"
  ];

  string public s_currentPrompt;
  uint256 public lastUpdated;
  string private s_lastPrompt;
  string private s_secondLastPrompt;
  uint public lastTimeStamp;

  event CurrentPrompt(string _currentPrompt);
  constructor(
    address new_owner,
    address vrfCoordindatorV2,
    bytes32 keyhash /* gasLane */,
    uint64 subscriptionId,
    uint32 callbackGasLimit
  ) VRFConsumerBaseV2(vrfCoordindatorV2) Ownable(new_owner) {
    i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordindatorV2);
    i_keyhash = keyhash;
    i_subscriptionId = subscriptionId;
    i_callbackGasLimit = callbackGasLimit;
  }


  function requestPromptUpdate() public returns (uint256 requestId) {
    requestId = i_vrfCoordinator.requestRandomWords(
      i_keyhash /* Or gasLane once again */,
      i_subscriptionId,
      REQUEST_CONFIRMATIONS,
      i_callbackGasLimit,
      NUM_WORDS
    );
  }

  function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
    // Find a new prompt that hasn't been used in the last two updates
    string memory newPrompt;
    uint256 i = randomWords[0] % i_prompts.length;
    while (compareStrings(i_prompts[i], s_lastPrompt) || compareStrings(i_prompts[i], s_secondLastPrompt)) {
      if (i == i_prompts.length - 1) {
        i = 0; // reset if we have checked all prompts
      } else {
        i++; // move to the next prompt
      }
    }
    newPrompt = i_prompts[i];

    // Update the last two used prompts
    s_secondLastPrompt = s_lastPrompt;
    s_lastPrompt = newPrompt;

    // Set the current prompt to the new prompt
    s_currentPrompt = newPrompt;

    emit CurrentPrompt(s_currentPrompt);
  }

  // Helper function to compare strings
  function compareStrings(string memory a, string memory b) private pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }

  function getPrompt(uint8 index) public view returns (string memory) {
    return i_prompts[index];
  }

  function getTotalPromptCount() public view returns (uint256) {
    return uint256(i_prompts.length);
  }

  function getCurrentPrompt() public view returns (string memory) {
    return s_currentPrompt;
  }

  function setNewTenPrompts(string[10] memory newPrompts) external onlyOwner {
    i_prompts = newPrompts;
  }
}