// SPDX-License-Identifier: MIT
// solhint-disable-next-line
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
 
 
interface FunctionInterface {
  //used for calling functions from other contracts
  function balanceOf(address account, uint256 id)
    external
    view
    returns (uint256);

  function burn(
    address,
    uint256 id,
    uint256 amount
  ) external;
}

contract Ceptors is
  ERC721,
  ERC721Enumerable,
  ERC721URIStorage,
  Pausable,
  ERC721Burnable
{
 
  uint256  _tokenIdCounter;

  address public diceContractAddress;

  mapping(address => uint256) public userTimers;

  constructor(address _diceAddress) ERC721("Ceptors", "CPTR") {
    _grantRole(OWNER, msg.sender);
    _grantRole(MINTER, msg.sender);
    _grantRole(MINTER, _diceAddress);
    diceContractAddress = _diceAddress;
  }

  function setPause(bool _isPaused) public onlyRole(OWNER) {
    if (_isPaused) {
      _pause();
    } else {
      _unpause();
    }
  }
      function _increaseBalance(address account, uint128 value) internal override (ERC721Enumerable,ERC721) {
       super._increaseBalance(account, value);
    }
 function _update(address to, uint256 tokenId, address auth) internal virtual override (ERC721Enumerable,ERC721)
  returns (address) {
 return super._update(to, tokenId, auth);
 }
  // function unpause() public onlyRole(OWNER) {
  //   _unpause();
  // }

  function mint(string memory uri) public whenNotPaused {
    require(
      isBefore(userTimers[msg.sender]),
      "Time is up! Insert another Dize to get more time."
    );

    uint256 tokenId = _tokenIdCounter ;
    userTimers[msg.sender] = 0;
    _tokenIdCounter++;
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, uri);
  }

  function isBefore(uint256 _userTimer) private view returns (bool) {
    return block.timestamp < _userTimer;
  }

  function setTimer(address _address, uint256 _time) public onlyRole(MINTER) {
    if (userTimers[_address] == 0 || !isBefore(userTimers[_address])) {
       userTimers[_address] = block.timestamp + _time;
    } else {
      userTimers[_address] += _time;
    }
  }

  // The following functions are overrides required by Solidity.

 
 

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable, ERC721URIStorage)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  // ACCESS CONTROL ----------------------------

  mapping(bytes32 => mapping(address => bool)) public roles;
  //0xf0887ba65ee2024ea881d91b74c2450ef19e1557f03bed3ea9f16b037cbe2dc9
  bytes32 public constant MINTER = keccak256(abi.encodePacked("MINTER")); // minter role is for other contracts to mint tokens
  bytes32 public constant OWNER = keccak256(abi.encodePacked("OWNER")); // owner role is for the owner of the contract

  modifier onlyRole(bytes32 role) {
    require(roles[role][msg.sender], "Not authorized.");
    _;
  }

  function _grantRole(bytes32 role, address account) internal {
    roles[role][account] = true;
  }

  function grantRole(bytes32 role, address account) external onlyRole(OWNER) {
    _grantRole(role, account);
  }

  function _revokeRole(bytes32 role, address account) internal {
    roles[role][account] = false;
  }

  function revokeRole(bytes32 role, address account) external onlyRole(OWNER) {
    _revokeRole(role, account);
  }

  function transferOwnership(address newOwner) external onlyRole(OWNER) {
    _grantRole(OWNER, newOwner);
    _grantRole(MINTER, newOwner);
    _revokeRole(OWNER, msg.sender);
    _revokeRole(MINTER, msg.sender);
  }
}