// import data from '../../data.json'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation() {
  function getAllProductPaths(): Promise<GetAllProductPathsResult> {
    return Promise.resolve({
      products: [],
    })
  }

  return getAllProductPaths
}
