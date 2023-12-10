// SPDX-License-Identifier: MIT
// solhint-disable-next-line
pragma solidity ^0.8.20;

 import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Timer.sol";

 
contract Ceptors is   ERC721URIStorage, Pausable, ERC721Burnable, Ownable,ERC721Enumerable {
    uint256 _tokenIdCounter;

    address public diceContract;

 
    constructor(address _diceAddress) ERC721("Ceptors", "CPTR") Ownable(msg.sender) {
     
        diceContract = _diceAddress;
    }

    function setPause(bool _isPaused) public onlyOwner {
        if (_isPaused) {
            _pause();
        } else {
            _unpause();
        }
    }

   
    function mint(string memory uri) public whenNotPaused {
         if (!Timer(diceContract).checkTimer(msg.sender)) {
                revert TimerExpired();
            }
        uint256 tokenId = _tokenIdCounter;
       
        _tokenIdCounter++;
            // Stop the burning timer
            Timer(diceContract).makeTimerUsed(msg.sender);

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }



    
    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

 
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
   function _update(address to, uint256 tokenId, address auth)
        internal
        virtual
        override(ERC721Enumerable, ERC721)
        returns (address)
    {
        return ERC721Enumerable._update(to, tokenId, auth);
    }
    function _increaseBalance(address account, uint128 value) internal   override(ERC721Enumerable, ERC721) {
        unchecked {
            return ERC721Enumerable. _increaseBalance(account, value);
        }
    }
     /// @dev Error thrown when the burning timer has expired.
    error TimerExpired();
}
