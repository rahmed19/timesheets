import React, { useRef, useState} from 'react'
import { useAuth } from '../context/auth-context'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {

    const emailRef = useRef()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth()


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for password reset instructions.')
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }


    return (
        <>
            Forgot Password.<br />
            {error}<br />


            <form onSubmit={handleSubmit}>
                Email address:<input type="email" ref={emailRef} required /><br />
                <button type="submit" disabled={loading}>Reset Password</button> <br />
                {message && message} <br />
                <Link to="/login">Log In</Link><br />
                Don't have an account? <Link to="/signup">Sign up</Link>
            </form>


        </>
    )
}
