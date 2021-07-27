import React from 'react'

export default function Sitename(
    { handleChange,
        optionValue,
        docs,
        initialOption }) {
    return (
        <>
            <form className="timesheet">
                <b> Please select your site </b>
                <select
                    id="sitename1"
                    className="sitename"
                    onChange={handleChange}
                    value={optionValue}
                >
                    <option>{initialOption}</option>
                    <option></option>
                    {docs && docs.map((doc) => {
                        return <option>{doc.sitename}</option>
                    })}
                </select>
                <br />
            </form>
        </>
    )
}