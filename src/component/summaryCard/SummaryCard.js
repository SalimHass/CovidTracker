import React from "react";
import Button from "react-bootstrap/Button";
import "./SummaryCard.css";

function SummaryCard(props) {
  return (
    <div className="summary-container">
      <div className="sum-card-color" />
      <div className="sum-card-container">
        <div className="sum-card-title">
          Country: {props.country.Country},{props.country.CountryCode}{" "}
        </div>
        <div className="sum-details">
          Total Confirmed Cases: {props.country.TotalConfirmed}{" "}
        </div>
        <div className="sum-details">
          Total Deathes Cases: {props.country.TotalDeaths}{" "}
        </div>
        <div className="sum-details">
          Total Recovered Cases: {props.country.TotalRecovered}{" "}
        </div>
        <div className="sum-details">Date: {props.country.Date} </div>
        <div className="btn-dash-container">
          <div className="sum-card-dashedline" />
          {props.found ? (
            <Button className="sum-card-btn" disabled>
              Already Added
            </Button>
          ) : (
            <Button
              className="sum-card-btn"
              onClick={() => props.addRecordFunc(props.country)}
            >
              Add to Record
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
