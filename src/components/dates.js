import React, { useState, useEffect } from 'react'
import { addDays, getMonth, getDate, setDate } from 'date-fns'
import Sitename from '../components/sitename'
import TimeinTimeout from '../components/timein-timeout';

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
            <h1>Current<p>{datesArray && datesArray.map((date, index) => {
                return (
                    <>
                        <h1 key={index}>{date}</h1>
                        <Sitename />
                        <TimeinTimeout />
                    </>
                )
            })}</p></h1>
        </>
    )
}
