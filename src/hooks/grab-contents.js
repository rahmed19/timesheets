import React, { useEffect, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import FirebaseContext from "../context/firebase"
import { useAuth } from "../context/auth-context"
import { getDaysInMonth, getDate, getMonth, getYear } from "date-fns"
import Dates from "../components/dates"

export default function GrabContents() {
	const history = useHistory()

	const { firebase } = useContext(FirebaseContext)

	const { currentUser } = useAuth()

	const [dataMessage, setDataMessage] = useState("")
	const [recievedDates, setRecievedDates] = useState([])

	const currentDate = getDate(Date.now())
	const currentMonth = getMonth(Date.now())
	const currentYear = getYear(Date.now())
	const daysInMonth = getDaysInMonth(Date.now())

	let allTotalWeeklyHours = 0

	//depending on number of days in the month, set counter
	let dateCounter = 0
	if (daysInMonth === 30) {
		dateCounter = 15
	}
	if (daysInMonth === 31) {
		dateCounter = 16
	}

	//setup firebase subcollection name based on what week it is plus adding month and year to get a unique collection ID
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

	//submit data  to firebase
	async function handleSubmit(e) {
		e.preventDefault()
		let allDatesArray = []
		let allSitenamesArray = []
		let allSignInArray = []
		let allSignOutArray = []
		let allHoursWorkedArray = []

		for (let i = 0; i < dateCounter; i++) {
			//formatted dates
			let dateContents = document.getElementById(`date-${i}`)
			dateContents && allDatesArray.push(dateContents.innerText)

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

	// auto populate the fields if record exists.
	useEffect(() => {
		const fetchData = async () => {
			const collectionRef = firebase
				.firestore()
				.collection(`${currentUser.uid.slice(0, 4).toUpperCase()}`)
				.doc(`${datesFilter}`)
			const doc = await collectionRef.get()
			if (!doc.exists) {
				history.push("/tables")
				console.log("no such document")
			} else {
				let recievedArray = []
				for (let i = 0; i < doc.data().formattedDates.length; i++) {
					recievedArray.push(i)
				}
				await setRecievedDates(recievedArray)
				setTimeout(() => {
					for (let i = 0; i < doc.data().formattedDates.length; i++) {
						//dates
						let dateContents = document.getElementById(`date-${i}`)
						dateContents.value = doc.data().formattedDates[i]

						//sitename

						let sitenameContents = document.getElementById(`sitename-${i}`)
						sitenameContents.value = doc.data().siteName[i]

						//signIn
						let signInContents = document.getElementById(`signIn-${i}`)
						signInContents.value = doc.data().signIn[i]

						//signOut
						let signOutContents = document.getElementById(`signOut-${i}`)
						signOutContents.value = doc.data().signOut[i]

						//hoursWorked
						let hoursWorkedContents = document.getElementById(`hoursWorked-${i}`)
						hoursWorkedContents.value = doc.data().hoursWorked[i]
					}
					let totalWeeklyHoursContents = document.getElementById("totalWeeklyHours")
					totalWeeklyHoursContents.value = doc.data().totalWeeklyHours
				}, 5000)
			}
		}
		return fetchData()
	}, [])

	return (
		<>
			<p>
				<div className='flex flex-wrap items-center justify-between text-center'>
					<div></div>
					<div className='mt-4'>
						<Dates recievedDates={recievedDates} />
						{/* <button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							onClick={handleSubmit}
							disabled={dataMessage ? true : false}
						>
							Save Data
						</button>{" "}
						<br />
						{dataMessage} */}
					</div>
					<div></div>
				</div>
			</p>
		</>
	)
}
