import React from "react";
import { useGetMyRecordsQuery } from "../../services/myRecords";

export const MyRecords = () => {
  const {
    data: myRecordsData,
    error: myRecordsError,
    isLoading: isMyRecordsLoading,
  } = useGetMyRecordsQuery();
  const myRecordsArray = myRecordsData?.map(e=> <div> {e.country_id}</div>);
 
  

  return <div>here rec{myRecordsArray}</div>;
};
