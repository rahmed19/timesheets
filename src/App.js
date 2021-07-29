import logo from './logo.svg';
import './App.css';
import Dates from './components/dates';

function App() {

  let totalInput = document.getElementById(0)
  totalInput && console.log(totalInput.value)

  return (
    <>
      <div className="App">
        <h1>True Canadian Security Corp. Payroll Log</h1>
        <form className="timesheet">
          <Dates />

        </form>
      </div>
      <button onClick={() => { }}>Button for {totalInput && totalInput.value}</button>
    </>
  );
}

export default App;
