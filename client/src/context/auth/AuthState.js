import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import setAuthorizationToken from '../../utils/setAuthorizationToken'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: {},
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    // Load User
    const loadUser = () => {
        if (localStorage.token) {
            setAuthorizationToken(localStorage.token)
        }

        axios.get('/api/auth/current')
            .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
            .catch(err => dispatch({ type: AUTH_ERROR }))
    }

    // Register User
    const registerUser = data => {
        axios.post('/api/auth/register', data)
            .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
            .then(() => loadUser())
            .catch(err => dispatch({ type: REGISTER_FAIL, payload: err.response.data }))
    }

    // Login User
    const loginUser = data => {
        axios.post('/api/auth/login', data)
            .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
            .then(() => loadUser())
            .catch(err => dispatch({ type: LOGIN_FAIL, payload: err.response.data }))
    }

    // Logout User
    const logoutUser = () => dispatch({ type: LOGOUT })

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })


    // Actions props
    const actions = { loadUser, registerUser, loginUser, logoutUser, clearErrors }

    return (
        <AuthContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState