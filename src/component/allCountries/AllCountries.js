import React from "react";
import SummaryCard from '../summaryCard/SummaryCard'
import { useGetSummaryQuery } from "../../services/covidRecords";
function AllCountries() {
  const {
    data: summaryData,
    error: summaryError,
    isLoading: isSummaryLoading,
  } = useGetSummaryQuery();
  const summeryArray= summaryData?.Countries.map(e=> (
    <SummaryCard country = {e} key={e.ID}/>
  ))
  return <div>{summeryArray}</div>;
}

export default AllCountries;
