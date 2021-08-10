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
    }

    function displaySecondTwoWeeks() {
        let newArray = []
        for (let i = 16; i <= daysInMonth; i++) {
            //add and format day of the week, date, month and year
            newArray.push(`${format(add(new Date(currentYear, currentMonth, i - 1), { days: 1 }), 'EEE')} ${formattedMonth} ${i}, ${formattedYear}`)
        }
        console.log(newArray)
        setDatesArray(newArray)
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
            })
        await console.log('date ' + currentDate)
        await console.log('month ' + currentMonth)
        await console.log('year ' + currentYear)
        await console.log('days in the month ' + daysInMonth)
        if (statHolidays[2] !== undefined) {
            console.log(statHolidays[2].date)
            let stat = statHolidays[2].date
            let statYear = stat.substr(0, 4)
            console.log(statYear)
            let statMonth = stat.substr(5, 2)
            console.log(statMonth)
            let statDate = stat.substr(8, 2)
            console.log(statDate)
        }


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
