import React, { useState } from "react"

const TablesForm = () => {
	const [allData, setAllData] = useState([
		{
			date: "",
			siteName: "",
			signIn: "",
			signOut: "",
			hoursWorked: "",
		},
	])

	const handleAddRow = index => {
		const list = [...allData]
		list.splice(index, 0, {
			date: "",
			siteName: "",
			signIn: "",
			signOut: "",
			hoursWorked: "",
		})
		setAllData(list)
		// setAllData([
		// 	...allData,
		// 	{
		// 		date: "",
		// 		siteName: "",
		// 		signIn: "",
		// 		signOut: "",
		// 		hoursWorked: "",
		// 	},
		// ])
	}

	const handleRemoveRow = index => {
		const list = [...allData]
		list.splice(index, 1)
		setAllData(list)
	}

	const handleInputChange = (e, index) => {
		const { name, value } = e.target
		const list = [...allData]
		list[index][name] = value
		setAllData(list)
	}

	return (
		<>
			<div>
				{allData.map((data, index) => {
					return (
						<div>
							<input
								type='text'
								name='date'
								placeholder=''
								value={data.date}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
							/>
							<input
								type='text'
								name='siteName'
								placeholder=''
								value={data.siteName}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
							/>
							<input
								type='text'
								name='signIn'
								placeholder=''
								value={data.signIn}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
							/>
							<input
								type='text'
								name='signOut'
								placeholder=''
								value={data.signOut}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
							/>
							<input
								type='text'
								name='hoursWorked'
								placeholder=''
								value={data.hoursWorked}
								className='border bg-gray-300 ml-3'
								onChange={e => handleInputChange(e, index)}
							/>
							<button onClick={handleAddRow} className='ml-3'>
								Add Row
							</button>
							<button onClick={() => handleRemoveRow(index)} className='ml-3'>
								Remove Row
							</button>
						</div>
					)
				})}
			</div>
			<br />
		</>
	)
}

export default TablesForm
