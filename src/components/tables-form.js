import React, { useState, useEffect, useContext } from "react"
import { getDaysInMonth, getDate, getMonth, getYear, add, format } from "date-fns"
import FirebaseContext from "../context/firebase"
import { useAuth } from "../context/auth-context"

const TablesForm = () => {
	const { firebase } = useContext(FirebaseContext)

	const { currentUser } = useAuth()

	const [allData, setAllData] = useState([
		{
			date: "",
			siteName: "",
			signIn: "",
			signOut: "",
			hoursWorked: "",
		},
	])

	const [dataMessage, setDataMessage] = useState("")
	const [numberOfElements, setNumberOfElements] = useState(0)

	const handleAddRow = i => {
		const list = [...allData]
		list.splice(i + 1, 0, {
			date: "",
			siteName: "",
			signIn: "",
			signOut: "",
			hoursWorked: "",
		})
		setAllData(list)
		setNumberOfElements(prev => {
			setNumberOfElements(prev + 1)
		})
	}

	const handleRemoveRow = i => {
		const list = [...allData]
		list.splice(i, 1)
		setAllData(list)
		setNumberOfElements(prev => {
			setNumberOfElements(prev - 1)
		})
	}

	const handleInputChange = (e, i) => {
		const { name, value } = e.target
		const list = [...allData]
		list[i][name] = value
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

	let datesFilter = 0
	if (currentDate <= 15) {
		let currentYearString = currentYear.toString()
		let currentMonthString = currentMonth.toString()
		datesFilter = parseInt(1 + currentMonthString + currentYearString)
	} else {
		let currentYearString = currentYear.toString()
		let currentMonthString = currentMonth.toString()
		datesFilter = parseInt(2 + currentMonthString + currentYearString)
	}

	let allTotalWeeklyHours = 0

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

	async function handleSubmit(e) {
		e.preventDefault()
		let allDatesArray = []
		let allSitenamesArray = []
		let allSignInArray = []
		let allSignOutArray = []
		let allHoursWorkedArray = []

		for (let i = 0; i < numberOfElements; i++) {
			//formatted dates
			let dateContents = document.getElementById(`date-${i}`)
			dateContents && allDatesArray.push(dateContents.value)

			//sitename
			let sitenameContents = document.getElementById(`sitename-${i}`)
			sitenameContents && allSitenamesArray.push(sitenameContents.value)

			//signIn
			let signInContents = document.getElementById(`signIn-${i}`)
			signInContents && allSignInArray.push(signInContents.value)

			//signOut
			let signOutContents = document.getElementById(`signOut-${i}`)
			signOutContents && allSignOutArray.push(signOutContents.value)

			//hoursWorked
			let hoursWorkedContents = document.getElementById(`hoursWorked-${i}`)
			hoursWorkedContents && allHoursWorkedArray.push(hoursWorkedContents.value)
		}
		//totalWeeklyHours

		let totalWeeklyHoursContents = document.getElementById("totalWeeklyHours")
		allTotalWeeklyHours = parseInt(totalWeeklyHoursContents.value)

		await firebase
			.firestore()
			.collection(`${currentUser.uid.slice(0, 4).toUpperCase()}`)
			.doc(`${datesFilter}`)
			.set({
				datesFilter: datesFilter,
				employeeId: currentUser.uid.slice(0, 4).toUpperCase(),
				name: currentUser.displayName,
				actualDates: "",
				formattedDates: allDatesArray,
				siteName: allSitenamesArray,
				signIn: allSignInArray,
				signOut: allSignOutArray,
				hoursWorked: allHoursWorkedArray,
				totalWeeklyHours: allTotalWeeklyHours,
			})

		setDataMessage("Your timesheet has been saved successfully.")
		setTimeout(() => {
			setDataMessage("")
		}, 3000)
	}

	return (
		<>
			<div>
				{allData.map((data, i) => {
					return (
						<div>
							<select
								id={`date-${i}`}
								type='text'
								name='date'
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, i)}
								value={data.date}
							>
								<option>---Select the date</option>
								{datesArray.map(date => {
									return <option>{date}</option>
								})}
							</select>

							<input
								id={`sitename-${i}`}
								type='text'
								name='siteName'
								placeholder=''
								value={data.siteName}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, i)}
							/>
							<input
								id={`signIn-${i}`}
								type='text'
								name='signIn'
								placeholder=''
								value={data.signIn}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, i)}
							/>
							<input
								id={`signOut-${i}`}
								type='text'
								name='signOut'
								placeholder=''
								value={data.signOut}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, i)}
							/>
							<input
								id={`hoursWorked-${i}`}
								type='text'
								name='hoursWorked'
								placeholder=''
								value={data.hoursWorked}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, i)}
							/>
							<button onClick={() => handleAddRow(i)} className='ml-3'>
								Add Row
							</button>

							<button onClick={() => handleRemoveRow(i)} className='ml-3'>
								Remove Row
							</button>
						</div>
					)
				})}
				<br />
				<br />
				<input
					id='totalWeeklyHours'
					type='text'
					name='totalWeeklyHours'
					placeholder=''
					// value={data.hoursWorked}
					className='border bg-gray-300 ml-3'
					//onChange={e => handleInputChange(e, i)}
				/>
			</div>
			<br />
			{numberOfElements}
			<button onClick={e => handleSubmit(e)} className='ml-3'>
				Submit Data <br />
				{dataMessage}
			</button>
		</>
	)
}

export default TablesForm
