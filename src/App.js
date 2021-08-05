import logo from './logo.svg';
import React, { useState, useContext } from 'react'
import FirebaseContext from './context/firebase'
import './App.css';
import Dates from './components/dates';
import TotalHours from './components/total-hours';
import GrabContents from './hooks/grab-contents';

function App() {
  const { firebase } = useContext(FirebaseContext)

  const [triggerChange, setTriggerChange] = useState(false)
  const [allContents, setAllContents] = useState({})

  function handleSubmit() {
    console.log(allContents)
    firebase.firestore().collection("new").doc('alsoNew').set({
      name: "bismiAllah"
    })
  }

  return (
    <>
      <div className="App">
        <h1>True Canadian Security Corp. Payroll Log</h1>
        <form className="timesheet">
          <Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} />
          <TotalHours triggerChange={triggerChange} />
          <GrabContents allContents={allContents} setAllContents={setAllContents} triggerChange={triggerChange} />

        </form>

        <button onClick={handleSubmit}>Submit Data</button>
      </div>
    </>
  );
}

export default App;
