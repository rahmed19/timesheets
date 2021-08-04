import React, { useState, useEffect } from 'react'
import { getDaysInMonth, getDate, getMonth, getYear, add, format } from 'date-fns'
import Sitename from '../components/sitename'
import TimeinTimeout from '../components/timein-timeout';

export default function Dates({ triggerChange, setTriggerChange }) {
    const currentDate = getDate(Date.now())
    const currentMonth = getMonth(Date.now())
    const currentYear = getYear(Date.now())
    const formattedMonth = format(Date.now(), 'MMM')
    const formattedYear = format(Date.now(), 'yyyy')

    const daysInMonth = getDaysInMonth(Date.now())

    const [datesArray, setDatesArray] = useState([])

    function displayFirstTwoWeeks() {
        let newArray = []
        for (let i = 1; i <= 15; i++) {
            //add and format day of the week, date, month and year
            newArray.push(`${format(add(new Date(currentYear, currentMonth, i - 1), { days: 1 }), 'EEE')} ${formattedMonth} ${i}, ${formattedYear}`)

        }

        setDatesArray(newArray)

        return console.log('first two weeks')
    }

    function displaySecondTwoWeeks() {
        let newArray = []
        for (let i = 16; i <= daysInMonth; i++) {
            //add and format day of the week, date, month and year
            newArray.push(`${format(add(new Date(currentYear, currentMonth, i - 1), { days: 1 }), 'EEE')} ${formattedMonth} ${i}, ${formattedYear}`)
        }
        console.log(newArray)
        setDatesArray(newArray)
        return console.log('second two weeks')
    }

    useEffect(() => {
        if (currentDate <= 15) {
            displayFirstTwoWeeks()

        } else {
            displaySecondTwoWeeks()
        }
    }, [])


    return (
        <>
            <p>{datesArray && datesArray.map((date, index) => {
                return (
                    <>

                        <div id={`date-${index}`}>{date}</div>
                        <Sitename index={index} />
                        <TimeinTimeout index={index} triggerChange={triggerChange} setTriggerChange={setTriggerChange} /><p />
                    </>
                )
            })}</p>
        </>
    )
}
