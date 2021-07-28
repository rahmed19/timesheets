import React, { useState } from 'react'

function TimeinTimeout() {
    const [timeIn, setTimeIn] = useState('')
    const [timeOut, setTimeOut] = useState('')

    return (
        <>
            <input
                aria-label="Enter your time in"
                type="text"
                onChange={({ target }) => setTimeIn(target.value)}
                value={timeIn}
            />
            <input
                aria-label="Enter your time out"
                type="text"
                onChange={({ target }) => setTimeOut(target.value)}
                value={timeOut}
            />
            {console.log(((Number(timeOut) - Number(timeIn)) / 100).toFixed(2))}
        </>
    )
}

export default TimeinTimeout