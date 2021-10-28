import React, { useState, useEffect, useContext, useRef } from "react"
import { useHistory } from "react-router-dom"
import { getDaysInMonth, getDate, getMonth, getYear, add, format } from "date-fns"
import FirebaseContext from "../context/firebase"
import { useAuth } from "../context/auth-context"

const TablesForm = () => {
	const { firebase } = useContext(FirebaseContext)

	const history = useHistory()

	const { currentUser } = useAuth()

	let defaultTime = [
		"11:00 PM",
		"11:15 PM",
		"11:30 PM",
		"11:45 PM",
		"12:00 AM",
		"12:15 AM",
		"12:30 AM",
		"12:45 AM",
		"01:00 AM",
		"01:15 AM",
		"01:30 AM",
		"01:45 AM",
		"02:00 AM",
		"02:15 AM",
		"02:30 AM",
		"02:45 AM",
		"03:00 AM",
		"03:15 AM",
		"03:30 AM",
		"03:45 AM",
		"04:00 AM",
		"04:15 AM",
		"04:30 AM",
		"04:45 AM",
		"05:00 AM",
		"05:15 AM",
		"05:30 AM",
		"05:45 AM",
		"06:00 AM",
		"06:15 AM",
		"06:30 AM",
		"06:45 AM",
		"07:00 AM",
		"07:15 AM",
		"07:30 AM",
		"07:45 AM",
		"08:00 AM",
		"08:15 AM",
		"08:30 AM",
		"08:45 AM",
		"09:00 AM",
		"09:15 AM",
		"09:30 AM",
		"09:45 AM",
		"10:00 AM",
		"10:15 AM",
		"10:30 AM",
		"10:45 AM",
		"11:00 AM",
		"11:15 AM",
		"11:30 AM",
		"11:45 AM",
		"12:00 PM",
		"12:15 PM",
		"12:30 PM",
		"12:45 PM",
		"01:00 PM",
		"01:15 PM",
		"01:30 PM",
		"01:45 PM",
		"02:00 PM",
		"02:15 PM",
		"02:30 PM",
		"02:45 PM",
		"03:00 PM",
		"03:15 PM",
		"03:30 PM",
		"03:45 PM",
		"04:00 PM",
		"04:15 PM",
		"04:30 PM",
		"04:45 PM",
		"05:00 PM",
		"05:15 PM",
		"05:30 PM",
		"05:45 PM",
		"06:00 PM",
		"06:15 PM",
		"06:30 PM",
		"06:45 PM",
		"07:00 PM",
		"07:15 PM",
		"07:30 PM",
		"07:45 PM",
		"08:00 PM",
		"08:15 PM",
		"08:30 PM",
		"08:45 PM",
		"09:00 PM",
		"09:15 PM",
		"09:30 PM",
		"09:45 PM",
		"10:00 PM",
		"10:15 PM",
		"10:30 PM",
		"10:45 PM",
		"11:00 PM",
	]

	const [docs, setDocs] = useState([])
	const [trigger, setTrigger] = useState(false)
	//const [updateIndex, setUpdateIndex] = useState(false)
	const [dataMessage, setDataMessage] = useState("")
	const [numberOfElements, setNumberOfElements] = useState(0)
	const [signInIndex, setSignInIndex] = useState(0)
	const [signOutIndex, setSignOutIndex] = useState(0)
	const [activeTimeArray, setActiveTimeArray] = useState(defaultTime)
	const [selectedOption, setSelectedOption] = useState("")
	const [rowIndex, setRowIndex] = useState(0)
	const [showComponentDisplayDates, setShowComponentDisplayDates] = useState(false)
	const [signInOrOut, setSignInOrOut] = useState("")

	const [allData, setAllData] = useState([
		{
			date: "",
			siteName: "",
			signIn: "",
			signOut: "",
			hoursWorked: "",
		},
	])

	function ComponentDisplayDates({ signInOrOut }) {
		if (signInOrOut === "signIn") {
			var listOfDate = activeTimeArray.map((time, index) => {
				return (
					<>
						<form>
							<label>
								<input
									name='signIn'
									type='radio'
									id={index}
									key={index}
									value={time}
									onClick={() => {
										setSelectedOption(time)
										setTimeout(() => {
											console.log(selectedOption)
											document.getElementById(`signIn-${rowIndex}`).value = time
											setShowComponentDisplayDates(false)
										}, 300)
									}}
									checked={selectedOption === time}
								/>
								{time}
							</label>
						</form>
					</>
				)
			})
		}
		if (signInOrOut === "signOut") {
			var listOfDate = activeTimeArray.map((time, index) => {
				return (
					<>
						<form>
							<label>
								<input
									name='signIn'
									type='radio'
									id={index}
									key={index}
									value={time}
									onClick={() => {
										setSelectedOption(time)
										setTimeout(() => {
											console.log(selectedOption)
											document.getElementById(`signOut-${rowIndex}`).value = time
											setShowComponentDisplayDates(false)
										}, 300)
									}}
									checked={selectedOption === time}
								/>
								{time}
							</label>
						</form>
					</>
				)
			})
		}
		return listOfDate
	}

	const handleAddRow = i => {
		setRowIndex(p => p + 1)
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
		let d = document.getElementById(`date-${i}`).value
		let sn = document.getElementById(`sitename-${i}`).value
		handleFirebaseIndex(d, sn)
	}

	const handleRemoveRow = i => {
		const list = [...allData]
		list.splice(i, 1)
		setAllData(list)
		setNumberOfElements(prev => {
			setNumberOfElements(prev - 1)
		})
	}

	const handleInputChange = async (e, i) => {
		const { name, value } = e.target
		const list = [...allData]
		list[i][name] = value
		await setAllData(list)

		if (name === "date") {
			//disable certain fields if date is not selected
			if (e.target.value === "---Select the date") {
				document.getElementById(`sitename-${i}`).disabled = true
				document.getElementById(`signIn-${i}`).disabled = true
				document.getElementById(`signOut-${i}`).disabled = true
			} else {
				document.getElementById(`sitename-${i}`).disabled = false
				// document.getElementById(`signIn-${i}`).disabled = false
				// document.getElementById(`signOut-${i}`).disabled = false
			}
		}

		if (name === "sitename") {
			let d = document.getElementById(`date-${i}`).value
			let sn = document.getElementById(`sitename-${i}`).value
			if (e.target.value === "---Select your site") {
				document.getElementById(`signIn-${i}`).disabled = true
				document.getElementById(`signOut-${i}`).disabled = true
			} else {
				document.getElementById(`signIn-${i}`).disabled = false
				document.getElementById(`signOut-${i}`).disabled = false
				setTimeout(() => {
					fetchFirebaseIndex(d, sn)
				}, 500)
			}
		}

		if (name === "signIn") {
			//Get the index number of selcted sign in option
			var selectBox = document.getElementById(`signIn-${i}`)
			await setSignInIndex(selectBox.options[selectBox.selectedIndex].index)
			setTimeout(() => {
				console.log(signInIndex)
			}, 2000)
		}

		if (name === "signOut") {
			//Get the index number of selcted sign out option

			var selectSignOutBox = document.getElementById(`signOut-${i}`)
			setSignOutIndex(selectSignOutBox.options[selectSignOutBox.selectedIndex].index)
			// console.log(signOutIndex)
			// setTimeout(() => {
			// 	console.log("signout trigger")
			// 	handleFirebaseIndex(d, sn)
			// 	//document.getElementById("handleFirebaseIndex").click()
			// }, 3000)
		}
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
			//trigger to sitenames
			setTrigger(!trigger)
		} else {
			displaySecondTwoWeeks()
			//trigger to sitenames
			setTrigger(!trigger)
		}
	}, [])

	//get sitenames from firebase
	useEffect(() => {
		const fetchData = async () => {
			const data = await firebase
				.firestore()
				.collection("sites")
				.get()
				.then(snapshot => {
					let documents = []
					snapshot.forEach(doc => {
						documents.push({ ...doc.data(), id: doc.id })
					})
					setDocs(documents)
				})
			console.log(docs)
		}

		return () => fetchData()
	}, [trigger])

	//update firebase with new timeslots for the selected date and site.
	const handleFirebaseIndex = async (date, sitename) => {
		if (signOutIndex - signInIndex <= 0) {
			alert(
				`Please make sure your sign out time is after your sign in time. ${
					signOutIndex - signInIndex
				}`
			)
		} else {
			var arrayTop = activeTimeArray.slice(0, signInIndex - 1)
			console.log("array top " + arrayTop)
			var arrayBottom = activeTimeArray.slice(signOutIndex - 2, activeTimeArray.length)
			console.log("array bottom " + arrayBottom)
			var newFireBaseArray = [...arrayTop, "---", ...arrayBottom]
			console.log("firebase Array" + newFireBaseArray)
			setTimeout(() => {
				console.log("firebase trigger")
				firebase
					.firestore()
					.collection("timeframeIndex")
					.doc(`${date}`)
					.collection(`${sitename}`)
					.doc("UsedUpSlots")
					.set({
						//get array information from above declared time slots
						firebaseArray: newFireBaseArray,
					})
			}, 1000)
		}
	}

	//if date and sitename present on firebase, fetch the data and populate new select field.
	const fetchFirebaseIndex = async (date, sitename) => {
		const collectionRef = firebase
			.firestore()
			.collection("timeframeIndex")
			.doc(`${date}`)
			.collection(`${sitename}`)
			.doc("UsedUpSlots")
		const doc = await collectionRef.get()
		if (!doc.exists) {
			console.log("no such document")
			setActiveTimeArray(defaultTime)
		} else {
			console.log("found it!")
			console.log(doc.data().firebaseArray)
			setActiveTimeArray(doc.data().firebaseArray)
		}
	}

	const handleSignInSignOut = () => {
		console.log("Handle Sign in Sign Out")
	}

	async function handleSubmit(e) {
		e.preventDefault()
		let allDatesArray = []
		let allSitenamesArray = []
		let allSignInArray = []
		let allSignOutArray = []
		let allHoursWorkedArray = []

		for (let i = 0; i <= numberOfElements; i++) {
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
			history.push("/")
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

							{docs && (
								<select
									id={`sitename-${i}`}
									name='sitename'
									onChange={e => handleInputChange(e, i)}
									className='border bg-gray-300 ml-3'
									disabled='true'
									//className='font-semibold shadow md:appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500'
								>
									<option>---Select your site</option>
									<option></option>
									{docs &&
										docs.map(doc => {
											return <option key={doc.id}>{doc.sitename}</option>
										})}
								</select>
							)}
							{/* <select
								id={`signIn-${i}`}
								name='signIn'
								onChange={e => handleInputChange(e, i)}
								className='border bg-gray-300 ml-3'
								disabled='true'

								//className='font-semibold shadow md:appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500'
							>
								<option>---Sign In</option>
								<option></option>
								{activeTimeArray.map((time, index) => {
									return (
										<option id='timeInOption' key={index}>
											{time}
										</option>
									)
								})}
							</select>

							<select
								id={`signOut-${i}`}
								name='signOut'
								onChange={e => handleInputChange(e, i)}
								className='border bg-gray-300 ml-3'
								disabled='true'
								//className='font-semibold shadow md:appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500'
							>
								<option>---Sign Out</option>
								<option></option>
								{activeTimeArray.map(time => {
									return (
										<option
										//key={time.id}
										>
											{time}
										</option>
									)
								})}
							</select> */}

							<input
								type='text'
								id={`signIn-${i}`}
								name='signIn'
								placeholder=''
								//value={selectedOption}
								className='border bg-gray-300 ml-3'
								//onChange={e => handleInputChange(e, i)}
								onClick={() => handleSignInSignOut()}
								onMouseEnter={() => {
									setSignInOrOut("signIn")
									setShowComponentDisplayDates(true)
								}}
								//onMouseOut={() => setShowComponentDisplayDates(false)}
							/>

							<input
								type='text'
								id={`signOut-${i}`}
								name='signOut'
								placeholder=''
								////value={data.hoursWorked}
								className='border bg-gray-300 ml-3'
								//onChange={e => handleInputChange(e, i)}
								onClick={() => handleSignInSignOut()}
								onMouseEnter={() => {
									setSignInOrOut("signOut")
									setShowComponentDisplayDates(true)
								}}
								//onMouseOut={() => setShowComponentDisplayDates(false)}
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
			<br />
			<br />
			{currentUser.uid.slice(0, 4).toUpperCase()}
			<br />
			<br />
			Time In Index: {signInIndex}
			<br />
			<br />
			Time Out Index: {signOutIndex}
			<br />
			<br />
			Rowbase Index: {rowIndex}
			<br />
			<br />
			<button
				id='handleFirebaseIndex'
				onClick={() => {
					handleFirebaseIndex()
				}}
				className='ml-3'
			>
				Check State <br />
			</button>
			<br />
			{showComponentDisplayDates ? (
				<ComponentDisplayDates signInOrOut={signInOrOut} />
			) : null}
		</>
	)
}

export default TablesForm
