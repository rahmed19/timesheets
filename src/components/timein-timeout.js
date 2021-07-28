import React, { useState } from 'react'

function TimeinTimeout() {
    const [timeIn, setTimeIn] = useState('')
    const [timeOut, setTimeOut] = useState('')

    return (
        <>
            <input
                aria-label="Enter your time in"
                type="time"
                onChange={({ target }) => setTimeIn(target.value)}
                value={timeIn}
            />
            <input
                aria-label="Enter your time out"
                type="time"
                onChange={({ target }) => setTimeOut(target.value)}
                value={timeOut}
            />
            {console.log(((Number(timeIn) - Number(timeOut)) / 100).toFixed(2))}
        </>
    )
}

export default TimeinTimeout