import React, { useState, useEffect } from "react"
import { getDaysInMonth, getDate, getMonth, getYear, add, format } from "date-fns"
import TotalHours from "../components/total-hours"
import TailwindInput from "../hooks/tailwind/tailwindInput"

export default function Dates({ triggerChange, setTriggerChange, recievedDates }) {
	const currentDate = getDate(Date.now())
	const currentMonth = getMonth(Date.now())
	const currentYear = getYear(Date.now())
	const daysInMonth = getDaysInMonth(Date.now())
	const formattedMonth = format(Date.now(), "MMM")
	const formattedYear = format(Date.now(), "yyyy")

	const [datesArray, setDatesArray] = useState([])
	const [currentTwoWeeks, setCurrentTwoWeeks] = useState("")

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
		setDatesArray(newArray)
	}

	useEffect(() => {
		if (currentDate <= 15) {
			displayFirstTwoWeeks()
			setCurrentTwoWeeks("First Two Weeks Of")
		} else {
			displaySecondTwoWeeks()
			setCurrentTwoWeeks("Second Two Weeks Of")
		}
	}, [])

	return (
		<>
			<div className='md:flex md:flex-wrap items-center justify-between'>
				<div></div>
				<div className='content-center'>
					<h4 className='text-center text-2xl font-bold leading-normal mt-0 mb-4 text-black-800'>
						Your Timesheet For {currentTwoWeeks} {formattedMonth} {formattedYear} .
					</h4>
					{recievedDates &&
						recievedDates.map((date, index) => {
							return (
								<>
									<div className='grid md:grid-cols-3'>
										<div className='mt-1 mb-1 md:m-0'>
											<TailwindInput id={`date-${index}`} type='text' disabled='true' />
										</div>

										<div className='px-2 mt-1 mb-1 md:m-0'>
											<TailwindInput
												id={`sitename-${index}`}
												type='text'
												disabled='true'
											/>
											{/* <Sitename index={index} /> */}
										</div>
										<div>
											<div className='mb-4'>
												<div className='grid grid-cols-3'>
													<div className='px-1'>
														<TailwindInput
															id={`signIn-${index}`}
															type='text'
															maxLength='4'
															disabled='true'
														/>
													</div>
													<div className='px-1'>
														<TailwindInput
															id={`signOut-${index}`}
															type='text'
															maxLength='4'
															disabled='true'
														/>
													</div>
													<div className='px-1'>
														<TailwindInput
															//index number to appropriate scalable input ID

															id={`hoursWorked-${index}`}
															type='number'
															max='24'
															disabled='true'
															//onChange={() => setTriggerChange(!triggerChange)}
														/>
													</div>
												</div>
											</div>
											{/* <TimeinTimeout
												index={index}
												// triggerChange={triggerChange}
												// setTriggerChange={setTriggerChange}
											/> */}
										</div>
									</div>
								</>
							)
						})}
					<div>
						<TotalHours
						// triggerChange={triggerChange}
						/>
					</div>
				</div>
				<div></div>
			</div>

			{/* <button onClick={handleHolidays}>Fetch Holidays</button> */}
		</>
	)
}
