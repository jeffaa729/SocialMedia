import React, { lazy ,Suspense} from "react";
// lazy : code split ( )
import {BrowserRouter, Routes, useParams,Route,Navigate  } from "react-router-dom";
import * as ROUTES from './constants/routes'
import './styles/app.css';
import Login from './pages/login';
import Signup from "./pages/signup";
import NotFound from "./pages/notFound";
import Dashboard from "./pages/dashboard";
import UserContext from './context/user'
import useAuthListener from './hooks/use-auth-listener'
import UidContext from './context/uid'
import useUser from "./hooks/useUser";
import LoggedInUserContext from "./context/loggedinuser";
import Protected from "./helpers/protected";
import Profile from "./pages/profile";


function App() {
  const {user} = useAuthListener()
  var uid = undefined
  if(user){
    uid = user.uid 
  }
  const {loggedInUser,setActiveUser}= useUser(uid)
  
  return (
    <UserContext.Provider value={{user}}>
    <UidContext.Provider value={{loggedInUser,setActiveUser,uid}||undefined}>
    <BrowserRouter>
      <Suspense fallback = {<p>Loading . .  .</p>}>
        <Routes>
          <Route exact path = {ROUTES.LOGIN}  element={<Login/>} />
          <Route exact path = {ROUTES.SIGN_UP}  element={<Signup/>} />
          <Route exact path = {ROUTES.NOT_FOUND}  element={<NotFound/>} />
          <Route exact path = {ROUTES.DASHBOARD}  element={<Dashboard/>}  />
          <Route exact path = {ROUTES.PROFILE}  element={<Profile/>}  />

          
        </Routes>
      </Suspense>
    </BrowserRouter>
    </UidContext.Provider>
    </UserContext.Provider>
    
  );
}

export default App;
