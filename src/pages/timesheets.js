import React, { useState, } from 'react'
import Dates from '../components/dates';
import TotalHours from '../components/total-hours';
import GrabContents from '../hooks/grab-contents';

function Timesheets() {

    const [triggerChange, setTriggerChange] = useState(false)
    const [allContents, setAllContents] = useState({})

    return (
        <>
            <div className="App">
                <h1>True Canadian Security Corp. Timesheets </h1>
                <form className="timesheet">
                    <Dates triggerChange={triggerChange} setTriggerChange={setTriggerChange} />
                    <TotalHours triggerChange={triggerChange} />
                    <GrabContents allContents={allContents} setAllContents={setAllContents} triggerChange={triggerChange} />
                </form>


            </div>
        </>
    );
}

export default Timesheets;
