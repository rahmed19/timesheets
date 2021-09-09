import React, { useState } from "react"

const Tables = () => {
	const [data, setData] = useState({
		date: "",
		siteName: "",
		signIn: "",
		signOut: "",
		hoursWorked: "",
	})

	return (
		//div 1
		<div>
			<input
				type='text'
				name='date'
				placeholder=''
				value={data.date}
				className='m-2'
				//onChange={ }
			/>
		</div>
	)
}

export default Tables
