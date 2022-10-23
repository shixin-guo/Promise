# Subgraph

Subgraph (thegraph.com)
doc: https://thegraph.com/docs/en/querying/graphql-api/
test studio: https://api.studio.thegraph.com/query/34822/znft/v0.01/graphql?query=

https://github.com/treejer/subgraph

---

## Deployment Instructions

2. [ONLY the first time] `npx graph auth https://api.thegraph.com/deploy/ <ACCESS_TOKEN>` (ACCESS_TOKEN is on thegraph.com)

3. `yarn build-deploy:rinkeby` | `yarn build-deploy:mainnet` (Choose your network deployment)

// export function handleApproval(event: Approval): void {
// // Entities can be loaded from the store using a string ID; this ID
// // needs to be unique across all entities of the same type
// let entity = NFT.load(event.transaction.from.toHex())

// // Entities only exist after they have been saved to the store;
// // `null` checks allow to create entities on demand
// if (!entity) {
// entity = new NFT(event.transaction.from.toHex())

// // Entity fields can be set using simple assignments
// entity.count = BigInt.fromI32(0)
// }

// // BigInt and BigDecimal math are supported
// entity.count = entity.count + BigInt.fromI32(1)

// // Entity fields can be set based on event parameters
// entity.owner = event.params.owner

// // Entities can be written to the store with `.save()`
// entity.save()

// // Note: If a handler doesn't require existing field values, it is faster
// // _not_ to load the entity from the store. Instead, create it fresh with
// // `new Entity(...)`, set the fields that should be updated and save the
// // entity back to the store. Fields that were not set or unset remain
// // unchanged, allowing for partial updates to be applied.

// // It is also possible to access smart contracts from mappings. For
// // example, the contract that has emitted the event can be connected to
// // with:
// //
// // let contract = Contract.bind(event.address)
// //
// // The following functions can then be called on this contract to access
// // state variables and other data:
// //
// // - contract.balanceOf(...)
// // - contract.fetchItemsListed(...)
// // - contract.fetchMarketItems(...)
// // - contract.fetchMyNFTs(...)
// // - contract.getApproved(...)
// // - contract.getCreateTokenId(...)
// // - contract.getListingPrice(...)
// // - contract.isApprovedForAll(...)
// // - contract.name(...)
// // - contract.ownerOf(...)
// // - contract.supportsInterface(...)
// // - contract.symbol(...)
// // - contract.tokenURI(...)
// }
