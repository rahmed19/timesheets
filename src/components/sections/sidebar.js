import React from "react"
import Links from "./links"
import { motion } from "framer-motion"

export default function Sidebar({ isOpen, toggle }) {
	return (
		<>
			<div className='flex flex-wrap items-center justify-between mr-4 mt-2'>
				<div />
				<div />
				<motion.div
					animate={{ opacity: isOpen ? 1 : 0 }}
					className={
						isOpen
							? "grid gird-rows-7 justify-end rounded-lg p-4 text-right items-right bg-gray-200"
							: "hidden"
					}
					onClick={toggle}
				>
					<Links />
				</motion.div>
			</div>
		</>
	)
}
