import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/auth-context"

export default function Navbar() {
	const { currentUser, logout } = useAuth()
	return (
		<>
			<nav
				className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono'
				role='navigation'
			>
				<Link to='/' className='pl-8'>
					True Canadian Security Employee Portal
				</Link>
				<div className='px-4 cursor-pointer md:hidden'>
					<svg
						className='w-6 h-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 6h16M4 12h16M4 18h16'
						/>
					</svg>
				</div>
				<div className='pr-8 md:block hidden'>
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
					{currentUser && <p>Hello, {currentUser.displayName}</p>}
					{currentUser && <p>Employee ID: {currentUser.uid.slice(0, 4).toUpperCase()}</p>}
				</div>
			</nav>
		</>
	)
}
