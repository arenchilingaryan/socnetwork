import React, { useState, useContext, Fragment } from 'react'
import Spinner from '../../spinner/spinner'
import { useHttp } from '../../../hooks/http-hook'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import './login-page.scss'

const LoginPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const history = useHistory()
    const auth = useContext(AuthContext)

    const { request, loading, error, clearError } = useHttp()

    const loginChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const loginHandler = async (event) => {
        event.preventDefault()
        const data = await request('/api/auth/login', 'POST', form, false)
        if (data) {
            clearError()
            auth.login(data.token, data.userId, data.email)
        }
    }

    return (
        <Fragment>
            {
                loading
                ? <Spinner />
                : <form className="authLogin">
                    <h1 style={ error ? {display: 'block'} : {display: 'none'}} >Error!</h1>
                    <label htmlFor="email">Email</label>
                        <input onChange={loginChangeHandler} className="authLogin__input" type="text" name="email"/>
                    <label htmlFor="password">Password</label>
                        <input onChange={loginChangeHandler} className="authLogin__input" type="text" name="password"/>
                    <button onClick={loginHandler} className="authLogin__button">Log In</button>
                </form>
            }
        </Fragment>
        
    )
}

export default LoginPage
