import React, { useRef } from 'react'

export default function SignupForm() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()


    return (
        <>
            Sign up.
            <form>
                Email address:<input type="email" ref={emailRef} required /><br />
                Password: <input type="password" ref={passwordRef} required /><br />
                Confirm Password: <input type="password" ref={passwordConfirmRef} required /><br />
                <button type="submit" >Sign up</button> <br />
                Already have an account? Log in.
            </form>

        </>
    )
}
