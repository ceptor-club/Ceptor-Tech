//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ICeptorDice {
       function minterMintBatch(address _to, uint256[] memory _ids, uint256[] memory _amounts, bytes memory _data) external;
         function mintBatch(uint256[] memory _ids, uint256[] memory _amounts) external payable;
          function timerBurn(address _address, uint256 _id, uint256 _amount) external;
}