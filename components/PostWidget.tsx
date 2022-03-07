import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'

type PostWidgetProps = {
  categories?: Array<string>
  slug?: string
}

const PostWidget = ({ categories, slug }: PostWidgetProps) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(
        categories?.map((category: any) => category.slug),
        slug
      ).then((result) => setRelatedPosts(result))
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result))
    }
  }, [slug])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Post' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((relatedPost: any) => (
        <div className="mb-4 flex w-full items-center" key={relatedPost.slug}>
          <div className="w-16 flex-none">
            <img
              src={relatedPost.featuredImage.url}
              alt={relatedPost.title}
              width="60px"
              height="60px"
              className="rounded-full align-middle"
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-grey-500 font-xs">
              {moment(relatedPost.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${relatedPost.slug}`} key={relatedPost.slug}>
              <span className="text-md cursor-pointer">
                {relatedPost.title}
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
