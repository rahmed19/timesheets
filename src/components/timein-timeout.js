import React, { useState } from 'react'

function TimeinTimeout() {
    const [timeIn, setTimeIn] = useState('')
    const [timeOut, setTimeOut] = useState('')

    function handleTimeInChange(e) {
        if ((/[a-zA-Z]/).test(e.target.value) === false) {
            setTimeIn(e.target.value)
        }

    }

    function handleTimeOutChange(e) {
        if ((/[a-zA-Z]/).test(e.target.value) === false) {
            setTimeOut(e.target.value)
        } else
            setTimeOut('')

    }

    return (
        <>
            <input
                aria-label="Enter your time in"
                type="text"
                maxLength="4"
                onChange={handleTimeInChange}
                value={timeIn}
            />
            <input
                aria-label="Enter your time out"
                type="text"
                maxLength="4"
                onChange={handleTimeOutChange}
                value={timeOut}
            />
            {console.log(((Number(timeOut) - Number(timeIn)) / 100).toFixed(2))}
        </>
    )
}

export default TimeinTimeout