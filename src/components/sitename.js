import React from 'react'
import FirebaseContext from '../context/firebase'
import { useContext, useState, useEffect } from 'react'


export default function Sitename({ index }) {
    const initialOption = '--Select your site'

    const { firebase, FieldValue } = useContext(FirebaseContext)
    const [docs, setDocs] = useState([])
    //const [optionValue, setOptionValue] = useState(initialOption)

    useEffect(() => {

        const fetchData = async () => {
            const data = await firebase.firestore().collection("sites").get()
                .then((snapshot) => {
                    let documents = []
                    snapshot.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    })
                    setDocs(documents)

                })
        }

        return fetchData()
    }, [])



    return (
        <>

            <select
                id={`sitename-${index}`}
                className="sitename"
            >
                <option>{initialOption}</option>
                <option></option>
                {docs && docs.map((doc) => {
                    return <option key={doc.id}>{doc.sitename}</option>
                })}
            </select>

        </>
    )
}