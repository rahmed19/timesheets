import React from 'react'

export default function GrabContents() {

    let allDatesArray = []
    for (let i = 0; i < 15; i++) {
        let dateContents = document.getElementById(`date-${i}`)
        dateContents && console.log('dates -', dateContents.value)

        dateContents && allDatesArray.push(dateContents.value)
        //console.log(allDatesArray)
    }

    return (
        <>

        </>
    )
}

