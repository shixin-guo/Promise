require('@nomiclabs/hardhat-waffle')
require('@openzeppelin/hardhat-upgrades')
const fs = require('fs')

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
      url: `https://rinkeby.infura.io/v3/${process.env.infura_project_id}`,
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
