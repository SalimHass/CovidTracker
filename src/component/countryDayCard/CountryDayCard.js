import "./CountryDayCard.css"

import React from 'react'

function CountryDayCard(props) {
    const day=props.data
    console.log(props.data)
  return (
    <div className="day-card">
        <div className="day-color"/>
        <div className="day-container" >
        <div className="day-title">Date: {day.Date}</div>
        <div className="day-cases">Number of Confirmed Cases: {day.Cases}</div>
        <div className="day-dashedline"/>
        </div>
    </div>
  )
}

export default CountryDayCard