import React, { useEffect } from 'react'
import FirebaseContext from '../context/firebase'
import { useContext, useState } from 'react'


export default function Shifts() {
    const initialOption = '--Select your shift'

    const { firebase } = useContext(FirebaseContext)
    const [docs, setDocs] = useState([])
    const [optionValue, setOptionValue] = useState(initialOption)

    useEffect(() => {
        const data = firebase.firestore().collection("shifts").get()
            .then((snapshot) => {
                let documents = []
                snapshot.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                })
                setDocs(documents)
                console.log('ran shifts' + docs)
            })
        return () => data()
    }, [])



    function handleChange(e) {
        setOptionValue(e.target.value)

    }

    return (
        <>

            <select
                className="shiftname"
                onChange={handleChange}
                value={optionValue}
            >
                <option>{initialOption}</option>
                <option></option>
                {docs && docs.map((doc) => {
                    return <option key={doc.id}>{doc.shifttime}</option>
                })}
                {console.log(docs)}
            </select>
            <br />

        </>
    )
}