import React, { useRef, useState } from "react"
import { useAuth } from "../context/auth-context"
import { Link } from "react-router-dom"
import TailwindInput from "../hooks/tailwind/tailwindInput"

export default function ForgotPasswordForm() {
	const emailRef = useRef()
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const { resetPassword } = useAuth()

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setMessage("")
			setError("")
			setLoading(true)
			await resetPassword(emailRef.current.value)
			setMessage("Check your inbox for password reset instructions.")
		} catch (error) {
			setError(error.message)
		}
		setLoading(false)
	}

	return (
		<>
			<div className='flex flex-wrap items-center justify-between'>
				<div></div>
				<div className='w-full max-w-xs content-center'>
					<h4 className='text-center text-2xl font-bold leading-normal mt-0 mb-2 text-black-800'>
						Recover Your Password
					</h4>
					<form
						onSubmit={handleSubmit}
						className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
					>
						<p className='text-red-500 text-md mb-3 bold'>{error}</p>

						<div className='mb-4'>
							<label className='block text-gray-700 text-sm font-bold mb-2' for='email'>
								Enter your email address
							</label>
							<TailwindInput id='email' type='email' ref={emailRef} required />
						</div>
						<div className='flex flex-wrap items-center justify-between'>
							<div></div>
							<div>
								<button
									type='submit'
									disabled={loading}
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
								>
									Reset Password
								</button>
							</div>
							<div></div>
						</div>
					</form>

					<p className='text-center text-gray-500 text-md'>
						Already have an account?&nbsp;
						<Link
							className='font-bold text-md text-blue-500 hover:text-blue-800'
							to='/login'
						>
							Login
						</Link>
					</p>
					<p className='text-red-500 text-md mb-3 italic item-center'>
						{message && message}
					</p>
				</div>
				<div></div>
			</div>
		</>
	)
}
