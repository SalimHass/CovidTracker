import React, { useRef } from "react";
import SummaryCard from "../summaryCard/SummaryCard";
import { useGetSummaryQuery } from "../../services/covidRecords";
import {
  useAddCovidRecordMutation,
  useGetMyRecordsQuery,
} from "../../services/myRecords";
import "./AllCountries.css";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function AllCountries() {
  const unique_id = useRef("");
  

  getCurrentBrowserFingerPrint().then((fingerprint) => {
    // fingerprint is your unique browser id.
    // This is well tested
    unique_id.current = fingerprint;
  });

  const {
    data: summaryData,
    error: summaryError,
    isLoading: isSummaryLoading,
  } = useGetSummaryQuery();
  const [addCovidRecord, { data, isLoading: isAddLoading, error: addError }] =
    useAddCovidRecordMutation();

  const { data: myRecordsData } = useGetMyRecordsQuery();

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

  const summeryArray = summaryData?.Countries?.map((e) => {
    console.log(e);

    let isfound = myRecordsData?.find((r) => r.country_id === e.Slug);
    return (
      <SummaryCard
        country={e}
        addRecordFunc={addRecord}
        found={isfound}
        key={e.ID}
      />
    );
  });

  return (
    <div className="countries-hero">
      COVID19 Statistics For All Countries
      {summaryError && (
        <Alert variant="warning">
          Something Wrong Happened !! Please try again later.
        </Alert>
      )}
      {addError && (
        <Alert variant="warning">
          Something Wrong Happened !! Please try again later.
        </Alert>
      )}
      {isSummaryLoading || isAddLoading ? (
        <Spinner className={"loading"} animation="border" role="status" />
      ) : (
        <div className="countries-container">
          {summaryData?.Message?.length > 0 && (
            <div className="notice">{summaryData.Message}</div>
          )}
          {summeryArray}{" "}
        </div>
      )}
    </div>
  );
}

export default AllCountries;
