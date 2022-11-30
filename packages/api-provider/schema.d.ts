export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: any
  BigInt: any
  Bytes: any
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>
  number?: InputMaybe<Scalars['Int']>
  number_gte?: InputMaybe<Scalars['Int']>
}

export type GlobalData = {
  __typename?: 'GlobalData'
  id: Scalars['ID']
  listingPrice: Scalars['BigInt']
  listingPriceUpdateAt: Scalars['BigInt']
}

export type GlobalData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  listingPrice?: InputMaybe<Scalars['BigInt']>
  listingPriceUpdateAt?: InputMaybe<Scalars['BigInt']>
  listingPriceUpdateAt_gt?: InputMaybe<Scalars['BigInt']>
  listingPriceUpdateAt_gte?: InputMaybe<Scalars['BigInt']>
  listingPriceUpdateAt_in?: InputMaybe<Array<Scalars['BigInt']>>
  listingPriceUpdateAt_lt?: InputMaybe<Scalars['BigInt']>
  listingPriceUpdateAt_lte?: InputMaybe<Scalars['BigInt']>
  listingPriceUpdateAt_not?: InputMaybe<Scalars['BigInt']>
  listingPriceUpdateAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  listingPrice_gt?: InputMaybe<Scalars['BigInt']>
  listingPrice_gte?: InputMaybe<Scalars['BigInt']>
  listingPrice_in?: InputMaybe<Array<Scalars['BigInt']>>
  listingPrice_lt?: InputMaybe<Scalars['BigInt']>
  listingPrice_lte?: InputMaybe<Scalars['BigInt']>
  listingPrice_not?: InputMaybe<Scalars['BigInt']>
  listingPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum GlobalData_OrderBy {
  Id = 'id',
  ListingPrice = 'listingPrice',
  ListingPriceUpdateAt = 'listingPriceUpdateAt',
}

export type Nft = {
  __typename?: 'NFT'
  createdAt: Scalars['BigInt']
  creator: User
  fileUrl: Scalars['String']
  id: Scalars['ID']
  owner: User
  price: Scalars['BigInt']
  sold: Scalars['Boolean']
  specs?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['BigInt']>
}

