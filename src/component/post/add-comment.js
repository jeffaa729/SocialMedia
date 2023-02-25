import React from 'react'
import { useState,useContext } from 'react'
import UserContext from '../../context/user'
import {firebase,FieldValue} from'../../lib/firebase'

const AddComment = ({docId,comments,commentLine,setComments}) => {
    
    const[comment, setComment] = useState('');
    const {user:{displayName}} = useContext(UserContext);

    const handleSubmit = (event)=>{
        event.preventDefault();
        setComments([{displayName,comment}, ...comments])
        setComment('')
        return firebase.firestore().collection('photos').doc(docId).update({
            comments: FieldValue.arrayUnion({displayName,comment})
        })
    }

    return (
        <div className='border-t border-gray-primary'>
            <form
                className='flex justify-between pl-0 pr-5'
                method='POST'
                onSubmit={(event)=>{
                    comment.length >=1 ? handleSubmit(event) : event.preventDefault()
                }}
            >
             <input 
                aria-label='Add a comment'
                autoComplete='off'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4'
                type= 'text'
                name= 'add-comment'
                placeholder='Add a comment....'
                value = {comment}
                onChange = {({target})=> setComment(target.value)}
                ref={commentLine}
             />
             <button
                className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-40'}`}
                type = 'button'
                disabled = {comment.length <1 }
                onClick = {handleSubmit}
             >
                POST
             </button>
            </form>
        </div>
  )
}

export default AddComment