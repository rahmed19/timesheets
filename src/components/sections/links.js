import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/auth-context"

export default function Links() {
	const { currentUser, logout } = useAuth()
	return (
		<>
			{currentUser && (
				<Link className='p-2 block md:inline' to='/'>
					Home
				</Link>
			)}
			{!currentUser && (
				<Link className='p-2 block md:inline' to='/login'>
					Login
				</Link>
			)}
			{!currentUser && (
				<Link className='p-2 block md:inline' to='/signup'>
					Sign Up
				</Link>
			)}
			{currentUser && (
				<Link className='p-2 block md:inline' to='/update-profile'>
					Update Profile
				</Link>
			)}
			{currentUser && (
				<Link className='p-2 block md:inline' to='/login' onClick={() => logout()}>
					Log Out
				</Link>
			)}
			<div className='block md:inline'>
				{currentUser && (
					<h4 className='text-right font-bold p-2'>
						Hello, {currentUser.displayName}
						{/* <br /> Employee ID:
								{currentUser.uid.slice(0, 4).toUpperCase()} */}
					</h4>
				)}
			</div>
		</>
	)
}
