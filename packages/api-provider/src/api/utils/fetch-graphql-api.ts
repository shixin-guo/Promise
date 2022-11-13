import type { GraphQLFetcher } from '@vercel/commerce/api'

import { API_URL } from '../../const'
import { getError } from '../../utils/handle-fetch-response'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  headers?: HeadersInit
) => {
  try {
    console.log(query, variables)
    const res = await fetch(API_URL!, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const { data, errors, status } = await res.json()

    if (errors) {
      throw getError(errors, status)
    }

    return { data, res }
  } catch (err) {
    throw getError(
      [
        {
          message: err,
        },
      ],
      500
    )
  }
}
export default fetchGraphqlApi
