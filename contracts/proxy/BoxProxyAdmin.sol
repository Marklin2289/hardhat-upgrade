// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openZeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract BoxProxyAdmin is ProxyAdmin {
    constructor(address /* owner */)ProxyAdmin() {
        // We just need this for our hardhat tooling right now
    }
}