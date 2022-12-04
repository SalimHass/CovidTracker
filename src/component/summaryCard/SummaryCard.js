import React from 'react'
import Button from "react-bootstrap/Button";

function SummaryCard(props) {
    return (

            <div className='summary-container'>
                <div>Country: {props.country.Country},{props.country.CountryCode} </div>
                <div>Total Confirmed Cases: {props.country.TotalConfirmed} </div>
                <div>Total Deathes Cases: {props.country.TotalDeaths} </div>
                <div>Total Recovered Cases: {props.country.TotalRecovered} </div>
                <div>Date: {props.country.Date} </div>
                <Button onClick={() => props.addRecordFunc(props.country)}>
                    Add to Record
                </Button>
            </div>

    )
}

export default SummaryCard