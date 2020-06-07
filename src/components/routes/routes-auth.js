import React from 'react'
import { Route } from 'react-router-dom'
import OtherRoute from './other-route'
import Profile from '../profile/profile'



function AuthRoutes() {

    return (
        <div>
            <Route path="/profile" component={Profile} />
            <Route component={OtherRoute} />
        </div>
    )
}


export default AuthRoutes