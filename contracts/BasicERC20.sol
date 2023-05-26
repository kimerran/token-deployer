// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BasicERC20 is ERC20 {
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
    event TokenMinted(
        address indexed to,
        address indexed minter,
        uint256 amount
    );

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address _owner
    ) ERC20(name, symbol) {
        _mint(_owner, initialSupply);
        owner = _owner;
    }

    function freeMint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
