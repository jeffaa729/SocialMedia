import React from 'react'
import useUser from '../../hooks/useUser'
import User from './user'
import UserContext from '../../context/user'
import Suggestion from './suggestion'
import { useContext } from 'react'
import LoggedInUserContext from '../../context/loggedinuser'

const Sidebar = () => {
  const {loggedInUser,setActiveUser} = useContext(LoggedInUserContext);
  const {username,fullName,userId,following, docId} = loggedInUser;
  return (
    <div className="p-4">
    <User username={username} fullName={fullName} />
    <Suggestion userId={userId} following={following} loggedInUserDocId={docId} />
  </div>
  )
}

export default Sidebar