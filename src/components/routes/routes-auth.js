import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Profile from '../profile/profile'
import EditPage from '../edit/edit'

function AuthRoutes() {
    return (
        <div>
            <Route path="/profile/:id?/:detail?" component={Profile}/>
            <Route path="/edit" component={EditPage}/>
            <Redirect to="/profile" />
        </div>
    )
}


export default AuthRoutes