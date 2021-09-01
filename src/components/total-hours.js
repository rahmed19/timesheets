import React, { useEffect, useState } from "react"
import TailwindInput from "../hooks/tailwind/tailwindInput"

export default function TotalHours({ triggerChange }) {
	const [totalWeeklyHours, setTotalWeeklyHours] = useState(0)

	useEffect(() => {
		console.log("button clicked")
		// retrieve hours from sheet by using index ID
		let sumOfHours = []
		for (let i = 0; i <= 15; i++) {
			let totalInput = document.getElementById(`hoursWorked-${i}`)
			totalInput && sumOfHours.push(parseInt(totalInput.value))
		}

		let total = 0
		for (var i in sumOfHours) {
			//check to see if value in total hours is a number
			if (isNaN(sumOfHours[i]) === false) {
				total += sumOfHours[i]
			}
		}

		setTotalWeeklyHours(total)
		total = 0
	}, [triggerChange])

	return (
		<>
			<input
				className='text-red-600 text-center font-semibold shadow appearance-none border rounded w-full py-2 px-3 leading-tight'
				id='totalWeeklyHours'
				type='text'
				value={`Total Hours Worked: ${totalWeeklyHours.toFixed(2)}`}
				disabled='true'
				//send prop to align text
			/>
		</>
	)
}
