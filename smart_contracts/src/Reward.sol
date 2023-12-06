/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {Functions, FunctionsClient} from "@chainlink/contracts/src/v0.8/dev/functions/FunctionsClient.sol";
 import "@openzeppelin/contracts/access/Ownable.sol";
import "./PromptCollection.sol";
import "./CeptorDice.sol";


/// @title Reward
/// @author Eman Herawy
/// @dev The contract should manage minting Dice nfts for the ost liked POW NFT each week. the contract consume chainlink function to call the api and retreive winning nft then the contract will mint dice for the token owner. this contract must have minter role in Dices contract
 contract Reward is  Ownable, FunctionsClient{
         using Functions for Functions.Request;
      uint64 subscriptionId;
      PromptCollection prompt;
      CeptorDice dice;
 
  string internal checkLogic;

  mapping (string=>bool) public usedRequests;


  event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);
  event Claimed(uint amount, address by);

  constructor(address oracle,  uint64 _subscriptionId,  string memory _checkLogic, address diceContract, address promptContract) FunctionsClient(oracle) Ownable(msg.sender) {
    checkLogic = _checkLogic;
 
    subscriptionId = _subscriptionId;
    dice=CeptorDice(diceContract);
    prompt=PromptCollection(promptContract);
    
  }
 


  /// @notice Can be called by maintainers to claim donations made to their repositories
  function getWinner() public {
 
    Functions.Request memory req;
    req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, checkLogic);

    // string[] memory args = new string[](1);
    // args[0] = prUrl;
 
    // req.addArgs(args);
    
   
    bytes32 assignedReqID = sendRequest(req, subscriptionId, 300000);
      }
 

 

  /// @notice Callback that is invoked once the DON has resolved the request or hit an error
  ///
  /// @param requestId The request ID, returned by sendRequest()
  /// @param response Aggregated response from the user code
  /// @param err Aggregated error from the user code or from the execution pipeline
  /// Either response or error parameter will be set, but never both
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    emit OCRResponse(requestId, response, err);
              uint256 tokenId = abi.decode(response,(uint256));
               address _to = prompt.ownerOf(tokenId);
             uint256[] memory _ids=new uint256[](4);
              _ids[0]=0;
              _ids[1]=1;
              _ids[2]=2;
              _ids[3]=3;

             uint256[] memory _amounts=new uint256[](4);
              _amounts[0]=1;
              _amounts[1]=1;
              _amounts[2]=1;
              _amounts[3]=1;
              dice.minterMintBatch(_to,_ids,_amounts,"");
              // stop timer 
              dice.makeTimerUsed(_to);
         // logic for caling the owner of token and minting nft 
  }

  /// @notice Allows the Functions oracle address to be updated
  ///
  /// @param oracle New oracle address
  function updateOracleAddress(address oracle) public onlyOwner {
    setOracle(oracle);
  }



    
    
   }