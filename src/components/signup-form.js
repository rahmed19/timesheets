import { set } from 'date-fns'
import React, { useRef, useState, useContext, useEffect } from 'react'
import FirebaseContext from '../context/firebase'
import { useAuth } from '../context/auth-context'

export default function SignupForm() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }


    return (
        <>
            Sign up.<br />
            {error}<br />
            {/* Current User: {user} */}

            <form onSubmit={handleSubmit}>
                Email address:<input type="email" ref={emailRef} required /><br />
                Password: <input type="password" ref={passwordRef} required /><br />
                Confirm Password: <input type="password" ref={passwordConfirmRef} required /><br />
                <button type="submit" disabled={loading}>Sign up</button> <br />
                Already have an account? Log in.
            </form>

        </>
    )
}
