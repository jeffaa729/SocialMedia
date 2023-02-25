// auth the user account
import { useEffect, useState, useContext } from "react";
import FirebaseContext from "../context/firebase";
import { Auth } from "../lib/firebase";

export default function useAuthListener(){
    // get user from local storage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const firebase = useContext(FirebaseContext); // get the firebase data (ignoring the state tree)
    
    useEffect(()=> {
        // firebase function onAuthStateChanged : triggered the observer when users were signed in, signed out
        const listener = Auth.onAuthStateChanged((authUser) => {
            if(authUser){
                // store the user data into local storage if hv user
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            }else{
                // if not user , clear the data 
                localStorage.removeItem('authUser');
                setUser(null)

            }
        });

        return () => listener();
        // render the page once firebase context is changed
    }, [firebase])
    
    return{user};
}