export type Nft_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  createdAt?: InputMaybe<Scalars['BigInt']>
  createdAt_gt?: InputMaybe<Scalars['BigInt']>
  createdAt_gte?: InputMaybe<Scalars['BigInt']>
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>
  createdAt_lt?: InputMaybe<Scalars['BigInt']>
  createdAt_lte?: InputMaybe<Scalars['BigInt']>
  createdAt_not?: InputMaybe<Scalars['BigInt']>
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  creator?: InputMaybe<Scalars['String']>
  creator_?: InputMaybe<User_Filter>
  creator_contains?: InputMaybe<Scalars['String']>
  creator_contains_nocase?: InputMaybe<Scalars['String']>
  creator_ends_with?: InputMaybe<Scalars['String']>
  creator_ends_with_nocase?: InputMaybe<Scalars['String']>
  creator_gt?: InputMaybe<Scalars['String']>
  creator_gte?: InputMaybe<Scalars['String']>
  creator_in?: InputMaybe<Array<Scalars['String']>>
  creator_lt?: InputMaybe<Scalars['String']>
  creator_lte?: InputMaybe<Scalars['String']>
  creator_not?: InputMaybe<Scalars['String']>
  creator_not_contains?: InputMaybe<Scalars['String']>
  creator_not_contains_nocase?: InputMaybe<Scalars['String']>
  creator_not_ends_with?: InputMaybe<Scalars['String']>
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  creator_not_in?: InputMaybe<Array<Scalars['String']>>
  creator_not_starts_with?: InputMaybe<Scalars['String']>
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  creator_starts_with?: InputMaybe<Scalars['String']>
  creator_starts_with_nocase?: InputMaybe<Scalars['String']>
  fileUrl?: InputMaybe<Scalars['String']>
  fileUrl_contains?: InputMaybe<Scalars['String']>
  fileUrl_contains_nocase?: InputMaybe<Scalars['String']>
  fileUrl_ends_with?: InputMaybe<Scalars['String']>
  fileUrl_ends_with_nocase?: InputMaybe<Scalars['String']>
  fileUrl_gt?: InputMaybe<Scalars['String']>
  fileUrl_gte?: InputMaybe<Scalars['String']>
  fileUrl_in?: InputMaybe<Array<Scalars['String']>>
  fileUrl_lt?: InputMaybe<Scalars['String']>
  fileUrl_lte?: InputMaybe<Scalars['String']>
  fileUrl_not?: InputMaybe<Scalars['String']>
  fileUrl_not_contains?: InputMaybe<Scalars['String']>
  fileUrl_not_contains_nocase?: InputMaybe<Scalars['String']>
  fileUrl_not_ends_with?: InputMaybe<Scalars['String']>
  fileUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  fileUrl_not_in?: InputMaybe<Array<Scalars['String']>>
  fileUrl_not_starts_with?: InputMaybe<Scalars['String']>
  fileUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  fileUrl_starts_with?: InputMaybe<Scalars['String']>
  fileUrl_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  owner?: InputMaybe<Scalars['String']>
  owner_?: InputMaybe<User_Filter>
  owner_contains?: InputMaybe<Scalars['String']>
  owner_contains_nocase?: InputMaybe<Scalars['String']>
  owner_ends_with?: InputMaybe<Scalars['String']>
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>
  owner_gt?: InputMaybe<Scalars['String']>
  owner_gte?: InputMaybe<Scalars['String']>
  owner_in?: InputMaybe<Array<Scalars['String']>>
  owner_lt?: InputMaybe<Scalars['String']>
  owner_lte?: InputMaybe<Scalars['String']>
  owner_not?: InputMaybe<Scalars['String']>
  owner_not_contains?: InputMaybe<Scalars['String']>
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>
  owner_not_ends_with?: InputMaybe<Scalars['String']>
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  owner_not_in?: InputMaybe<Array<Scalars['String']>>
  owner_not_starts_with?: InputMaybe<Scalars['String']>
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  owner_starts_with?: InputMaybe<Scalars['String']>
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>
  price?: InputMaybe<Scalars['BigInt']>
  price_gt?: InputMaybe<Scalars['BigInt']>
  price_gte?: InputMaybe<Scalars['BigInt']>
  price_in?: InputMaybe<Array<Scalars['BigInt']>>
  price_lt?: InputMaybe<Scalars['BigInt']>
  price_lte?: InputMaybe<Scalars['BigInt']>
  price_not?: InputMaybe<Scalars['BigInt']>
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  sold?: InputMaybe<Scalars['Boolean']>
  sold_in?: InputMaybe<Array<Scalars['Boolean']>>
  sold_not?: InputMaybe<Scalars['Boolean']>
  sold_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  specs?: InputMaybe<Scalars['String']>
  specs_contains?: InputMaybe<Scalars['String']>
  specs_contains_nocase?: InputMaybe<Scalars['String']>
  specs_ends_with?: InputMaybe<Scalars['String']>
  specs_ends_with_nocase?: InputMaybe<Scalars['String']>
  specs_gt?: InputMaybe<Scalars['String']>
  specs_gte?: InputMaybe<Scalars['String']>
  specs_in?: InputMaybe<Array<Scalars['String']>>
  specs_lt?: InputMaybe<Scalars['String']>
  specs_lte?: InputMaybe<Scalars['String']>
  specs_not?: InputMaybe<Scalars['String']>
  specs_not_contains?: InputMaybe<Scalars['String']>
  specs_not_contains_nocase?: InputMaybe<Scalars['String']>
  specs_not_ends_with?: InputMaybe<Scalars['String']>
  specs_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  specs_not_in?: InputMaybe<Array<Scalars['String']>>
  specs_not_starts_with?: InputMaybe<Scalars['String']>
  specs_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  specs_starts_with?: InputMaybe<Scalars['String']>
  specs_starts_with_nocase?: InputMaybe<Scalars['String']>
  updatedAt?: InputMaybe<Scalars['BigInt']>
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>
  updatedAt_not?: InputMaybe<Scalars['BigInt']>
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum Nft_OrderBy {
  CreatedAt = 'createdAt',
  Creator = 'creator',
  FileUrl = 'fileUrl',
  Id = 'id',
  Owner = 'owner',
  Price = 'price',
  Sold = 'sold',
  Specs = 'specs',
  UpdatedAt = 'updatedAt',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  globalData?: Maybe<GlobalData>
  globalDatas: Array<GlobalData>
  nft?: Maybe<Nft>
  nfts: Array<Nft>
  user?: Maybe<User>
  users: Array<User>
}

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type QueryGlobalDataArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryGlobalDatasArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<GlobalData_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<GlobalData_Filter>
}

