import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const Login = props => {
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext
    const { loginUser, error, clearErrors, isAuthenticated } = authContext

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
        
        if (error && error.email) {
            setAlert(error.email, 'danger')
            clearErrors()
        }
        else if (error && error.password) {
            setAlert(error.password, 'danger')
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const { email, password } = user

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()

        if (email === '' || password === '') {
            setAlert('Please enter all fields', 'danger')
        }
        else {
            loginUser({ email, password })
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required />
                </div>

                <input className='btn btn-primary btn-block' type='submit' value='Login' />
            </form>
        </div>
    )
}

export default Login
