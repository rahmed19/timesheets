import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/auth-context"

export default function Links() {
	const { currentUser, logout } = useAuth()
	return (
		<>
			<Link className='p-4' to='/'>
				Home
			</Link>
			{!currentUser && (
				<Link className='p-4' to='/login'>
					Login
				</Link>
			)}
			{!currentUser && (
				<Link className='p-4' to='/signup'>
					Sign Up
				</Link>
			)}
			{currentUser && (
				<Link className='p-4' to='/update-profile'>
					Update Profile
				</Link>
			)}
			{currentUser && (
				<Link to='/login' onClick={() => logout()}>
					Log Out
				</Link>
			)}
		</>
	)
}
