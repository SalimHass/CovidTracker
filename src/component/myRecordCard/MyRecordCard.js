import React from 'react'
import Button from "react-bootstrap/Button";

function MyRecordCard(props) {
    return (
        <div className='record-container'>
            <div>Country: {props.record.country_name} </div>
            <div>Total Confirmed Cases: {props.record.total_confirmed_cases} </div>
            <div>Date: {props.record.date} </div>
            <Button onClick={() => props.removeRecordFunc(props.record)}>Delete Record</Button>
        </div>
    )
}

export default MyRecordCard