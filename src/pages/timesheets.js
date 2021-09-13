import React, { useState } from "react"
import Dates from "../components/dates"
import GrabContents from "../hooks/grab-contents"
import Layout from "../components/sections/layout"
import { motion } from "framer-motion"

function Timesheets() {
	//const [triggerChange, setTriggerChange] = useState(false)

	return (
		<>
			<Layout>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className='flex flex-wrap items-center justify-between'
				>
					<div></div>
					<div>
						<form className='max-w-3xl content-center shadow-md rounded px-8 pt-6 pb-4 mb-4 mt-8'>
							{/* <Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} /> */}
							<GrabContents />
						</form>
					</div>
					<div></div>
				</motion.div>
			</Layout>
		</>
	)
}

export default Timesheets
