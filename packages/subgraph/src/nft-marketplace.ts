import { BigInt, log } from '@graphprotocol/graph-ts'
import {
  MarketItemCreated,
  BuyMarketItem,
  ResellMarketItem,
  UpdateListingPrice,
} from '../generated/NFTMarketplace/NFTMarketplace'
import { getGlobalData } from './helper/global'
import { NFT, User } from '../generated/schema'

export function handleUpdateListingPrice(event: UpdateListingPrice): void {
  let GlobalData = getGlobalData()
  GlobalData.listingPrice = event.params.listingPrice
  GlobalData.listingPriceUpdateAt = event.block.timestamp as BigInt
}

export function handleMarketItemCreated(event: MarketItemCreated): void {
  const tokenId = event.params.tokenId.toHex()
  const creatorAddress = event.params.seller.toHexString()
  const timestamp = event.block.timestamp as BigInt
  let entity = NFT.load(tokenId)
  if (!entity) {
    entity = new NFT(tokenId)
    entity.owner = event.params.owner.toHexString()
    entity.price = event.params.price
    entity.fileUrl = event.params.fileUrl
    entity.sold = event.params.sold
    entity.creator = creatorAddress
    entity.createdAt = timestamp
    entity.updatedAt = timestamp
    log.info('create nft hash {}', [event.transaction.hash.toHexString()])
  }
  entity.save()
  let user = User.load(creatorAddress)
  if (!user) {
    user = new User(creatorAddress)
    user.firstJoinTime = timestamp
  }
  user.lastActivityTime = timestamp
  user.save()
}
export function handleBuyMarketItem(event: BuyMarketItem): void {
  const tokenId = event.params.tokenId.toHex()
  const buyerAddress = event.params.seller.toHexString()
  const timestamp = event.block.timestamp as BigInt
  let entity = NFT.load(tokenId)
  if (!entity) {
    entity = new NFT(tokenId)
  }
  entity.owner = event.params.owner.toHexString()
  entity.sold = event.params.sold
  entity.updatedAt = timestamp
  entity.save()
  let user = User.load(buyerAddress)
  if (!user) {
    user = new User(buyerAddress)
    user.firstJoinTime = timestamp
  }
  user.lastActivityTime = timestamp
  user.save()
}
export function handlerResellMarketItem(event: ResellMarketItem): void {
  const tokenId = event.params.tokenId.toHex()
  const timestamp = event.block.timestamp as BigInt
  let entity = NFT.load(tokenId)
  if (!entity) {
    entity = new NFT(tokenId)
  }
  entity.sold = event.params.sold
  entity.price = event.params.price
  entity.owner = event.params.owner.toHexString()
  entity.updatedAt = timestamp
  entity.save()
}
