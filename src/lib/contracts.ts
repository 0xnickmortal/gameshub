// 文件路径: src/lib/contracts.ts

export const contractConfig = {
  // 请确保这里的地址是您通过 Foundry 部署后得到的最新合约地址
  address: '0x907058aD117d4A5EA4C0D9F0044dA860B8030Dcf', 
  
  // 这是与您最终版 GameNFT.sol 匹配的、完整且正确的 ABI
  abi: [
    {
        "type": "constructor",
        "inputs": [
            { "name": "name", "type": "string", "internalType": "string" },
            { "name": "symbol", "type": "string", "internalType": "string" },
            { "name": "initialOwner", "type": "address", "internalType": "address" }
        ],
        "stateMutability": "nonpayable"
    },
    { "type": "function", "name": "approve", "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "balanceOf", "inputs": [ { "name": "owner", "type": "address" } ], "outputs": [ { "name": "", "type": "uint256" } ], "stateMutability": "view" },
    { "type": "function", "name": "getApproved", "inputs": [ { "name": "tokenId", "type": "uint256" } ], "outputs": [ { "name": "", "type": "address" } ], "stateMutability": "view" },
    { "type": "function", "name": "isApprovedForAll", "inputs": [ { "name": "owner", "type": "address" }, { "name": "operator", "type": "address" } ], "outputs": [ { "name": "", "type": "bool" } ], "stateMutability": "view" },
    { "type": "function", "name": "mintGame", "inputs": [ { "name": "gameId", "type": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "name", "inputs": [], "outputs": [ { "name": "", "type": "string" } ], "stateMutability": "view" },
    { "type": "function", "name": "owner", "inputs": [], "outputs": [ { "name": "", "type": "address" } ], "stateMutability": "view" },
    { "type": "function", "name": "ownerOf", "inputs": [ { "name": "tokenId", "type": "uint256" } ], "outputs": [ { "name": "", "type": "address" } ], "stateMutability": "view" },
    { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "safeTransferFrom", "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "safeTransferFrom", "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "data", "type": "bytes" } ], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "setApprovalForAll", "inputs": [ { "name": "operator", "type": "address" }, { "name": "approved", "type": "bool" } ], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "setBaseURI", "inputs": [ { "name": "newBaseURI", "type": "string" } ], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "supportsInterface", "inputs": [ { "name": "interfaceId", "type": "bytes4" } ], "outputs": [ { "name": "", "type": "bool" } ], "stateMutability": "view" },
    { "type": "function", "name": "symbol", "inputs": [], "outputs": [ { "name": "", "type": "string" } ], "stateMutability": "view" },
    { "type": "function", "name": "tokenIdToGameId", "inputs": [ { "name": "", "type": "uint256" } ], "outputs": [ { "name": "", "type": "uint256" } ], "stateMutability": "view" },
    { "type": "function", "name": "tokenURI", "inputs": [ { "name": "tokenId", "type": "uint256" } ], "outputs": [ { "name": "", "type": "string" } ], "stateMutability": "view" },
    { "type": "function", "name": "transferFrom", "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "transferOwnership", "inputs": [ { "name": "newOwner", "type": "address" } ], "outputs": [], "stateMutability": "nonpayable" }
  ],
} as const;