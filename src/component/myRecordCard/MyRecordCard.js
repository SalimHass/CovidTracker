import React from 'react'
import Button from "react-bootstrap/Button";
import "./MyRecordCard.css"

function MyRecordCard(props) {
    return (
        <div className='rec-card' >
            <div className='rec-color'/>
            <div className='rec-container'>

            <div className='rec-title'>Country: {props.record.country_name} </div>
            <div className='rec-date'>Date: {props.record.date} </div>
            <div className='rec-card-dashedline' />
            <Button className='del-btn' onClick={() => props.removeRecordFunc(props.record)}>Delete</Button>
            </div>
        </div>
    )
}

export default MyRecordCard