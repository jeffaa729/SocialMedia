import React, { useContext } from 'react'
import { useReducer,useEffect } from 'react'
import { getUserByUsername } from '../../services/firebase'
import Header from './header'
import { getUserPhotosByUserId } from '../../services/firebase'
import UserContext from '../../context/user'
import Photo from './photo'

const UserProfile = ({user}) => {
    const [userObj] = user
    const reducer = (state,newState) =>({
        ...state, ...newState
    })
    const initialState ={
        profile: {},
        photosCollection : [],
        followerCount : 0
    }
        
    const [{  profile, photosCollection, followerCount},dispatch] = useReducer(reducer,initialState)

    useEffect(()=> {async function getProfileinfoAndPhotos(){
        const photos = await getUserPhotosByUserId(userObj.userId);
        dispatch({ profile: userObj, photosCollection: photos, followerCount: userObj.followers.length});
        }
      getProfileinfoAndPhotos();
    }, [userObj]);

    return (
        <div>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photo photos={photosCollection} />
        </div>
    )

}


export default UserProfile