import React, { useState } from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import Sidebar from "./sidebar"

export default function Layout({ children }) {
	const [isOpen, setIsOpen] = useState(false)

	function toggle() {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<Navbar toggle={toggle} />
			<Sidebar isOpen={isOpen} toggle={toggle} />
			{children}
			<Footer />
		</>
	)
}
