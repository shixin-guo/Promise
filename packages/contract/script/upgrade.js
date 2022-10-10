require('@openzeppelin/hardhat-upgrades')
const { marketplaceAddress } = require('../config')
const { ethers, upgrades } = require('hardhat')

const fs = require('fs')
// todo
const ownerAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
async function main() {
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace')
  console.log('Deploying NFTMarketplace...')
  const nftMarketplace = await upgrades.upgradeProxy(
    marketplaceAddress,
    [ownerAddress],
    {
      initializer: 'initialize',
    }
  )

  await nftMarketplace.deployed()
  const nftMarketplaceProxyAddress = nftMarketplace.address
  console.log(nftMarketplaceProxyAddress, ' NFTMarketplace(proxy) address')

  console.log(
    await upgrades.erc1967.getImplementationAddress(nftMarketplaceProxyAddress),
    ' getImplementationAddress'
  )
  console.log(
    await upgrades.erc1967.getAdminAddress(nftMarketplaceProxyAddress),
    ' getAdminAddress'
  )

  console.log('nftMarketplace deployed to:', nftMarketplaceProxyAddress)
  // todo change env file
  fs.writeFileSync(
    './config.js',
    `export const marketplaceAddress = "${nftMarketplaceProxyAddress}"`
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
