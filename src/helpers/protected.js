import { Route,Navigate, redirect } from "react-router-dom";
import * as ROUTES from '../constants/routes'

export default function Protected({user,children, ...rest}){
    <Route
        {...rest}
        render={({location})=>{
            if(user){
                return children;
            }

            if(!user){
                return(
                    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
                )
            }
            return null
        }
    }
    />
}