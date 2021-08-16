import React, { useContext, useEffect, useState, createContext } from 'react'
import FirebaseContext from './firebase'
import { auth } from '../lib/firebase'

const AuthContext = createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const listener = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
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
