import React from "react"
import Links from "./links"

export default function Sidebar({ isOpen, toggle }) {
	return (
		<div
			className={
				isOpen ? "grid gird-rows-4 text-right items-right bg-gray-500" : "hidden"
			}
			onClick={toggle}
		>
			<Links />
		</div>
	)
}
