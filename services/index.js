import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

// fetch posts
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              slug
              name
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}

// fetch recent posts
export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(orderBy: createdAt_DESC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

export const getSimilarPosts = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $catogries: [String!]) {
      posts(where: { slug_not: $slug, AND { categories_some: { slug_in: $slug } } }, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.posts
}
