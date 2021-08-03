import logo from './logo.svg';
import React, { useState } from 'react'
import './App.css';
import Dates from './components/dates';
import TotalHours from './components/total-hours';

function App() {
  const [totalHours, setTotalhours] = useState(0)



  function handleClick() {
    console.log('button clicked')
    // retrieve hours from sheet by using index ID
    let sumOfHours = []
    for (let i = 0; i <= 15; i++) {
      let totalInput = document.getElementById(i)
      totalInput && sumOfHours.push(parseInt(totalInput.value))
    }

    let total = 0
    for (var i in sumOfHours) {
      //check to see if value in total hours is a number
      if (isNaN(sumOfHours[i]) === false) {
        total += sumOfHours[i]
      }
    }

    setTotalhours(total)
    console.log(total)
    total = 0

  }

  return (
    <>
      <div className="App">
        <h1>True Canadian Security Corp. Payroll Log</h1>
        <form className="timesheet">
          <Dates />
          <TotalHours />
        </form>
      </div>
      <button onClick={() => handleClick()}>Button for {totalHours}</button>
    </>
  );
}

export default App;
