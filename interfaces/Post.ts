interface Post {
  createdAt: string
  slug: string
  title: string
  excerpt: string
  author: {
    bio: string
    name: string
    id: string
    photo: {
      url: string
    }
  }
  featuredImage: {
    url: string
  }
  categories: {
    slug: string
    name: string
  }
  content: {
    raw: any
  }
}

export default Post
