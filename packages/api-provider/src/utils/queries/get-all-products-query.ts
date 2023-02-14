const getFirstNFTsQuery = /* GraphQL */ `
  query getAllNft($first: Int = 10) {
    nfts(first: 5, orderBy: price) {
      id
      creator {
        id
        lastActivityTime
      }
      owner {
        id
      }
      fileUrl
      price
    }
  }
`
export default getFirstNFTsQuery
