import type { NextPage } from 'next'
import Head from 'next/head'

// own components
import { PostCard, Category, PostWidget } from '../components'
import { FeaturedPost } from '../sections'

// services
import { getPosts } from '../services/'

type Posts = {
  posts: []
}

const Home: NextPage<Posts> = ({ posts }) => {
  return (
    <div className=" container mx-auto mb-8 px-10 ">
      <Head>
        <title>CMS BLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPost />
      <div className=" grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post['node']} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Category />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  // console.log(posts)
  return {
    props: { posts },
  }
}

export default Home
