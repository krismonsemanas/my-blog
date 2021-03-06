import React from 'react'

// services
import { getPosts, getPostBySlug } from '../../services'

// own components
import {
  Category,
  PostWidget,
  PostDetailCard,
  Comment,
  Author,
  CommentForm,
} from '../../components'
import { Post } from '../../interfaces'
import Head from 'next/head'

type Props = {
  post: Post
}

const PostDetail = ({ post }: Props) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetailCard post={post} />
          <Author author={post.author} />
          {/* <AdjacentPosts /> */}
          <CommentForm slug={post.slug} />
          <Comment slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget slug={post.slug} categories={post.categories} />
            <Category />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }: any) {
  const data = await getPostBySlug(params.slug)
  return {
    props: {
      post: data,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }: any) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: false,
  }
}

export default PostDetail
