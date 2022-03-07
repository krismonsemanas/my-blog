import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// services
import { getCategories } from '../services'
type categoryType = {
  slug: string
  name: string
}

const Header = () => {
  const [categories, setCategroies] = useState([])
  const router = useRouter()
  const active = router.query.slug

  useEffect(() => {
    getCategories().then((result) => setCategroies(result))
  }, [])
  return (
    <div className=" container mx-auto mb-8 px-10">
      <div className="inline-block w-full border-b border-blue-400 py-8">
        <div className="block md:float-left">
          <Link href="/">
            <span className=" cursor-pointer text-4xl font-bold text-white">
              GraphCMS
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category: categoryType) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span
                className={`mt-2 ml-4 cursor-pointer align-middle font-semibold text-white md:float-right ${
                  active == category.slug ? 'text-black' : ''
                }`}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
