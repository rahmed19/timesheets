import React, { forwardRef } from "react"

const TailwindInput = forwardRef((props, ref) => {
	return (
		<input
			className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			type={props.type}
			ref={ref}
			id={props.id}
			placeholder={props.placeholder}
			required={props.required}
			defaultValue={props.defaultValue}
		></input>
	)
})

export default TailwindInput
