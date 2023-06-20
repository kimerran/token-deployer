require('dotenv').config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const {
  ETHERSCAN_API_KEY,
  DEFAULT_SIGNER_PRIVATE_KEY,
  NETWORK_SEPOLIA_JSON_RPC_URL,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  gasReporter: {
    enabled: true
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  networks: {
    sepolia: {
      url: NETWORK_SEPOLIA_JSON_RPC_URL,
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    scroll: {
      url: 'https://alpha-rpc.scroll.io/l2',
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    neon: {
      url: 'https://devnet.neonevm.org/',
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    linea: {
      url: 'https://rpc.goerli.linea.build/',
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    evmos: {
      url: 'https://eth.bd.evmos.dev:8545	',
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    avaxtestnet: {
      url: 'https://api.avax-test.network/ext/C/rpc',
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    shardeumsphinx: {
      url: 'https://sphinx.shardeum.org/',
      chainId: 8082,
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    opbnb: {
      url: 'https://opbnb-testnet-rpc.bnbchain.org',
      chainId: 5611,
      gasPrice: 1500000001,
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    hardhat: {
      accounts: {
        accountsBalance: '100000000000000000000'
      }
    },
  }
};

export default config;
