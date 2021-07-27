import React from 'react'
import FirebaseContext from '../context/firebase'
import { useContext, useState } from 'react'


export default function Sitename() {
    const initialOption = '--Select your site'

    const { firebase } = useContext(FirebaseContext)
    const [docs, setDocs] = useState([])
    const [optionValue, setOptionValue] = useState(initialOption)

    const data = firebase.firestore().collection("sites").get()
        .then((snapshot) => {
            let documents = []
            snapshot.forEach((doc) => {
                documents.push({ ...doc.data(), id: doc.id })
            })
            setDocs(documents)
        })

    function handleChange(e) {
        setOptionValue(e.target.value)

    }
    return (
        <>

            <select
                className="sitename"
                onChange={handleChange}
                value={optionValue}
            >
                <option>{initialOption}</option>
                <option></option>
                {docs && docs.map((doc) => {
                    return <option key={doc.id}>{doc.sitename}</option>
                })}
            </select>
            <br />

        </>
    )
}