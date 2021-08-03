import React, { useEffect, useState } from 'react'

export default function TotalHours({ triggerChange }) {

    const [totalWeeklyHours, setTotalWeeklyHours] = useState(0)

    useEffect(() => {
        console.log('button clicked')
        // retrieve hours from sheet by using index ID
        let sumOfHours = []
        for (let i = 0; i <= 15; i++) {
            let totalInput = document.getElementById(i)
            totalInput && sumOfHours.push(parseInt(totalInput.value))
        }

        let total = 0
        for (var i in sumOfHours) {
            //check to see if value in total hours is a number
            if (isNaN(sumOfHours[i]) === false) {
                total += sumOfHours[i]
            }
        }

        setTotalWeeklyHours(total)
        console.log(total)
        total = 0

    }, [triggerChange])


    return (
        <>
            Total Hours Worked: <input
                aria-label="Total hours worked"
                type="text"
                value={totalWeeklyHours}
            />

        </>
    )
}
