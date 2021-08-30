import React, { useRef, useState } from "react"
import { useAuth } from "../context/auth-context"
import { Link, useHistory, Redirect } from "react-router-dom"
import TailwindInput from "../hooks/tailwind/tailwindInput"

export default function SignupForm() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const firstNameRef = useRef()
	const lastNameRef = useRef()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const { signup, currentUser } = useAuth()
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match")
		}
		try {
			setError("")
			setLoading(true)
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				firstNameRef.current.value,
				lastNameRef.current.value
			)
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
						<form
							onSubmit={handleSubmit}
							className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
						>
							<p className='text-red-500 text-md mb-3 bold'>{error}</p> <br />
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2' for='email'>
									Email
								</label>
								<input
									id='email'
									type='email'
									ref={emailRef}
									required
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									for='password'
								>
									Password
								</label>
								<input
									placeholder='******************'
									id='password'
									type='password'
									ref={passwordRef}
									required
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									for='confirm-password'
								>
									Confirm Password
								</label>
								<input
									placeholder='******************'
									id='confirm-password'
									type='password'
									ref={passwordConfirmRef}
									required
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									for='first-name'
								>
									First Name
								</label>
								<input
									id='first-name'
									ref={firstNameRef}
									required
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									for='last-name'
								>
									First Name
								</label>
								<input
									id='last-name'
									ref={lastNameRef}
									required
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								/>
							</div>
							<div className='flex flex-wrap items-center justify-between'>
								<div></div>
								<div>
									<button
										type='submit'
										disabled={loading}
										className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
									>
										Sign up
									</button>
								</div>
								<div></div>
							</div>
						</form>
						<p className='text-center text-gray-500 text-md'>
							Already have an account? &nbsp;
							<Link
								className='font-bold text-md text-blue-500 hover:text-blue-800'
								to='/login'
							>
								Login
							</Link>
						</p>
					</div>
					<div></div>
				</div>
			</>
		)
	}
	// if not logged in then redirect to login page
	else if (currentUser) {
		return (
			<>
				<Redirect to='/' />
			</>
		)
	}
}
