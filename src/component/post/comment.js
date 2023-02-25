import React, { useState } from 'react'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
import AddComment from './add-comment'

const Comments = ({docId,comments:allComments,posted,commentLine}) => {

    const [comments, setComments] = useState(allComments)

    return (
    <div>
        <div className='p-4 pt-1 pb-4'>
            {comments.length >= 1 && (
                <div className='text-sm text-gray-base mb-1 cursor-pointer'>
                    View all {comments.length} comment
                </div>)}
            {comments.slice(0,5).map((item)=>(
                <p key={`${item.comment}-${item.displayName}`} className='mb-1'> 
                    <Link className='mr-1 font-bold' to= {`/p/${item.displayName}`}>
                        <span>{item.displayName}</span>
                    </Link>
                    <span>{item.comment}</span>
                </p>
            ))}
            <p className='text-gray-base uppercase text-sm mt-2'>{formatDistance(posted,new Date())} ago </p>
        </div>
        <AddComment
            docId={docId}
            comments = {comments}
            commentLine = {commentLine}
            setComments = {setComments}
        />
    </div>
    )
}

export default Comments