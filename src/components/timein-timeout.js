import React, { useState, useEffect } from 'react'


function TimeinTimeout({
    //index number to appropriate scalable input ID
    index,
    triggerChange,
    setTriggerChange
}) {



    const [timeIn, setTimeIn] = useState('')
    const [timeOut, setTimeOut] = useState('')
    const [hoursWorked, setHoursWorked] = useState(0)


    function handleTimeInChange(e) {
        if ((/[a-zA-Z]/).test(e.target.value) === false) {
            // setTimeIn(e.target.value)
        }

    }

    function handleTimeOutChange(e) {
        if ((/[a-zA-Z]/).test(e.target.value) === false) {
            //  setTimeOut(e.target.value)
        }

    }

    function handleTotalTimeChange(e) {

        // if ((/[a-zA-Z]/).test(e.target.value) === false) {

        //     setHoursWorked(e.target.value)
        // }
        setTriggerChange(!triggerChange)
    }

    return (
        <>
            <input
                id={`signIn-${index}`}
                aria-label="Enter your time in"
                type="text"
                maxLength="4"
            //   onChange={handleTimeInChange}
            // value={timeIn}
            />
            <input
                id={`signOut-${index}`}
                aria-label="Enter your time out"
                type="text"
                maxLength="4"
            // onChange={handleTimeOutChange}
            // value={timeOut}
            />
            <input
                //index number to appropriate scalable input ID
                id={`hoursWorked-${index}`}
                aria-label="Enter your total time worked"
                type="number"
                max="24"
                onChange={handleTotalTimeChange}
            // value={hoursWorked === 0 ? '' : hoursWorked}
            />
        </>
    )
}

export default TimeinTimeout