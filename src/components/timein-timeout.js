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
			<div className='mb-4'>
				<div className='grid grid-cols-3'>
					<div className='px-1'>
						<TailwindInput id={`signIn-${index}`} type='text' maxLength='4' />
					</div>
					<div className='px-1'>
						<TailwindInput id={`signOut-${index}`} type='text' maxLength='4' />
					</div>
					<div className='px-1'>
						<TailwindInput
							//index number to appropriate scalable input ID

							id={`hoursWorked-${index}`}
							type='number'
							max='24'
							onChange={() => setTriggerChange(!triggerChange)}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default TimeinTimeout
