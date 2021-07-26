import logo from './logo.svg';
import './App.css';
import FirebaseContext from './context/firebase'
// import { firebase, FieldValue } from './lib/firebase'
import { useContext, useState } from 'react'

function App() {
  const { firebase } = useContext(FirebaseContext)
  // const dataFromFirebase = firebase.firestore().collection('sites')
  const [docs, setDocs] = useState([])
  const [optionValue, setOptionValue] = useState([])

  const data = firebase.firestore().collection('sites').get()
    .then((snapshot) => {
      let documents = []
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id })
      })
      setDocs(documents)
    })


  return (
    <div className="App">
      <h1>This is a timesheet.</h1>
      <form>
        <b> Please select your site </b>
        <select id="sitename" >
          <option>--Select your site</option>
          <option></option>
          {docs && docs.map((doc) => {
            return <option>{doc.sitename}</option>

          })}
        </select>
      </form>

    </div>
  );
}

export default App;
