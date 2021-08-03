import logo from './logo.svg';
import React, { useState } from 'react'
import './App.css';
import Dates from './components/dates';
import TotalHours from './components/total-hours';

function App() {
  const [triggerChange, setTriggerChange] = useState(false)

  return (
    <>
      <div className="App">
        <h1>True Canadian Security Corp. Payroll Log</h1>
        <form className="timesheet">
          <Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} />
          <TotalHours triggerChange={triggerChange} />
        </form>
      </div>
    </>
  );
}

export default App;
