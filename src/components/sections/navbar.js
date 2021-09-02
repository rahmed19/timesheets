import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/auth-context"
import Links from "./links"

export default function Navbar({ toggle }) {
	const { currentUser } = useAuth()
	return (
		<>
			<nav
				className='flex justify-between items-center h-16 bg-gray-200 text-black relative shadow-sm font-russo'
				role='navigation'
			>
				<Link to='/' className='pl-5'>
					<strong className='font-bold text-lg md:text-2xl'>
						True Canadian Security Corp. Employee Portal
					</strong>
				</Link>
				<div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
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
					<Links />
				</div>
			</nav>
		</>
	)
}
