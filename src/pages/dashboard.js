import React, { useContext } from 'react'
import { useEffect } from 'react'
import Header from '../component/header'
import Sidebar from '../component/sidebar'
import Timeline from '../component/timeline'
import LoggedInUserContext from '../context/loggedinuser'
import useUser from '../hooks/useUser'
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import UserContext from '../context/user'
import UidContext from '../context/uid'
import PropTypes from 'prop-types';
import User from '../component/sidebar/user'
import * as ROUTES from '../constants/routes'


const Dashboard =()=>{
    const {user} = useContext(UserContext)
    const navigate = useNavigate('')
    if(!user){
      navigate(ROUTES.LOGIN)
    }
    const {loggedInUser,setActiveUser} = useContext(UidContext)
    useEffect(() => {
      document.title = 'Instagram';
    }, []);

    return (
      (loggedInUser?
      <LoggedInUserContext.Provider value={{loggedInUser,setActiveUser}}>
        <div className="bg-gray-background">
          <Header />
          <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <Timeline />
            <Sidebar />
          </div>
        </div>
      </LoggedInUserContext.Provider>: <></>
      )
    )
  }


export default Dashboard