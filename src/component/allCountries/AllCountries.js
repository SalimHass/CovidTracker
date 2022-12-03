import React from "react";
import SummaryCard from '../summaryCard/SummaryCard'
import {useGetSummaryQuery} from "../../services/covidRecords";
import {useAddCovidRecordMutation} from "../../services/myRecords";
import "./AllCountries.css"
import Button from "react-bootstrap/Button";

function AllCountries() {
    const {
        data: summaryData,
        error: summaryError,
        isLoading: isSummaryLoading,
    } = useGetSummaryQuery();

    async function addRecord(record) {
        await addCovidRecord({
            unique_id: "1234",
            country_id: record.Country,
            total_confirmed_cases: record.TotalConfirmed,
            total_deaths_cases: record.TotalDeaths,
            total_recovered_cases: record.TotalRecovered,
            date: record.Date,
        });

    }

    const [addCovidRecord, {data, isLoading, error}] = useAddCovidRecordMutation()
    const summeryArray = summaryData?.Countries.map(e => (
        <SummaryCard country={e} addRecordFunc={addRecord} key={e.ID}/>
    ))
    return (
        <div className="countries-hero">
            COVID19 Statisitcs For All Countries

        <div className="countries-container">{summeryArray} </div>
        </div>
    )

}

export default AllCountries;
