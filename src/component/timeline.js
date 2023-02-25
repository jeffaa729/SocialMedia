import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import LoggedInUserContext from '../context/loggedinuser'
import usePhotos from '../hooks/use-photo'
import Post from './post'


const Timeline = () => {
  const {loggedInUser} = useContext(LoggedInUserContext)
  const{following} = loggedInUser
  const{photos} = usePhotos(loggedInUser);

  return (
    <div className="container col-span-2">
      {following===undefined ?(
        <Skeleton count={2} width={640} height={500} className="mb-5" />
      ) : following.length===0 ?(
        <p className="flex justify-center font-bold">Follow other people to see Photos</p>
      ) : photos? (
      photos.map((content) => <Post key={content.docId} content={content} />)          
      ) : null}

      
    </div>
  )
}

export default Timeline