export type QueryNftArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryNftsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Nft_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Nft_Filter>
}

export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<User_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<User_Filter>
}

export type Subscription = {
  __typename?: 'Subscription'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  globalData?: Maybe<GlobalData>
  globalDatas: Array<GlobalData>
  nft?: Maybe<Nft>
  nfts: Array<Nft>
  user?: Maybe<User>
  users: Array<User>
}

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type SubscriptionGlobalDataArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionGlobalDatasArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<GlobalData_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<GlobalData_Filter>
}

export type SubscriptionNftArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionNftsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Nft_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Nft_Filter>
}

export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<User_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<User_Filter>
}

export type User = {
  __typename?: 'User'
  createdToken?: Maybe<Array<Nft>>
  firstJoinTime: Scalars['BigInt']
  id: Scalars['ID']
  lastActivityTime: Scalars['BigInt']
  ownedToken?: Maybe<Array<Nft>>
}

export type UserCreatedTokenArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Nft_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Nft_Filter>
}

export type UserOwnedTokenArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Nft_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Nft_Filter>
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  createdToken_?: InputMaybe<Nft_Filter>
  firstJoinTime?: InputMaybe<Scalars['BigInt']>
  firstJoinTime_gt?: InputMaybe<Scalars['BigInt']>
  firstJoinTime_gte?: InputMaybe<Scalars['BigInt']>
  firstJoinTime_in?: InputMaybe<Array<Scalars['BigInt']>>
  firstJoinTime_lt?: InputMaybe<Scalars['BigInt']>
  firstJoinTime_lte?: InputMaybe<Scalars['BigInt']>
  firstJoinTime_not?: InputMaybe<Scalars['BigInt']>
  firstJoinTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  lastActivityTime?: InputMaybe<Scalars['BigInt']>
  lastActivityTime_gt?: InputMaybe<Scalars['BigInt']>
  lastActivityTime_gte?: InputMaybe<Scalars['BigInt']>
  lastActivityTime_in?: InputMaybe<Array<Scalars['BigInt']>>
  lastActivityTime_lt?: InputMaybe<Scalars['BigInt']>
  lastActivityTime_lte?: InputMaybe<Scalars['BigInt']>
  lastActivityTime_not?: InputMaybe<Scalars['BigInt']>
  lastActivityTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  ownedToken_?: InputMaybe<Nft_Filter>
}

export enum User_OrderBy {
  CreatedToken = 'createdToken',
  FirstJoinTime = 'firstJoinTime',
  Id = 'id',
  LastActivityTime = 'lastActivityTime',
  OwnedToken = 'ownedToken',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GetAllProductsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>
}>

export type GetAllProductsQuery = {
  __typename?: 'Query'
  nfts: Array<{
    __typename?: 'NFT'
    id: string
    fileUrl: string
    creator: { __typename?: 'User'; id: string }
    owner: { __typename?: 'User'; id: string }
  }>
}
