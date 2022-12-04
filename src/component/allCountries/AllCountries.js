import React, {useRef} from "react";
import SummaryCard from '../summaryCard/SummaryCard'
import {useGetSummaryQuery} from "../../services/covidRecords";
import {useAddCovidRecordMutation, useGetMyRecordsQuery} from "../../services/myRecords";
import "./AllCountries.css"
import {useNavigate} from "react-router";
import {getCurrentBrowserFingerPrint} from "@rajesh896/broprint.js";
import Spinner from "react-bootstrap/Spinner";

function AllCountries() {
    const unique_id = useRef("")
    const navigate = useNavigate();

    getCurrentBrowserFingerPrint().then((fingerprint) => {
        // fingerprint is your unique browser id.
        // This is well tested
        unique_id.current = fingerprint
    })

    const {
        data: summaryData,
        error: summaryError,
        isLoading: isSummaryLoading,
    } = useGetSummaryQuery();
    const [addCovidRecord, {data, isLoading: isAddLoading, error: addError}] = useAddCovidRecordMutation()

    const {
        data: myRecordsData,
    } = useGetMyRecordsQuery();

    async function addRecord(record) {
        await addCovidRecord({
            unique_id: unique_id.current,
            country_id: record.Slug,
            country_name: record.Country,
            total_confirmed_cases: record.TotalConfirmed,
            total_deaths_cases: record.TotalDeaths,
            total_recovered_cases: record.TotalRecovered,
            date: record.Date,
        });

    }

    if (summaryError) {
        navigate('/errorPage', {state: summaryError})
    } else if (addError) {
        navigate('/errorPage', {state: addError})
    }

    const summeryArray = summaryData?.Countries.map(e => {
        
        let isfound = myRecordsData.find(r => r.country_id === e.Slug) 
        return <SummaryCard country={e} addRecordFunc={addRecord} found={isfound} key={e.ID}/> }
    )

    return (
        <div className="countries-hero">
            COVID19 Statistics For All Countries
            {isSummaryLoading || isAddLoading ? <Spinner className={"loading"} animation="border" role="status"/> :
                <div className="countries-container">
                    {data?.Message?.length > 0 && <>data.message</>}
                    {summeryArray} </div>}

        </div>
    )

}

export default AllCountries;
