import React, { useRef, useState } from "react"
import { useAuth } from "../context/auth-context"
import { Link, useHistory } from "react-router-dom"
import TailwindInput from "../hooks/tailwind/tailwindInput"

export default function UpdateProfileForm() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const displayNameRef = useRef()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const { updateEmail, updatePassword, currentUser, updateDisplayName } = useAuth()
	const history = useHistory()

	function handleSubmit(e) {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match")
		}

		const promises = []
		setLoading(true)
		setError("")
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value))
		}

		if (displayNameRef.current.value !== currentUser.displayName) {
			promises.push(updateDisplayName(displayNameRef.current.value))
		}

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value))
		}

		Promise.all(promises)
			.then(() => {
				history.push("/")
			})
			.catch(error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<>
			<div className='flex flex-wrap items-center justify-between'>
				<div></div>
				<div className='w-full max-w-sm content-center'>
					<h4 className='text-center text-2xl font-bold leading-normal mt-0 mb-2 text-black-800'>
						Update Your Information
					</h4>
					<form
						onSubmit={handleSubmit}
						className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
					>
						<p className='text-red-500 text-md mb-3 bold'>{error}</p>

						<div className='mb-4'>
							<label className='block text-gray-700 text-sm font-bold mb-2' for='email'>
								Email
							</label>
							<TailwindInput
								id='email'
								type='email'
								ref={emailRef}
								defaultValue={currentUser.email}
								required='required'
							/>
						</div>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								for='display-name'
							>
								Display Name
							</label>
							<TailwindInput
								id='display-name'
								type='text'
								ref={displayNameRef}
								defaultValue={currentUser.displayName}
								required
							/>
						</div>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								for='password'
							>
								Password
							</label>
							<TailwindInput
								id='password'
								type='password'
								ref={passwordRef}
								placeholder='Leave blank to keep the same'
							/>
							{/* <input
								id='password'
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='password'
								ref={passwordRef}
								placeholder='Leave blank to keep the same'
							/> */}
						</div>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								for='confirm-password'
							>
								Confirm Password
							</label>
							<TailwindInput
								id='confirm-password'
								type='password'
								ref={passwordConfirmRef}
								placeholder='Leave blank to keep the same'
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
									Update Your Information
								</button>
							</div>
							<div></div>
						</div>
						<br />
						<Link to='/'>
							<h5 className='text-center font-bold text-md text-blue-500 hover:text-blue-800'>
								Cancel
							</h5>
						</Link>
					</form>
				</div>
				<div></div>
			</div>
		</>
	)
}
