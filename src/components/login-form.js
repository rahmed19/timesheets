import React, { useRef, useState } from "react"
import { useAuth } from "../context/auth-context"
import { Link, useHistory, Redirect } from "react-router-dom"
import TailwindInput from "../hooks/tailwind/tailwindInput"
import { motion } from "framer-motion"

export default function LoginForm() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showNext, setShowNext] = useState(false)

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
				<motion.div className='flex flex-wrap items-center justify-between pt-4'>
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
								<TailwindInput
									id='email'
									type='email'
									placeholder='Email'
									ref={emailRef}
									onChange={() => setShowNext(true)}
								/>
							</div>
							<div class={showNext ? "mb-6" : "hidden"}>
								<label class='block text-gray-700 text-sm font-bold mb-2' for='password'>
									Password
								</label>
								<TailwindInput
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
				</motion.div>
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
