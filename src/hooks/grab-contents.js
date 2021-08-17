import React, { useEffect, useContext, useState } from 'react'
import FirebaseContext from '../context/firebase'
import { useAuth } from '../context/auth-context';
import { getDaysInMonth, getDate, getMonth, getYear } from 'date-fns'

export default function GrabContents() {

    const { firebase } = useContext(FirebaseContext)

    const { currentUser } = useAuth()

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

        await firebase.firestore().collection(`${currentUser.uid}`).doc(`${datesFilter}`).set({
            datesFilter: datesFilter,
            employeeId: "0002",
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



    // auto populate the fields if record exists.
    useEffect(() => {
        const fetchData = async () => {

            const collectionRef = firebase.firestore().collection(`${currentUser.uid}`).doc(`${datesFilter}`)
            const doc = await collectionRef.get()
            if (!doc.exists) {
                console.log('no such document')
            } else {
                console.log(doc.data())
                setTimeout(() => {
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
                }, 10);
            }
            console.log(currentUser.uid)
        }
        return fetchData()

    }, [])

    return (
        <><p>
            <button onClick={handleSubmit}>Submit Data</button>
        </p>
        </>
    )
}

