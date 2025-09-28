// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract GameNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    mapping(address => mapping(uint256 => bool)) private _playerMints;
    
    // **关键修正**: 将状态变量重命名，以避免与父合约的 _baseURI() 函数冲突
    string private _tokenBaseURI;

    mapping(uint256 => uint256) public tokenIdToGameId;

    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC721(name, symbol) Ownable(initialOwner) {}

    function mintGame(uint256 gameId) public {
        require(!_playerMints[msg.sender][gameId], "GameNFT: You have already minted this game.");
        
        uint256 tokenId = _nextTokenId++;
        _playerMints[msg.sender][gameId] = true;
        
        tokenIdToGameId[tokenId] = gameId;
        
        _safeMint(msg.sender, tokenId);
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        // 更新我们自己的状态变量
        _tokenBaseURI = newBaseURI;
    }

    /**
     * @dev 这个函数现在正确地覆写了父函数，并返回我们自己的状态变量。
     */
    function _baseURI() internal view override returns (string memory) {
        return _tokenBaseURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        // 这里现在会正确地调用上面被覆写的 _baseURI() 函数
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, Strings.toString(tokenId))) : "";
    }
}

