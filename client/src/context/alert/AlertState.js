import React, { useReducer } from 'react'
import uuid from 'uuid'
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import { SET_ALERT, REMOVE_ALERT } from '../types'

const AlertState = props => {
    const initialState = {
        alerts: []
    }

    const [state, dispatch] = useReducer(alertReducer, initialState)

    // Set Alert
    const setAlert = (message, type, timeout = 5000) => {
        const id = uuid.v4()
        dispatch({
            type: SET_ALERT,
            payload: { message, type, id }
        })

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
    }

    // Actions props
    const actions = { setAlert }

    return (
        <AlertContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState