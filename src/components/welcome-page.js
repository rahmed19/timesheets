import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../context/auth-context"

export default function WelcomePage() {
	const { currentUser } = useAuth()

	const history = useHistory()
	useEffect(() => {
		setTimeout(() => {
			history.push("/")
		}, 5000)
	}, [])

	return (
		<>
			<h4 className='text-center text-2xl font-bold leading-normal mt-4 mb-2 text-black-800'>
				{currentUser
					? "Welcome to True Canadian Security Corp. Employee Portal. Your Signup Has Been Successful..."
					: "You Are Logged Out. Redirecting You To Login Page..."}
			</h4>
		</>
	)
}
