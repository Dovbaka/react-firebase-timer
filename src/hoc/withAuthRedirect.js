import React from "react";
import {Redirect} from "react-router-dom";
import {useAuth} from "../providers/AuthContext";


export const withAuthRedirect = (Component) => { //HOC for redirecting to login screen if user not authorized
    function RedirectComponent(props) {
        const { currentUser } = useAuth()
        if (!currentUser) return <Redirect to={'/'}/>
        return <Component {...props} />
    }

    return RedirectComponent;
}
