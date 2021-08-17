import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

export default function PrivateRoute({ component: Componenet, ...rest }) {
    const { currentUser } = useAuth()
    return (
        <>
            <Route {...rest}
                render={props => {
                    return currentUser ? <Componenet {...props} /> : <Redirect to="/login" />
                }}
            >

            </Route>

        </>
    )
}
