import logo from './logo.svg';
import React, { useState, useContext } from 'react'
import './App.css';
import Dates from './components/dates';
import TotalHours from './components/total-hours';
import GrabContents from './hooks/grab-contents';

function App() {

  const [triggerChange, setTriggerChange] = useState(false)
  const [allContents, setAllContents] = useState({})



  return (
    <>
      <div className="App">
        <h1>True Canadian Security Corp. Payroll Log</h1>
        <form className="timesheet">
          <Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} />
          <TotalHours triggerChange={triggerChange} />
          <GrabContents allContents={allContents} setAllContents={setAllContents} triggerChange={triggerChange} />

        </form>


      </div>
    </>
  );
}

export default App;
