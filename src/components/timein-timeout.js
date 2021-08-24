import React from 'react'


function TimeinTimeout({
    //index number to appropriate scalable input ID
    index,
    triggerChange,
    setTriggerChange
}) {



    return (
        <>
            <input
                id={`signIn-${index}`}
                aria-label="Enter your time in"
                type="text"
                maxLength="4"

            />
            <input
                id={`signOut-${index}`}
                aria-label="Enter your time out"
                type="text"
                maxLength="4"

            />
            <input
                //index number to appropriate scalable input ID
                id={`hoursWorked-${index}`}
                aria-label="Enter your total time worked"
                type="number"
                max="24"
                onChange={() => setTriggerChange(!triggerChange)}

            />
        </>
    )
}

export default TimeinTimeout