import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services'

// interface
import { ICommentForm } from '../interfaces'

const CommentForm = ({ slug }: ICommentForm) => {
  const [error, setError] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  })

  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  const onInputChange = (e) => {
    const { target } = e
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }))
    }
  }

  const handleSubmitComment = () => {
    setError(false)

    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { value: storeData } = storeDataEl.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = ''
          formData.email = ''
        }
        formData.comment = ''
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }))
        setShowSuccessMessage(true)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000)
      }
    })
  }

  useEffect(() => {
    setLocalStorage(window.localStorage)

    const intialFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
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
          ref={commentEl}
          className="foucs:ring-2 w-full rounded-lg bg-gray-200 p-4 text-gray-700 outline-none focus:ring-gray-100"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          onChange={onInputChange}
          ref={nameEl}
          name="name"
          placeholder="Your Name"
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
        <input
          type="text"
          ref={emailEl}
          onChange={onInputChange}
          name="email"
          placeholder="Your Email"
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="gird gird-cols-1 mb-4 gap-4">
        <div>
          <input
            type="text"
            ref={storeDataEl}
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
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
