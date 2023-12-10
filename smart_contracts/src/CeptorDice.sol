// SPDX-License-Identifier: MIT

/*
'########::'####:'########:'########:
 ##.... ##:. ##::..... ##:: ##.....::
 ##:::: ##:: ##:::::: ##::: ##:::::::
 ##:::: ##:: ##::::: ##:::: ######:::
 ##:::: ##:: ##:::: ##::::: ##...::::
 ##:::: ##:: ##::: ##:::::: ##:::::::
 ########::'####: ########: ########:
........:::....::........::........::
*/

/* 
types of dice?
d4, d6, d8, d10, d12, d20
*/

// solhint-disable-next-line
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Timer.sol";

// TODO: add burnCount where needed ----------------------------<<<<<<

contract CeptorDice is ERC1155, Timer {
    struct Token {
        uint256 mintCount;
        uint256 burnCount;
        uint256 time;
        uint256 price;
        string uri;
        bool paused;
        bool exists;
    }

    uint256 public totalTokens; //total types of tokens created, not minted
    mapping(uint256 => Token) public tokens; //tokenID => Token struct
    mapping(address => uint256) public addressMinted; //address => amount minted

    constructor() ERC1155("CeptorDice") {
        totalTokens = 0;
    }

    // MINTING ----------------------------

    //dev batch mint
    function minterMintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) public onlyRole(MINTER) {
        for (uint256 i = 0; i < _ids.length; i++) {
            _mint(_to, _ids[i], _amounts[i], _data);
        }
    }

    //bulk mint
    function mintBatch(
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) public payable {
        // require(msg.sender == burnAndMintAddress, "Not authorized.");
        require(_ids.length == _amounts.length, "Arr not same ln");

        //check if tokens are paused
        for (uint256 i = 0; i < _ids.length; i++) {
            require(tokens[_ids[i]].exists, "Doesn't exist.");
            require(!tokens[_ids[i]].paused, "Paused.");
        }

        uint256 totalCost = 0;
        for (uint256 i = 0; i < _ids.length; i++) {
            require(_amounts[i] > 0, "not > 0");
            totalCost += tokens[_ids[i]].price * _amounts[i];
        }

        require(msg.value >= totalCost, "Insufficient funds.");

        //update mint counts
        for (uint256 i = 0; i < _ids.length; i++) {
            tokens[_ids[i]].mintCount += _amounts[i];
            addressMinted[msg.sender] += _amounts[i];
        }
        _mintBatch(msg.sender, _ids, _amounts, "");
    }

    // BURNING < ----------------------------

    address public ceptorContractAddress;

    /// @dev Todo: remove the amount if we only  minit one at a time or support this logic amount * time = total time
    function timerBurn(address _address, uint256 _id, uint256 _amount) public {
        require(tokens[_id].exists, "Doesn't exist.");
        require(_amount > 0, "Amount must be greater than 0.");
        require(
            balanceOf(_address, _id) >= _amount,
            "Not enough tokens to burn."
        );

        _burn(_address, _id, _amount);
        // start timer on avatar contract to mint avatar
        //FunctionInterface(ceptorContractAddress).setTimer(_address, tokens[_id].time);
        _startTimer(_address, tokens[_id].time);
        tokens[_id].burnCount += _amount;
    }

    function burn(
        address _address,
        uint256 _id,
        uint256 _amount
    ) public onlyRole(MINTER) {
        require(tokens[_id].exists, "Doesn't exist.");
        require(_amount > 0, "Amount must be greater than 0.");
        require(
            balanceOf(_address, _id) >= _amount,
            "Not enough tokens to burn."
        );

        _burn(_address, _id, _amount);
        tokens[_id].burnCount += _amount;
    }

    // ADDING NEW DICE ----------------------------

    //batch add tokens
    function addNewTokens(
        uint256[] memory _ids,
        uint256[] memory _prices,
        uint256[] memory _times,
        string[] memory _uris
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            _ids.length == _uris.length && _ids.length == _prices.length,
            "Arr not same ln" // <-----------------  NEED TO FIX THIS FOR MORE COMPARES
        );

        for (uint256 i = 0; i < _ids.length; i++) {
            // require(tokens[_ids[i]].exists, "Token already created");
            bool isNew;
            if (!tokens[_ids[i]].exists) isNew = true;

            Token storage newToken = tokens[_ids[i]];
            newToken.price = _prices[i];
            newToken.uri = _uris[i];
            newToken.time = _times[i];

            if (isNew) {
                newToken.mintCount = 0;
                newToken.burnCount = 0;
                newToken.exists = true;
                newToken.paused = false;
                totalTokens++;
            }
        }
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControl, ERC1155) returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IAccessControl).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    //         function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, AccessControl, IERC165, ERC1155) returns (bool) {
    //     return super.supportsInterface(interfaceId);
    // }

    // PAUSING ----------------------------

    function pauseTokens(
        uint256[] memory _ids
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < _ids.length; i++) {
            require(tokens[_ids[i]].exists, "Doesn't exist.");
            tokens[_ids[i]].paused = true;
        }
    }

    function unpauseTokens(
        uint256[] memory _ids
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < _ids.length; i++) {
            require(tokens[_ids[i]].exists, "Doesn't exist.");

            tokens[_ids[i]].paused = false;
        }
    }

    // SETTERS ----------------------------

    function setTokenURI(
        uint256 _id,
        string memory _uri
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(tokens[_id].exists, "Doesn't exist.");
        tokens[_id].uri = _uri;
    }

    // function setPrice(uint256 _id, uint256 _price) public onlyRole(DEFAULT_ADMIN_ROLE) {
    //   require(tokens[_id].exists, "Token doesn't exist.");
    //   tokens[_id].price = _price;
    // }

    function setCeptorAddress(
        address _address
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        ceptorContractAddress = _address;
    }

    // GETTERS ----------------------------

    function uri(uint256 _id) public view override returns (string memory) {
        require(tokens[_id].exists, "Doesn't exist.");
        return tokens[_id].uri;
    }

    function balanceOf(
        address _owner,
        uint256 _id
    ) public view override returns (uint256) {
        require(tokens[_id].exists, "Doesn't exist.");
        return super.balanceOf(_owner, _id);
    }

    function totalSupply(uint256 _id) public view returns (uint256) {
        require(tokens[_id].exists, "Doesn't exist.");
        return tokens[_id].mintCount - tokens[_id].burnCount;
    }

    // function price(uint256 _id) public view returns (uint256) {
    //   require(tokens[_id].exists, "Doesn't exist.");
    //   return tokens[_id].price;
    // }

    // function tokenInfo(uint256 _id) public view returns (Token memory) {
    //   require(tokens[_id].exists, "Doesn't exist.");
    //   return tokens[_id];
    // }

    // function allTokenInfo() public view returns (Token[] memory) {
    //   //can use this to quickly see a huge list of all the cards i think
    //   Token[] memory allTokens = new Token[](totalTokens);
    //   for (uint256 i = 0; i < totalTokens; i++) {
    //     allTokens[i] = tokens[i];
    //   }
    //   return allTokens;
    // }

    // WITHDRAW ----------------------------

    function withdraw() public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(address(this).balance > 0, "No funds");
        payable(msg.sender).transfer(address(this).balance);
    }
}
