import React, { forwardRef } from 'react'

const TailwindInput = forwardRef ((type, ref) => {
    
    return (
        <input className="bg-blue-500 text-white font-medium mx-4 my-4 rounded" type={type} ref={ref} >
        </input>
    )
})

export default TailwindInput
