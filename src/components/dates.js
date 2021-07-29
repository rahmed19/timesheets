import React, { useState, useEffect } from 'react'
import { getDaysInMonth, getDate, format } from 'date-fns'
import Sitename from '../components/sitename'
import TimeinTimeout from '../components/timein-timeout';

export default function Dates() {
    const currentDate = getDate(Date.now())
    const formattedMonth = format(Date.now(), 'MMM')
    const formattedYear = format(Date.now(), 'yyyy')
    const daysInMonth = getDaysInMonth(Date.now())

    const [datesArray, setDatesArray] = useState([])

    function displayFirstTwoWeeks() {
        let newArray = []
        for (let i = 1; i <= 15; i++) {

            newArray.push(`${formattedMonth} ${i}, ${formattedYear}`)
        }
        console.log(newArray)
        setDatesArray(newArray)

        return console.log('first two weeks')
    }

    function displaySecondTwoWeeks() {
        let newArray = []
        for (let i = 16; i <= daysInMonth; i++) {

            newArray.push(`${formattedMonth} ${i}, ${formattedYear}`)
        }
        console.log(newArray)
        setDatesArray(newArray)

    }

    useEffect(() => {
        if (currentDate <= 15) {
            displayFirstTwoWeeks()

        } else {
            displaySecondTwoWeeks()
            console.log(daysInMonth)
        }
    }, [])


    return (
        <>
            <p>{datesArray && datesArray.map((date, index) => {
                return (
                    <>
                        {date}
                        <Sitename />
                        <TimeinTimeout /><p />
                    </>
                )
            })}</p>
        </>
    )
}
