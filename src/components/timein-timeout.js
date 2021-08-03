import React, { useState } from 'react'


function TimeinTimeout({
    //index number to appropriate scalable input ID
    index,
    triggerChange,
    setTriggerChange
}) {

    const [timeIn, setTimeIn] = useState('')
    const [timeOut, setTimeOut] = useState('')
    const [totalTime, setTotalTime] = useState(0)


    function handleTimeInChange(e) {
        if ((/[a-zA-Z]/).test(e.target.value) === false) {
            setTimeIn(e.target.value)
        }

    }

    function handleTimeOutChange(e) {
        if ((/[a-zA-Z]/).test(e.target.value) === false) {
            setTimeOut(e.target.value)
        }

    }

    function handleTotalTimeChange(e) {

        if ((/[a-zA-Z]/).test(e.target.value) === false) {

            setTotalTime(e.target.value)
        }
        setTriggerChange(!triggerChange)
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
            <input
                //index number to appropriate scalable input ID
                id={index}
                aria-label="Enter your total time worked"
                type="number"
                max="24"
                onChange={handleTotalTimeChange}
                value={totalTime === 0 ? '' : totalTime}
            />
            {console.log(((Number(timeOut) - Number(timeIn)) / 100).toFixed(2))}
        </>
    )
}

export default TimeinTimeout