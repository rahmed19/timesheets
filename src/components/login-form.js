import React, { useRef, useState } from "react"
import { useAuth } from "../context/auth-context"
import { Link, useHistory, Redirect } from "react-router-dom"

export default function LoginForm() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const { login, currentUser } = useAuth()
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setError("")
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
				<div className='flex flex-wrap items-center justify-between'>
					<div></div>
					<div className='w-full max-w-sm content-center'>
						<h4 className='text-center text-2xl font-bold leading-normal mt-0 mb-2 text-black-800'>
							Login To Your Account
						</h4>
						<form
							className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
							onSubmit={handleSubmit}
						>
							<p className='text-red-500 text-md mb-3 bold'>{error}</p>{" "}
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2' for='email'>
									Email
								</label>
								<input
									id='email'
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='email'
									placeholder='Email'
									ref={emailRef}
								/>
							</div>
							<div class='mb-6'>
								<label class='block text-gray-700 text-sm font-bold mb-2' for='password'>
									Password
								</label>
								<input
									class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
									id='password'
									type='password'
									placeholder='******************'
									ref={passwordRef}
								/>
								<p class='text-500 text-sm italic'>Please enter your password</p>
							</div>
							<br />
							<div class='flex items-center justify-between'>
								<button
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
									type='submit'
									disabled={loading}
								>
									Sign In
								</button>{" "}
								<br />
								<Link
									to='/forgot-password'
									className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
								>
									Forgot Password?
								</Link>
								<br />
							</div>
						</form>
						<p className='text-center text-gray-500 text-md'>
							Don't have an account?{" "}
							<Link
								className='font-bold text-md text-blue-500 hover:text-blue-800'
								to='/signup'
							>
								Sign up
							</Link>
						</p>
					</div>
					<div></div>
				</div>
			</>
		)
		// if not logged in then redirect to login page
	} else if (currentUser) {
		return (
			<>
				<Redirect to='/' />
			</>
		)
	}
}
