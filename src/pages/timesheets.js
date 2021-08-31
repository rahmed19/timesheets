import React, { useState } from "react"
import Dates from "../components/dates"
import GrabContents from "../hooks/grab-contents"
import Layout from "../components/sections/layout"

function Timesheets() {
	const [triggerChange, setTriggerChange] = useState(false)

	return (
		<>
			<Layout>
				<div>
					<form>
						<Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} />
						<GrabContents />
					</form>
				</div>
			</Layout>
		</>
	)
}

export default Timesheets
