import React, { useRef, useState, useContext, useEffect } from 'react'
import { useAuth } from '../context/auth-context'
import { Link, useHistory } from 'react-router-dom'

export default function SignupForm() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth()
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,
                passwordRef.current.value,
                firstNameRef.current.value,
                lastNameRef.current.value)
            history.push("/")
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
                First Name: <input ref={firstNameRef} required /><br />
                Last Name: <input ref={lastNameRef} required /><br />
                <button type="submit" disabled={loading}>Sign up</button> <br />
                Already have an account? <Link to="/login">Log In</Link>
            </form>


        </>
    )
}
