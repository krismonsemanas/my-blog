import { Category } from './index'
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
  categories: Category[]
  content: {
    raw: any
  }
}

export default Post
