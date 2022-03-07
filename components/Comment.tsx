import React, { useEffect, useState } from 'react'
import moment from 'moment'
import parser from 'html-react-parser'

type CommentProps = {
  slug: string
}

import { getComments } from '../services'

const Comment = ({ slug }: CommentProps) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then((res) => setComments(res))
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className="mb-8 rounded-lg bg-white p-8 pb-12">
          <div className="mb-8 border-b pb-4 text-xl font-semibold">
            {comments.length} Comments
          </div>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="mb-4 border-b border-gray-100 pb-4"
            >
              <p className="mb-4">
                <span className="font-semibold">{comment.name + ' '}</span>
                on {' ' + moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitspace-pre-line w-full text-gray-600">
                {parser(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comment
