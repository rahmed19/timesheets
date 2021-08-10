import React, { useState, useEffect } from 'react'
import { getDaysInMonth, getDate, getMonth, getYear, add, format } from 'date-fns'
import Sitename from '../components/sitename'
import TimeinTimeout from '../components/timein-timeout';
import TotalHours from '../components/total-hours';

export default function Dates({ triggerChange, setTriggerChange }) {
    const currentDate = getDate(Date.now())
    const currentMonth = getMonth(Date.now())
    const currentYear = getYear(Date.now())
    const daysInMonth = getDaysInMonth(Date.now())
    const formattedMonth = format(Date.now(), 'MMM')
    const formattedYear = format(Date.now(), 'yyyy')


    const [datesArray, setDatesArray] = useState([])
    const [statHolidays, setStatHolidays] = useState([])

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

    //get info on stat holidays
    async function handleHolidays() {
        await fetch('https://canada-holidays.ca/api/v1/provinces/BC')
            .then(response => response.json())
            .then(data => {
                setStatHolidays(data.province.holidays)

                statHolidays && console.log(statHolidays[1].date)
            })
    }

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
            <TotalHours triggerChange={triggerChange} />
            <button onClick={handleHolidays}>Fetch Holidays</button>
        </>
    )
}
