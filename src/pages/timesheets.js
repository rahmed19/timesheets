import React, { useState, } from 'react'
import Dates from '../components/dates';
import GrabContents from '../hooks/grab-contents';
import { useAuth } from '../context/auth-context';
import { Link } from 'react-router-dom'


function Timesheets() {

    const [triggerChange, setTriggerChange] = useState(false)
    const { logout, currentUser } = useAuth()
    console.log(currentUser)

    return (
        <>
            <div className="App">
                <h1>True Canadian Security Corp. Timesheets </h1>
                <form className="timesheet">
                    <Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} />

                    <GrabContents />

                </form>
                <Link to="/login" onClick={() => logout()}>Log Out</Link>
            </div>
        </>
    );
}

export default Timesheets;
