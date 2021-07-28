import logo from './logo.svg';
import './App.css';
import Sitename from './components/sitename'
import Shifts from './components/shifts'
import TimeinTimeout from './components/timein-timeout';

function App() {


  return (
    <>
      <div className="App">
        <h1>True Canadian Security Corp. Payroll Log</h1>
        <form className="timesheet">
          <Sitename />
          <Shifts />
          <TimeinTimeout />
          <Sitename />
          <Sitename />
        </form>
      </div>
    </>
  );
}

export default App;
