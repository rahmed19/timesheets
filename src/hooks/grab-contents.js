import React, { useEffect } from 'react'

export default function GrabContents({ allContents, setAllContents, triggerChange }) {

    useEffect(() => {
        let allDatesArray = []
        for (let i = 0; i < 15; i++) {
            let dateContents = document.getElementById(`date-${i}`)

            dateContents && allDatesArray.push(`${dateContents.innerHTML}`)

            //console.log(allDatesArray)
        }
        setAllContents({
            name: "",
            dates: `${allDatesArray}`,
            signIn: "",
            signOut: "",
            hoursWorked: "",
            totalWeeklyHours: "",
        })
        console.log(allContents.dates)
    }, [triggerChange])


    return (
        <>

        </>
    )
}

