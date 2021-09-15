import React from "react"
import FirebaseContext from "../context/firebase"
import { useContext, useState, useEffect } from "react"

export default function Sitename(sites) {
	//const initialOption = "--Select your site"

	const { firebase } = useContext(FirebaseContext)
	const [docs, setDocs] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await firebase
				.firestore()
				.collection(sites)
				.get()
				.then(snapshot => {
					let documents = []
					snapshot.forEach(doc => {
						documents.push({ ...doc.data(), id: doc.id })
					})
					setDocs(documents)
				})
		}

		return () => fetchData()
		console.log(docs)
	}, [sites])

	return { docs }

	// return (
	// 	<>
	// 		<select
	// 			id={`sitename-${index}`}
	// 			onChange={console.log(docs)}
	// 			//className='font-semibold shadow md:appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500'
	// 		>
	// 			<option>{initialOption}</option>
	// 			<option></option>
	// 			{docs &&
	// 				docs.map(doc => {
	// 					return <option key={doc.id}>{doc.sitename}</option>
	// 				})}
	// 		</select>
	// 	</>
	// )
}
