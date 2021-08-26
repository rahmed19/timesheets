import React, { useRef, useState } from "react"
import { useAuth } from "../context/auth-context"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
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
			Update Profile.
			<br />
			{error}
			<br />
			<form onSubmit={handleSubmit}>
				Employee Number: {currentUser.uid.slice(0, 4).toUpperCase()}
				<br />
				Email address:
				<input type='email' ref={emailRef} defaultValue={currentUser.email} required />
				<br />
				Display Name:
				<input
					type='text'
					ref={displayNameRef}
					defaultValue={currentUser.displayName}
					required
				/>
				<br />
				Password:{" "}
				<input
					type='password'
					ref={passwordRef}
					placeholder='Leave blank to keep the same'
				/>
				<br />
				Confirm Password:{" "}
				<input
					type='password'
					ref={passwordConfirmRef}
					placeholder='Leave blank to keep the same'
				/>
				<br />
				<button type='submit' disabled={loading}>
					Update
				</button>{" "}
				<br />
				<Link to='/'>Cancel</Link>
			</form>
		</>
	)
}
