require('@nomiclabs/hardhat-waffle')
require('dotenv').config({
  path: '../../.env',
})
require('@openzeppelin/hardhat-upgrades')
require('hardhat-abi-exporter')
const fs = require('fs')

module.exports = {
  defaultNetwork: 'hardhat',
  allowUnlimitedContractSize: true,
  abiExporter: [
    {
      path: './abi',
      format: 'json',
    },
  ],
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   // Infura
    //   // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
    //   url: "https://rpc-mumbai.matic.today",
    //   accounts: [process.env.privateKey]
    // },
    // matic: {
    //   // Infura
    //   // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
    //   url: "https://rpc-mainnet.maticvigil.com",
    //   accounts: [process.env.privateKey]
    // }
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.infura_project_id}`,
      accounts: [process.env.op_account_private_key],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/99e46b5ce4c64a9882f1303e95e62dd3`,
      accounts: [process.env.op_account_private_key],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}
