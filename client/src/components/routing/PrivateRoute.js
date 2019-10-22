import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const PrivateRoute = ({ component: Component, ...args }) => {
    const authContext = useContext(AuthContext)
    const { isAuthenticated, loading } = authContext

    return (
        <Route {...args} render={props => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component {...props} />)} />
    )
}

export default PrivateRoute
