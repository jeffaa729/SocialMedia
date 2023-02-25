import React, { useEffect,useContext, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUserByUserId,updateFollowers, updateFollowing } from '../../services/firebase';
import LoggedInUserContext from '../../context/loggedinuser';


const SuggestedProfile = ({ profileDocId,profileId,username,userId,loggedInUserDocId}) => {
    const [followed,setFollowed] = useState(false)
    const { setActiveUser } = useContext(LoggedInUserContext);

    async function handleFollow(){
        setFollowed(true)
        //update following array  and follower array
        await updateFollowing(loggedInUserDocId,profileId,false)
        await updateFollowers(profileDocId,userId,false)
        const [user] = await getUserByUserId(userId);
        setActiveUser(user);
    }

    return (
    (!followed?(
        <div className='flex flex-row items-center align-items justify-between'>
            <div className='flex items-center justify-between'>
                <img
                    className='rounded-full w-8 flex mr-3'
                    src={`images/avatars/${username}.jpg`} 
                    alt={`${username}`} 
                />
                <Link to= {`/p/${username}`}>
                    <p className='font-bold text-sm'>{username}</p>
                </Link>
            </div>
                <button
                    className='text-xs font-bold text-blue-medium'
                    type='button'
                    onClick={handleFollow}
                >
                    follow
                </button>
        </div>
    ):<></>)
  )
}







export default SuggestedProfile

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
  };

