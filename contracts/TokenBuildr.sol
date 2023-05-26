// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./BasicERC20.sol";

contract TokenBuildr {
    address _owner;
    mapping(string => Token) public tokens;
    mapping(address => address[]) ownerships;
    struct Token {
        uint256 initialSupply;
        address owner;
        address contractAddress;
        string symbol;
    }
    event TokenCreated(
        address indexed owner,
        address contractAddress,
        string indexed name,
        string symbol
    );

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    function deployToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public {
        require(tokens[name].owner == address(0), "Token already exists");
        ERC20 newToken = new BasicERC20(
            name,
            symbol,
            initialSupply,
            msg.sender
        );

        tokens[name] = Token(
            initialSupply,
            msg.sender,
            address(newToken),
            symbol
        );
        ownerships[msg.sender].push(address(newToken));
        emit TokenCreated(msg.sender, address(newToken), name, symbol);
    }

    function getTokenAddress(string memory name) public view returns (address) {
        return tokens[name].contractAddress;
    }

    function getTokenOwner(string memory name) public view returns (address) {
        return tokens[name].owner;
    }

    function getTokensByOwner(
        address owner
    ) public view returns (address[] memory) {
        return ownerships[owner];
    }
}
