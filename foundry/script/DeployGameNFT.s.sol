// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {GameNFT} from "../src/GameNFT.sol";

contract DeployGameNFT is Script {
    function run() external returns (GameNFT) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        address deployerAddress = vm.addr(deployerPrivateKey);
        GameNFT gameNFT = new GameNFT("My Game NFTs", "MGN", deployerAddress);
        vm.stopBroadcast();
        return gameNFT;
    }
}
