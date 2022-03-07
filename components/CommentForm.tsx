import React, { useState, useEffect, EffectCallback } from 'react'
import { submitComment } from '../services'

// interface
import { ICommentForm } from '../interfaces'

type slugPropType = {
  slug: string
}

type formHandler = {
  name: string
  email: string
  comment: string
  storeData: boolean
}

const CommentForm = ({ slug }: slugPropType) => {
  const [error, setError] = useState<Boolean>(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState<Boolean>(false)
  const [localStorage, setLocalStorage] = useState<Object>({})
  const [formData, setFormData] = useState<formHandler>({
    name: '',
    email: '',
    comment: '',
    storeData: false,
  })

  console.log('formData', formData)

  const handleSubmitComment = () => {
    setError(false)

    const { name, email, comment, storeData } = formData
    if (!name || !email || !comment) {
      setError(true)
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    }

    if (storeData) {
      window.localStorage.setItem('name', formData.name)
      window.localStorage.setItem('email', formData.email)
    } else {
      window.localStorage.clear()
    }

    submitComment(commentObj).then((res) => {
      formData.comment = ''
      if (res.createComment) {
        if (!storeData) {
          formData.name = ''
          formData.email = ''

          setFormData((prevState) => ({ ...prevState, ...formData }))

          setShowSuccessMessage(true)
          setTimeout(() => {
            setShowSuccessMessage(false)
          }, 3000)
          formData.comment = ''
        }
      }
    })
  }

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.type == 'checkbox') {
      setFormData({
        ...formData,
        [e.currentTarget.name]: e.currentTarget.checked,
      })
    } else {
      setFormData({
        ...formData,
        [e.currentTarget.name]: e.currentTarget.value,
      })
    }
  }

  useEffect(() => {
    setLocalStorage(window.localStorage)

    const intialFormData = {
      name: `${
        window.localStorage.getItem('name')
          ? window.localStorage.getItem('name')
          : ''
      }`,
      email: `${
        window.localStorage.getItem('email')
          ? window.localStorage.getItem('email')
          : ''
      }`,
      comment: '',
      storeData:
        window.localStorage.getItem('name') ||
        window.localStorage.getItem('email')
          ? true
          : false,
    }

    setFormData(intialFormData)
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Leave a Replay
      </h3>
      <div className="gird mb-4 grid-cols-1 gap-4">
        <textarea
          value={formData.comment}
          onChange={(e: React.FormEvent<HTMLTextAreaElement>): void =>
            setFormData({
              ...formData,
              [e.currentTarget.name]: e.currentTarget.value,
            })
          }
          className="foucs:ring-2 w-full rounded-lg bg-gray-200 p-4 text-gray-700 outline-none focus:ring-gray-100"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          value={formData.name}
          onChange={onInputChange}
          name="name"
          placeholder="Your Name"
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
        <input
          type="email"
          onChange={onInputChange}
          name="email"
          value={formData.email}
          placeholder="Your Email"
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="gird gird-cols-1 mb-4 gap-4">
        <div>
          <input
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
            checked={formData.storeData}
          />
          <label
            className="ml-2 cursor-pointer text-gray-500"
            htmlFor="storeData"
          >
            Save email for next time I comment
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fileds is Required!</p>}
      <div className="mt-8">
        <button
          className="inline-block cursor-pointer rounded-lg bg-pink-500 py-2 px-4 font-bold text-white transition duration-500 ease-in-out hover:bg-indigo-900"
          type="button"
          onClick={handleSubmitComment}
        >
          <span className="text-lg">Send Comment</span>
        </button>

        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl  font-semibold text-green-500">
            Comment submited for review
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentForm
