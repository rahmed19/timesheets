import React, { useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'
import { getDaysInMonth, getDate, getMonth, getYear } from 'date-fns'

export default function GrabContents({ allContents, setAllContents, triggerChange }) {

    const { firebase } = useContext(FirebaseContext)

    const currentDate = getDate(Date.now())
    const currentMonth = getMonth(Date.now())
    const currentYear = getYear(Date.now())
    const daysInMonth = getDaysInMonth(Date.now())

    //setup firebase collection name based on what week it is plus adding month and year to get a unique collection ID
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


    useEffect(() => {
        let allDatesArray = []
        let allSitenamesArray = []
        let allSignInArray = []
        let allSignOutArray = []
        let allHoursWorkedArray = []
        let allTotalWeeklyHours = 0

        for (let i = 0; i < 15; i++) {
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

            //totalWeeklyHours

            let totalWeeklyHoursContents = document.getElementById('totalWeeklyHours')
            allTotalWeeklyHours = parseInt(totalWeeklyHoursContents.value)

        }

        setAllContents({
            datesFilter: datesFilter,
            employeeId: "0003",
            name: "",
            actualDates: "",
            formattedDates: allDatesArray,
            siteName: allSitenamesArray,
            signIn: allSignInArray,
            signOut: allSignOutArray,
            hoursWorked: allHoursWorkedArray,
            totalWeeklyHours: allTotalWeeklyHours
        })
        console.log(allContents.collectionId)
    }, [triggerChange])

    function handleSubmit() {
        console.log(allContents)
        const firebaseDoc = allContents.datesFilter
        const employeeId = allContents.employeeId
        firebase.firestore().collection(`${employeeId}`).doc(`${firebaseDoc}`).set(allContents)
    }

    return (
        <>
            <button onClick={handleSubmit}>Submit Data</button>
        </>
    )
}
