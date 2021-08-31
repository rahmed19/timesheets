import React, { useState, useEffect } from "react"
import { getDaysInMonth, getDate, getMonth, getYear, add, format } from "date-fns"
import Sitename from "../components/sitename"
import TimeinTimeout from "../components/timein-timeout"
import TotalHours from "../components/total-hours"

export default function Dates({ triggerChange, setTriggerChange }) {
	const currentDate = getDate(Date.now())
	const currentMonth = getMonth(Date.now())
	const currentYear = getYear(Date.now())
	const daysInMonth = getDaysInMonth(Date.now())
	const formattedMonth = format(Date.now(), "MMM")
	const formattedYear = format(Date.now(), "yyyy")

	const [datesArray, setDatesArray] = useState([])
	// const [statHolidays, setStatHolidays] = useState([])
	// const [isStat, setIsStat] = useState(null)

	function displayFirstTwoWeeks() {
		let newArray = []
		for (let i = 1; i <= 15; i++) {
			//add and format day of the week, date, month and year
			newArray.push(
				`${format(
					add(new Date(currentYear, currentMonth, i - 1), { days: 1 }),
					"EEE"
				)} ${formattedMonth} ${i}, ${formattedYear}`
			)
			console.log(newArray)
		}

		setDatesArray(newArray)
	}

	function displaySecondTwoWeeks() {
		let newArray = []
		for (let i = 16; i <= daysInMonth; i++) {
			//add and format day of the week, date, month and year
			newArray.push(
				`${format(
					add(new Date(currentYear, currentMonth, i - 1), { days: 1 }),
					"EEE"
				)} ${formattedMonth} ${i}, ${formattedYear}`
			)
		}
		console.log(newArray)
		setDatesArray(newArray)
	}

	useEffect(() => {
		if (currentDate <= 15) {
			displayFirstTwoWeeks()
		} else {
			displaySecondTwoWeeks()
		}
		//get info on stat holidays
		// fetch('https://canada-holidays.ca/api/v1/provinces/BC')
		//     .then(response => response.json())
		//     .then(data => {
		//         setStatHolidays(data.province.holidays)
		//     })
		// console.log('stat holidays' + statHolidays)
	}, [])

	// function handleHolidays() {
	//     for (let i = 1; i < 15; i++) {
	//         let yearCheck = format(add(new Date(currentYear, currentMonth, i - 1), { days: 1 }), 'yyyy')
	//         console.log(yearCheck)
	//         let monthCheck = format(add(new Date(currentYear, currentMonth, i - 1), { days: 1 }), 'MM')
	//         console.log(monthCheck)
	//         let dateCheck = format(add(new Date(currentYear, currentMonth, i - 1), { days: 1 }), 'dd')
	//         console.log(dateCheck)
	//         if (statHolidays !== undefined) {
	//             for (let a = 0; a < statHolidays.length; a++) {
	//                 let stat = statHolidays[a].date
	//                 let statYear = stat.substr(0, 4)
	//                 console.log(statYear)
	//                 let statMonth = stat.substr(5, 2)
	//                 console.log(statMonth)
	//                 let statDate = stat.substr(8, 2)
	//                 console.log(statDate)

	//                 if (yearCheck === statYear && monthCheck === statMonth && dateCheck === statDate) {
	//                     setIsStat(true)
	//                     console.log(isStat)

	//                 }
	//             }
	//         }
	//     }
	// }

	return (
		<>
			<div className='flex flex-wrap items-center justify-between'>
				<div></div>
				<div className='w-full max-w-2xl content-center'>
					<h4 className='text-center text-2xl font-bold leading-normal mt-0 mb-4 text-black-800'>
						Submit Your Timesheet
					</h4>
					{datesArray &&
						datesArray.map((date, index) => {
							return (
								<>
									<div className='grid grid-cols-3'>
										<div id={`date-${index}`}>
											<p className='text-center font-semibold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500'>
												{date}
											</p>
										</div>

										<div className='px-2'>
											<Sitename index={index} />
										</div>
										<div>
											<TimeinTimeout
												index={index}
												triggerChange={triggerChange}
												setTriggerChange={setTriggerChange}
											/>
										</div>
									</div>
								</>
							)
						})}
					<TotalHours triggerChange={triggerChange} />
				</div>
				<div></div>
			</div>

			{/* <button onClick={handleHolidays}>Fetch Holidays</button> */}
		</>
	)
}
