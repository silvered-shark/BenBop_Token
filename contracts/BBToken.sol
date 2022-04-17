//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BBToken is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function faucet(uint256 amount) public {
        _mint(msg.sender, amount * (10 ** 18));
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount * (10 ** 18));
        return true;
    }
}
