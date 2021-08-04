import React, { useEffect } from 'react'

export default function GrabContents({ allContents, setAllContents, triggerChange }) {

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
            userId: 0,
            name: "",
            actualDates: "",
            formattedDates: allDatesArray,
            siteName: allSitenamesArray,
            signIn: allSignInArray,
            signOut: allSignOutArray,
            hoursWorked: allHoursWorkedArray,
            totalWeeklyHours: allTotalWeeklyHours
        })
        console.log(allContents)
    }, [triggerChange])


    return (
        <>

        </>
    )
}

