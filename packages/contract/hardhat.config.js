require('@nomiclabs/hardhat-waffle')
const fs = require('fs')

const infuraId = '99e46b5ce4c64a9882f1303e95e62dd3'

module.exports = {
  defaultNetwork: 'hardhat',
  allowUnlimitedContractSize: true,
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
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraId}`,
      accounts: [
        '08a6ef685b8ee7fcf57bdfa4ce526b1f599da1c06b373bd3a5bf7f08c79c903d',
      ],
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
