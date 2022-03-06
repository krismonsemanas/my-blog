import React from 'react'

interface PostCardProps {
  title: string
  excerpt: string
}

const PostCard = ({ title, excerpt }: PostCardProps) => {
  return (
    <div>
      {title}
      {excerpt}
    </div>
  )
}

export default PostCard
