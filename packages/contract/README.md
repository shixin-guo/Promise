    // "dev": "hardhat run scripts/deploy.js --network localhost && next dev",

## NFT marketplace

This is the codebase to go along with tbe blog post [Building a Full Stack NFT Marketplace on Ethereum with Polygon](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb)

#### Local setup

To run this project locally, follow these steps.
before you start server, you should change your metamask wallet to localhost:8425 and import a test account,

1. Start the local Hardhat node

```sh
npx hardhat node
```

2. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

3. Start the app

```
npm run dev
```

### Configuration

To deploy to Polygon test or main networks, update the configurations located in **hardhat.config.js** to use a private key and, optionally, deploy to a private RPC like Infura.

```javascript
require('@nomiclabs/hardhat-waffle')
const fs = require('fs')
const privateKey =
  fs.readFileSync('.secret').toString().trim() ||
  '80ae8c1caa1d4dc6a972fd899ca864d4'

// infuraId is optional if you are using Infura RPC
const infuraId = '99e46b5ce4c64a9882f1303e95e62dd3'.toString().trim() || ''

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
      url: 'https://rpc-mumbai.matic.today',
      accounts: [privateKey],
    },
    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: 'https://rpc-mainnet.maticvigil.com',
      accounts: [privateKey],
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/99e46b5ce4c64a9882f1303e95e62dd3',
      accounts: [privateKey],
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
```

If using Infura, update **.infuraid** with your [Infura](https://infura.io/) project ID.
