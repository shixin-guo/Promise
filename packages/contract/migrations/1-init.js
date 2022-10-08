const hardhat = require('hardhat')
const fs = require('fs')
// todo
const ownerAddress = '0xe7a30f9798966A088e59B51b62624125B1ec17a9'
async function main() {
  const NFTMarketplace = await hardhat.ethers.getContractFactory(
    'NFTMarketplace'
  )
  console.log('Deploying NFTMarketplace...')
  const nftMarketplace = await upgrades.deployProxy(NFTMarketplace, [], {
    initializer: 'globalStore',
  })
  // const nftMarketplace = await NFTMarketplace.deploy()
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
