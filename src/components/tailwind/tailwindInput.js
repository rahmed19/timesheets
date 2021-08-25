import React, { forwardRef } from 'react'

const TailwindInput = forwardRef ((props, ref) => {
    
    return (
        <input className="bg-blue-500 text-white font-medium mx-4 my-4 rounded" type={props.type} ref={ref} required={props.required} >
        </input>
    )
})

export default TailwindInput
