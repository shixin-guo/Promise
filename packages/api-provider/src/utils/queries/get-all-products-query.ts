const getFirstNFTsQuery = /* GraphQL */ `
  query getAllProducts($first: Int = 10) {
    nfts(first: $first) {
      id
      creator {
        id
      }
      owner {
        id
      }
      fileUrl
    }
  }
`
export default getFirstNFTsQuery
