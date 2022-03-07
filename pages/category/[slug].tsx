import React from 'react'
import { useRouter } from 'next/router'

import {
  getCategories,
  getCategoryPost,
  GetCategoryBySlug,
} from '../../services'
import { PostCard, Categories, Loader } from '../../components'
import Head from 'next/head'

const CategoryPost = ({ posts, categoryName }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>Category - {categoryName.name} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
export default CategoryPost

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug)
  const categoryName = await GetCategoryBySlug(params.slug)

  return {
    props: { posts, categoryName },
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories()
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}
