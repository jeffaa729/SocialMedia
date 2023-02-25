import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState();
  
  async function getUserObjByUserId(userId) {
    const [user] = await getUserByUserId(userId);
    setActiveUser(user)
  }
    useEffect(() => {
      if(typeof(userId)==='string'){
        getUserObjByUserId(userId)
    }
    }, [userId]);
  return {loggedInUser: activeUser,setActiveUser}
}