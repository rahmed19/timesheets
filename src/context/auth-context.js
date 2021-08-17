import React, { useContext, useEffect, useState, createContext } from 'react'
import { auth } from '../lib/firebase'

const AuthContext = createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(email, password, firstName, lastName) {
        return await auth.createUserWithEmailAndPassword(email, password).then((result) => {
            result.user.updateProfile({
                displayName: firstName,
            })
        })


    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
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
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
