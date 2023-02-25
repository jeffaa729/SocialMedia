import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { doesUsernameExist, getUserByUsername } from '../services/firebase'
import * as ROUTES from '../constants/routes'
import Header from '../component/header'
import UserProfile from '../component/profile'

const Profile = () => {
    const{username} = useParams()
    const [userExists,setUserExists] = useState(false)
    const navigate = useNavigate()
    const [user ,setUser] = useState(null)

    useEffect(()=>{
        async function checkUserExists(){
            const user = await getUserByUsername(username);
            if(user.length > 0){
                setUserExists(true)
                setUser(user)
            }else{
                setUserExists(false)
                navigate(ROUTES.NOT_FOUND)
            }

        }
            checkUserExists()
        },[username,navigate])
    return ( userExists ?
        <div className='bg-gray-background'>
            <Header/>
            <div className='mx-auto max-w-screen-lg'>
                <UserProfile
                    user= {user}
                />
            </div>
        </div>
        :
        <p>no user</p>


    )
}

export default Profile