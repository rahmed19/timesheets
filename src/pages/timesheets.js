import React, { useState } from "react"
import Dates from "../components/dates"
import GrabContents from "../hooks/grab-contents"
import Layout from "../components/sections/layout"

function Timesheets() {
	const [triggerChange, setTriggerChange] = useState(false)

	return (
		<>
			<Layout>
				<div className='flex flex-wrap items-center justify-between'>
					<div></div>
					<div>
						<form className='bg-white max-w-3xl shadow-md  rounded px-8 pt-6 pb-8 mb-4'>
							<Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} />
							<GrabContents />
						</form>
					</div>
					<div></div>
				</div>
			</Layout>
		</>
	)
}

export default Timesheets
