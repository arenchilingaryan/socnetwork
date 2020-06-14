import React from 'react'
import AuthPage from '../auth/auth'
import { Route } from 'react-router-dom'


function UnAuthRoutes() {
    return (
        <div>
            <Route path='/' component={AuthPage} />
        </div>
    )
}

export default UnAuthRoutes