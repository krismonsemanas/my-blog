// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const grapcmsApiToken = process.env.NEXT_PUPLIC_GRAPHCMS_API_TOKEN

type Data = {
  name: string
}

export default async function comment(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${grapcmsApiToken}`,
    },
  })
  // console.log()
  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `

  try {
    const result = await client.request(query, req.body)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
