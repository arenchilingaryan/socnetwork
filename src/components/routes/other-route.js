import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

export default function OtherRoute() {

    const auth = useContext(AuthContext)

    if (auth.token) {
        return (
            <Redirect to='/profile' />
        )
    }

    return (
        <Redirect to='/login' />
    )
}
