import React from 'react'
import AuthPage from '../auth/auth'
import { Route } from 'react-router-dom'
import OtherRoute from './other-route'


function UnAuthRoutes() {
    return (
        <div>
            <Route path='/' component={AuthPage} />
            <Route component={OtherRoute} />
        </div>
    )
}

export default UnAuthRoutes