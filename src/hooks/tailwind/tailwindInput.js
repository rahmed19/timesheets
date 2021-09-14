import React, { forwardRef } from "react"

const TailwindInput = forwardRef((props, ref) => {
	return (
		<input
			className={`
			text-${props.textAlign}
			font-semibold shadow
			appearance-none
			border
			rounded
			w-full
			py-2
			px-3
			w-24
			mt-2
			md:mt-0
			text-gray-700
			leading-tight
			focus:outline-none
			focus:border-gray-500
			`}
			disabled={props.disabled}
			type={props.type}
			ref={ref}
			id={props.id}
			placeholder={props.placeholder}
			required={props.required}
			defaultValue={props.defaultValue}
			maxLength={props.maxLength}
			onChange={props.onChange}
			value={props.value}
		></input>
	)
})

export default TailwindInput
