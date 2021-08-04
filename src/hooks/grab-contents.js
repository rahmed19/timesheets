import React from 'react'

export default function GrabContents() {

    let allContentsArray = []
    for (let i = 0; i < 15; i++) {
        let contents = document.getElementById(`date-${i}`)
        //contents && console.log('dates -', contents.value)

        contents && allContentsArray.push(contents.value)
        console.log(allContentsArray)
    }

    return (
        <>

        </>
    )
}

