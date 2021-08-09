import React from 'react'
import FirebaseContext from '../context/firebase'
import { useContext, useState, useEffect } from 'react'


export default function Sitename({ index }) {
    const initialOption = '--Select your site'

    const { firebase } = useContext(FirebaseContext)
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
        // setTimeout(() => {
        //     const fetchSites = async () => {
        //         const getSubmittedSites = await firebase.firestore().collection('0002').doc('172021')
        //         const doc = await getSubmittedSites.get()
        //         if (!doc.exists) {
        //             console.log('no such document')
        //         } else {
        //             for (let i = 0; i < 15; i++) {

        //                 //sitename
        //                 let sitenameContents = document.getElementById(`sitename-${i}`)
        //                 sitenameContents.value = doc.data().siteName[i]

        //             }

        //         }
        //     }
        //     return fetchSites()
        // }, 1000)

        return fetchData()
    }, [])


    // function handleChange(e) {
    //     setOptionValue(e.target.value)

    // }
    return (
        <>

            <select
                id={`sitename-${index}`}
                className="sitename"
            // onChange={handleChange}
            //value={optionValue}

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