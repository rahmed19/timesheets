import React, { useState, useEffect } from 'react'
import { addDays, getMonth, getDate, setDate } from 'date-fns'

export default function Dates() {
    const currentDate = getDate(Date.now())
    const [datesArray, setDatesArray] = useState([])

    function displayFirstTwoWeeks() {


        return console.log('first two weeks')
    }

    function displaySecondTwoWeeks() {
        let newArray = []
        for (let i = 1; i <= 15; i++) {
            newArray.push(i)
        }
        setDatesArray(newArray)

    }

    useEffect(() => {
        if (currentDate <= 15) {
            displayFirstTwoWeeks()

        } else {
            displaySecondTwoWeeks()
            console.log(datesArray)
        }
    }, [])


    return (
        <>
            <h1>Current Dates: <select>{datesArray && datesArray.map((date, index) => {
                return <option key={index}>{date}</option>
            })}</select></h1>
        </>
    )
}
