import React, { useContext, useEffect, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { Auth } from '../lib/firebase';



const Signup = () => {
    const navigate = useNavigate();
    const { firebase} = useContext(FirebaseContext);

    const [emailAddress,setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [ error, setError] = useState('');
    const isInValid = password === '' || emailAddress === '' || username === '' || fullName === '';

    const handleSignup = async (event) => {
        event.preventDefault();
        const usernameExist = await doesUsernameExist(username);
        if (!usernameExist){
            try{
                //register function of firebase
                const createAccount = await createUserWithEmailAndPassword(Auth,emailAddress,password) ;
                // step : authentication = > emailaddress, password, username (display name) 
                await updateProfile(createAccount.user,{
                    displayName : username
                })
                // add information to the firestore
                await firebase
                    .firestore()
                    .collection('users')
                    .add({
                        userId : createAccount.user.uid,
                        fullName,
                        username : username.toLowerCase(),
                        emailAddress: emailAddress.toLowerCase(),
                        following:[],
                        follwers: [],
                        dateCreated : Date.now()
                })
                navigate(ROUTES.DASHBOARD)
            }catch(error){
                setFullName('');
                setPassword('');
                setEmailAddress('');
                setError(error.message);
            }}else {
                setUsername('');
                setError('That username is already taken, please try another.');
                //error.message('Username is taken, please try another one') XX

        }
    };

    useEffect(()=> { 
        document.title = 'Sign up - Instagram';
    }, []);


    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app"/>
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
                <h1 className='flex justify-center w-full'>
                    <img src='/images/logo.png' alt='ig' className='flex mt-2 w-6/12 mb-4'/>
                </h1>
                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                <form onSubmit={handleSignup} method = 'POST'>
                    <input
                        aria-label='Enter your Full Name'
                        type='text'
                        placeholder='Full Name'
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        onChange={({target}) => setFullName(target.value)}
                        value = {fullName}
                    />
                    <input
                        aria-label='Enter your username'
                        type='text'
                        placeholder='Username'
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        onChange={({target}) => setUsername(target.value)}
                        value = {username}
                    />
                    <input
                        aria-label='Enter your Email'
                        type='text'
                        placeholder='Email'
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        onChange={({target}) => setEmailAddress(target.value)}
                        value = {emailAddress}
                    />
                    <input
                        aria-label='Enter your password'
                        type='password'
                        placeholder='password'
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        onChange={({target}) => setPassword(target.value)}
                        value = {password}
                    />
                    <button
                        disabled = {isInValid}
                        type = 'submit'
                        className={`bg-blue-medium text-black w-full rounded h-8 font-bold
                        ${isInValid && 'opacity-50'}`}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            <div className="flex justify-center items-center flex-row w-full bg-white p-4 rounded border border-gray-primary font-bold">
                <p className='text-sm'> Have a account?{` `}</p>
                <Link to= {ROUTES.LOGIN} className='font-bold text-blue-medium ml-5'>
                    Login
                </Link>
            </div>
            </div>
        </div>

    )
}

export default Signup