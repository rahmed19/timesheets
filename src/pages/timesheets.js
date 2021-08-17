import React, { useState, } from 'react'
import Dates from '../components/dates';
import GrabContents from '../hooks/grab-contents';

function Timesheets() {

    const [triggerChange, setTriggerChange] = useState(false)

    return (
        <>
            <div className="App">
                <h1>True Canadian Security Corp. Timesheets </h1>
                <form className="timesheet">
                    <Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} />

                    <GrabContents />

                </form>

            </div>
        </>
    );
}

export default Timesheets;
