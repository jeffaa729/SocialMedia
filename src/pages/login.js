import React, { useContext, useEffect, useState } from 'react'
import {useNavigate,Link,Navigate} from 'react-router-dom'
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { Auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import UserContext from '../context/user';

const Login = () => {
    const navigate = useNavigate();
    const { firebase} = useContext(FirebaseContext);
    const [emailAddress,setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [ error, setError] = useState('');
    const isInValid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            await signInWithEmailAndPassword(Auth,emailAddress,password);
            navigate(ROUTES.DASHBOARD);
        }catch(error){
            setEmailAddress('');
            setPassword('');
            setError(error.message)

        }
    };

    useEffect(()=> { 
        document.title = 'Login - Instagram';
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

                <form onSubmit={handleLogin} method = 'POST'>
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
                        Login
                    </button>
                </form>
            </div>
            <div className="flex justify-center items-center flex-row w-full bg-white p-4 rounded border border-gray-primary font-bold">
                <p className='text-sm'>Dont have a account?{` `}</p>
                <Link to= {ROUTES.SIGN_UP} className='font-bold text-blue-medium ml-5'>
                    Sign Up
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Login