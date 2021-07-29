import logo from './logo.svg';
import React, { useState } from 'react'
import './App.css';
import Dates from './components/dates';

function App() {
  const [totalHours, setTotalhours] = useState(null)

  function handleClick() {
    console.log('button clicked')
    let sumOfHours = []
    for (let i = 0; i <= 15; i++) {
      let totalInput = document.getElementById(i)
      sumOfHours.push(parseInt(totalInput.value))
      totalInput && console.log(totalInput.value)
    }

    console.log(sumOfHours)

  }

  return (
    <>
      <div className="App">
        <h1>True Canadian Security Corp. Payroll Log</h1>
        <form className="timesheet">
          <Dates />

        </form>
      </div>
      <button onClick={() => handleClick()}>Button for {totalHours}</button>
    </>
  );
}

export default App;
