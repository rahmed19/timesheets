import React, { useState } from "react"
import Dates from "../components/dates"
import GrabContents from "../hooks/grab-contents"
import Layout from "../components/sections/layout"
import { useAuth } from "../context/auth-context"
import { Link } from "react-router-dom"

function Timesheets() {
	const [triggerChange, setTriggerChange] = useState(false)
	const { logout, currentUser } = useAuth()

	return (
		<>
			<Layout>
				<div className='App'>
					<h1>True Canadian Security Corp. Timesheets </h1>
					<p>Hello, {currentUser.displayName}</p>
					<p>Employee ID: {currentUser.uid.slice(0, 4).toUpperCase()}</p>
					<Link to='/update-profile'>Update Profile</Link>
					<form className='timesheet'>
						<Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} />

						<GrabContents />
					</form>
					<Link to='/login' onClick={() => logout()}>
						Log Out
					</Link>
				</div>
			</Layout>
		</>
	)
}

export default Timesheets
