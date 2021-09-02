import React from "react"
import Links from "./links"

export default function Sidebar({ isOpen, toggle }) {
	return (
		<>
			<div className='flex flex-wrap items-center justify-between mr-4'>
				<div />
				<div />
				<div
					className={
						isOpen
							? "grid gird-rows-7 justify-end rounded-lg text-right items-right bg-blue-300"
							: "hidden"
					}
					onClick={toggle}
				>
					<Links />
				</div>
			</div>
		</>
	)
}
