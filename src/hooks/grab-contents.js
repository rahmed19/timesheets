import React, { useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'
import { getDaysInMonth, getDate, getMonth, getYear } from 'date-fns'

export default function GrabContents() {

    const { firebase } = useContext(FirebaseContext)

    const currentDate = getDate(Date.now())
    const currentMonth = getMonth(Date.now())
    const currentYear = getYear(Date.now())
    const daysInMonth = getDaysInMonth(Date.now())

    let allTotalWeeklyHours = 0


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
        }
        //totalWeeklyHours

        let totalWeeklyHoursContents = document.getElementById('totalWeeklyHours')
        allTotalWeeklyHours = parseInt(totalWeeklyHoursContents.value)

        await firebase.firestore().collection('0001').doc('172021').set({
            datesFilter: datesFilter,
            employeeId: "0001",
            name: "",
            actualDates: "",
            formattedDates: allDatesArray,
            siteName: allSitenamesArray,
            signIn: allSignInArray,
            signOut: allSignOutArray,
            hoursWorked: allHoursWorkedArray,
            totalWeeklyHours: allTotalWeeklyHours
        })

    }

    //collect data from firebase
    async function handleCollect(e) {
        e.preventDefault()


        const collectionRef = firebase.firestore().collection('0001').doc('172021')
        const doc = await collectionRef.get()
        if (!doc.exists) {
            console.log('no such document')
        } else {
            console.log(doc.data())
            for (let i = 0; i < 15; i++) {

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
            let totalWeeklyHoursContents = document.getElementById('totalWeeklyHours')
            totalWeeklyHoursContents.value = doc.data().totalWeeklyHours

        }

    }

    return (
        <><p>
            <button onClick={handleSubmit}>Submit Data</button>
            <button onClick={handleCollect}>Collect Data</button>
        </p>
        </>
    )
}

