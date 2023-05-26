import assert from "assert";

require('dotenv').config()
const config = require('config');
const {
    DEFAULT_SIGNER_PRIVATE_KEY
} = process.env

const hre = require("hardhat");
const artifact = require('../artifacts/contracts/TokenBuildr.sol/TokenBuildr.json');

async function main() {
    const networkName = hre.network.name;
    console.log('Creating an ERC20 token on the network', networkName);
    const tokenParams = {
        name: 'Kimerran Test Coin',
        symbol: 'K1M',
        totalSupply: '100000000000000000000000'
    }

    const TOKEN_DEPLOYER_CONTRACT_ADDRESS = config.contracts.tokenDeployer[networkName];
    assert(TOKEN_DEPLOYER_CONTRACT_ADDRESS, "Please configure the token deployer contract address in config/default.json");

    const provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url)
    const contract = new hre.ethers.Contract(TOKEN_DEPLOYER_CONTRACT_ADDRESS, artifact.abi, provider)
    const wallet = new ethers.Wallet(DEFAULT_SIGNER_PRIVATE_KEY, provider)
    const response = await contract.connect(wallet).deployToken(tokenParams.name, tokenParams.symbol, tokenParams.totalSupply)

    console.log('tx', response.hash)
}

main()