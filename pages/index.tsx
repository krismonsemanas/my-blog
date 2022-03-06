import type { NextPage } from 'next'
import Head from 'next/head'

// own components
import { PostCard, Category, PostWidget } from '../components'

const posts = [
  { title: 'Hello Next.js', excerpt: 'This is the content' },
  {
    title: 'Awesome next project',
    excerpt: 'Build awesome project with next js',
  },
]

const Home: NextPage = () => {
  return (
    <div className=" container mx-auto mb-8 px-10 ">
      <Head>
        <title>CMS BLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard key={post.title} {...post} />
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

export default Home
