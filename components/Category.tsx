import React, { useState, useEffect } from 'react'
import Link from 'next/link'

// services
import { getCategories } from '../services'
import { Category } from '../interfaces'

type categoryType = {
  slug: string
  name: string
}

const Category: React.FC<Category> = () => {
  const [categories, setCategroies] = useState<Category>([])

  useEffect(() => {
    getCategories().then((result) => setCategroies(result))
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Categories</h3>
      {categories.map((category: categoryType) => (
        <Link href={`/category/${category.slug}`} key={category.slug}>
          <span className="mb-3 block cursor-pointer pb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Category
