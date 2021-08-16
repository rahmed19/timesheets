import React, { useContext, useEffect, useState, createContext } from 'react'
import FirebaseContext from './firebase'
import { auth } from '../lib/firebase'

const AuthContext = createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const listener = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)

        })

        return listener
    }, [])

    const value = {
        currentUser,
        signup,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
