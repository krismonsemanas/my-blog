import type { NextPage } from 'next'
import Head from 'next/head'

const posts = [
  { title: 'Hello Next.js', excerpt: 'This is the content' },
  {
    title: 'Awesome next project',
    excerpt: 'Build awesome project with next js',
  },
]

const Home: NextPage = () => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>CMS BLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="gird gird-cols-1 gap-12 lg:grid-cols-12">
        {posts.map((post) => (
          <div>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            {post.excerpt}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
