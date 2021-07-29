import logo from './logo.svg';
import './App.css';
import Sitename from './components/sitename'
import TimeinTimeout from './components/timein-timeout';
import Dates from './components/dates';

function App() {


  return (
    <>
      <div className="App">
        <h1>True Canadian Security Corp. Payroll Log</h1>
        <form className="timesheet">
          <Sitename />
          <TimeinTimeout />
          <Dates />
        </form>
      </div>
    </>
  );
}

export default App;
