import React, { useRef, useState } from 'react'
import { useAuth } from '../context/auth-context'
import { Link, useHistory, Redirect } from 'react-router-dom'
import TailwindInput from './tailwind/tailwindInput'

export default function LoginForm() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, currentUser } = useAuth()
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

    //check to see if logged in
    if (!currentUser) {
        return (
            <>
            <div className="flex h-screen justify-center items-top bg-gray-100">
                <div>Log In.<br /></div>
                {error}<br />


                <form onSubmit={handleSubmit}>
                    Test Input: <TailwindInput type="email" ref={emailRef} /><br />
                        Password: <TailwindInput type="password" ref={passwordRef} /> <br />
                    <button type="submit" disabled={loading}>Log In</button> <br />
                    <Link to="/forgot-password">Forgot Password?</Link><br />
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </form>
    </div>

            </>
        )
        // if not logged in then redirect to login page
    } else if (currentUser) {
        return (
            <>
                <Redirect to="/" />
            </>
        )
    }

}
