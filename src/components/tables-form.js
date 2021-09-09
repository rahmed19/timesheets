import React, { useState, useEffect } from "react"
import { getDaysInMonth, getDate, getMonth, getYear, add, format } from "date-fns"

const TablesForm = () => {
	const [allData, setAllData] = useState([
		{
			date: "",
			siteName: "",
			signIn: "",
			signOut: "",
			hoursWorked: "",
		},
	])

	const handleAddRow = index => {
		const list = [...allData]
		list.splice(index + 1, 0, {
			date: "",
			siteName: "",
			signIn: "",
			signOut: "",
			hoursWorked: "",
		})
		setAllData(list)
	}

	const handleRemoveRow = index => {
		const list = [...allData]
		list.splice(index, 1)
		setAllData(list)
	}

	const handleInputChange = (e, index) => {
		const { name, value } = e.target
		const list = [...allData]
		list[index][name] = value
		setAllData(list)
	}

	// DATES INFO

	const currentDate = getDate(Date.now())
	const currentMonth = getMonth(Date.now())
	const currentYear = getYear(Date.now())
	const daysInMonth = getDaysInMonth(Date.now())
	const formattedMonth = format(Date.now(), "MMM")
	const formattedYear = format(Date.now(), "yyyy")

	const [datesArray, setDatesArray] = useState([])

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
		} else {
			displaySecondTwoWeeks()
		}
	}, [])

	return (
		<>
			<div>
				{allData.map((data, index) => {
					return (
						<div>
							<select
								type='text'
								name='date'
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
								value={data.date}
							>
								<option>---Select the date</option>
								{datesArray.map(date => {
									return <option>{date}</option>
								})}
							</select>

							<input
								type='text'
								name='siteName'
								placeholder=''
								value={data.siteName}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
							/>
							<input
								type='text'
								name='signIn'
								placeholder=''
								value={data.signIn}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
							/>
							<input
								type='text'
								name='signOut'
								placeholder=''
								value={data.signOut}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
							/>
							<input
								type='text'
								name='hoursWorked'
								placeholder=''
								value={data.hoursWorked}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
							/>
							<button onClick={() => handleAddRow(index)} className='ml-3'>
								Add Row
							</button>
							<button onClick={() => handleRemoveRow(index)} className='ml-3'>
								Remove Row
							</button>
						</div>
					)
				})}
			</div>
			<br />
		</>
	)
}

export default TablesForm
