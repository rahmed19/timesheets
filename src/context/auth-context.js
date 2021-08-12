import React, { useContext, useEffect, useState, createContext } from 'react'
import FirebaseContext from './firebase'

const AuthContext = createContext()
const { auth } = useContext(FirebaseContext)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const listener = auth.onStateChanged(user => {
            setCurrentUser(JSON.stringify(user))
        })

        return listener
    }, [])

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
