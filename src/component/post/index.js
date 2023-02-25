import React, { useRef } from 'react'
import Action from './action'
import Comments from './comment'
import Footer from './footer'
import Header from './header'
import Image from './image'

const Post = ({content}) => {

    const commentLine = useRef(null)
    const handleFocus =()=>{
        commentLine.current.focus();
    }

    return (
        <div className='rounded col-span-4 border bg-white border-gray-primary mb-16'>
            <Header username={content?.username}/>
            <Image src={content.imageSrc} caption={content.caption} />
            <Action
                docId={content.docId}
                totalLikes = {content.likes.length}
                likedPhoto = {content.likedPhoto}
                handleFocus = {handleFocus}
            />
            <Footer caption={content.caption} username={content.username} />
            <Comments
                docId={content.docId}
                comments = {content.comments}
                posted = {content.dateCreated}
                commentLine = {commentLine}
            />
        </div>
        
    )
}

export default Post