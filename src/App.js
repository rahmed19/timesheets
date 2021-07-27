import logo from './logo.svg';
import './App.css';
import FirebaseContext from './context/firebase'
// import { firebase, FieldValue } from './lib/firebase'
import { useContext, useState } from 'react'

function App() {

  //
  const initialOption = '--Select your site'

  const { firebase } = useContext(FirebaseContext)
  const [docs, setDocs] = useState([])
  const [optionValue, setOptionValue] = useState(initialOption)

  const data = firebase.firestore().collection('sites').get()
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
      <div className="App">
        <h1>This is a timesheet.</h1>
        <form>
          <b> Please select your site </b>
          <select id="sitename"
            onChange={handleChange}
            value={optionValue}
          >
            <option>{initialOption}</option>
            <option></option>
            {docs && docs.map((doc) => {
              return <option>{doc.sitename}</option>
            })}
          </select>
        </form>

        {optionValue}

      </div>
    </>
  );
}

export default App;
