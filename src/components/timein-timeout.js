import React from "react"
import TailwindInput from "../hooks/tailwind/tailwindInput"

function TimeinTimeout({
	//index number to appropriate scalable input ID
	index,
	triggerChange,
	setTriggerChange,
}) {
	return (
		<>
			<div className='flex flex-wrap items-center justify-between'>
				<div></div>
				<div className='w-full max-w-md content-center'>
					<div className='mb-2'>
						<TailwindInput id={`signIn-${index}`} type='text' maxLength='4' />
					</div>
					<div className='mb-2'>
						<TailwindInput id={`signOut-${index}`} type='text' maxLength='4' />
					</div>
					<div className='mb-2'>
						<TailwindInput
							//index number to appropriate scalable input ID

							id={`hoursWorked-${index}`}
							type='number'
							max='24'
							onChange={() => setTriggerChange(!triggerChange)}
						/>
					</div>

					{/* <input
				//index number to appropriate scalable input ID
				className='bg-blue-500 text-white font-medium mx-4 my-4 rounded'
				id={`hoursWorked-${index}`}
				aria-label='Enter your total time worked'
				type='number'
				max='24'
				onChange={() => setTriggerChange(!triggerChange)}
			/> */}
				</div>
				<div></div>
			</div>
		</>
	)
}

export default TimeinTimeout
