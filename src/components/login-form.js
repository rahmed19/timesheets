import React, { useRef, useState, useContext, useEffect } from 'react'
import { useAuth } from '../context/auth-context'
import { Link, useHistory } from 'react-router-dom'

export default function LoginForm() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }


    return (
        <>
            Log In.<br />
            {error}<br />


            <form onSubmit={handleSubmit}>
                Email address:<input type="email" ref={emailRef} required /><br />
                Password: <input type="password" ref={passwordRef} required /><br />
                <button type="submit" disabled={loading}>Log In</button> <br />
                <Link to="/forgot-password">Forgot Password?</Link>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </form>


        </>
    )
}
