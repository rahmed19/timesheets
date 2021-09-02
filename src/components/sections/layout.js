import React, { useState, useEffect } from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import Sidebar from "./sidebar"

export default function Layout({ children }) {
	const [isOpen, setIsOpen] = useState(false)

	function toggle() {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		function hideMenu() {
			if (window.innerWidth > 768 && isOpen) {
				setIsOpen(false)
			}
		}
		window.addEventListener("resize", hideMenu)

		return () => {
			window.removeEventListener("resize", hideMenu)
		}
	})

	return (
		<>
			<Navbar toggle={toggle} />
			<Sidebar isOpen={isOpen} toggle={toggle} />
			{children}
			<Footer />
		</>
	)
}
