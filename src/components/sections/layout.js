import React from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import Sidebar from "./sidebar"

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<Sidebar />
			{children}
			<Footer />
		</>
	)
}
