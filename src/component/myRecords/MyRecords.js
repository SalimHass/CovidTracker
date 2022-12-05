import React from "react";
import {useDeleteCovidRecordMutation, useGetMyRecordsQuery} from "../../services/myRecords";
import MyRecordCard from "../myRecordCard/MyRecordCard";
import Spinner from 'react-bootstrap/Spinner';
import {useNavigate} from "react-router";
import "./MyRecords.css"

export const MyRecords = () => {
    const navigate = useNavigate();
    const {
        data: myRecordsData,
        error: myRecordsError,
        isLoading: isMyRecordsLoading,
    } = useGetMyRecordsQuery();

    function deleteRecord(record) {
        deleteCovidRecord(record.id);
    }

    const [deleteCovidRecord, {data, isLoading: isDeleteLoading, error: deleteError}] = useDeleteCovidRecordMutation()
    const myRecordsArray = myRecordsData?.map(e => (
        <MyRecordCard record={e} removeRecordFunc={deleteRecord} key={e.ID}/>
    ))

    if(deleteError) {
        navigate('/errorPage', { state: deleteError })
    } else  if(myRecordsError) {
        navigate('/errorPage', { state: myRecordsError })
    }

    return (
        <div className="rec-hero">
            
            {isMyRecordsLoading || isDeleteLoading ?
                <Spinner className={"loading"} animation="border" role="status"/>
                :
                <>
                    {myRecordsArray.length>0? <div className="rec-main-title"> COVID19 Statistics For All Countries</div>:<></> }
                <div className="rec-cards-container">
                    {myRecordsArray.length>0? myRecordsArray : <div className="no-recs">No Available Records</div> } 
                
                </div></>}
        </div>


    )
};
