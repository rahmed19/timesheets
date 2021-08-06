import React, { useEffect, useContext, useState } from 'react'
import FirebaseContext from '../context/firebase'
import { getDaysInMonth, getDate, getMonth, getYear } from 'date-fns'

export default function GrabContents({ allContents, setAllContents, triggerChange }) {

    const { firebase } = useContext(FirebaseContext)
    const [isSubmitted, setIsSubmitted] = useState(!allContents.isSubmitted)

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
            isSubmitted: isSubmitted,
            datesFilter: datesFilter,
            employeeId: "0004",
            name: "",
            actualDates: "",
            formattedDates: allDatesArray,
            siteName: allSitenamesArray,
            signIn: allSignInArray,
            signOut: allSignOutArray,
            hoursWorked: allHoursWorkedArray,
            totalWeeklyHours: allTotalWeeklyHours
        })
        console.log(allContents.isSubmitted)
    }, [triggerChange])

    //submit data  to firebase
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(allContents)
        const firebaseDoc = allContents.datesFilter
        const employeeId = allContents.employeeId
        await firebase.firestore().collection(`${employeeId}`).doc(`${firebaseDoc}`).set(allContents)

    }

    //collect data from firebase
    async function handleCollect(e) {
        e.preventDefault()

        const firebaseDoc = allContents.datesFilter
        const employeeId = allContents.employeeId
        const collectionRef = firebase.firestore().collection(`${employeeId}`).doc(`${firebaseDoc}`)
        const doc = await collectionRef.get()
        if (!doc.exists) {
            console.log('no such document')
        } else {
            console.log(doc.data())
            setAllContents(doc.data())
            // change submitted setting to false
            await setIsSubmitted(!allContents.isSubmitted)
            console.log(isSubmitted)
        }

    }

    return (
        <>
            <button onClick={handleSubmit}>Submit Data</button>
            <button onClick={handleCollect}>Collect Data</button>
        </>
    )
}

