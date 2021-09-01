import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/auth-context"
import Links from "./links"

export default function Navbar() {
	const { currentUser } = useAuth()
	return (
		<>
			<nav
				className='flex justify-around items-center h-16 bg-gray-400 text-black relative shadow-sm font-mono'
				role='navigation'
			>
				<Link to='/' className='pl-8'>
					True Canadian Security Corp. Employee Portal
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
				<div className='lg:block hidden'>
					{currentUser && (
						<p>
							Hello, {currentUser.displayName} Employee ID:{" "}
							{currentUser.uid.slice(0, 4).toUpperCase()}
						</p>
					)}
				</div>
				<div className='pr-8 md:block hidden'>
					<Links />
				</div>
			</nav>
		</>
	)
}
