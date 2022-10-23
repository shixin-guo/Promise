import { GlobalData } from '../../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'

export function getGlobalData(): GlobalData {
  let gb = GlobalData.load('0')
  if (!gb) {
    gb = new GlobalData('0')
    gb.listingPrice = new BigInt(0)
    gb.listingPriceUpdateAt = new BigInt(0)
  }
  return gb
}
