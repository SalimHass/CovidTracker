import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {useLazyGetCountryDetailQuery} from "../../services/covidRecords";
import Spinner from "react-bootstrap/Spinner";
import {useNavigate} from "react-router";
import CountryDayCard from "../countryDayCard/CountryDayCard";
import "./CountrySearch.css"

function CountrySearch(props) {
    const navigate = useNavigate();
    const todayDate = new Date().toISOString().slice(0, 10);
    const yesterdayDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const [validDate, setValidDate] = useState(true)
    const [
        trigger,
        {
            data: countryData,
            error: CountryDataError,
            isLoading: isCountryDataLoading,
        },
    ] = useLazyGetCountryDetailQuery();

    function handleDetailSubmit(e) {
        e.preventDefault();
        let toDate = new Date(e.target["to"].value);
        setValidDate(toDate > new Date(e.target["from"].value))
        if (toDate > new Date(e.target["from"].value)) {
            trigger({
                name: e.target["country"].value,
                start: new Date(e.target["from"].value).toISOString().split(".")[0],
                end: toDate.toISOString().split(".")[0],
            });
        }
    }

    if (CountryDataError) {
        navigate('/errorPage', {state: CountryDataError})
    }

    const dayCards= countryData?.map(e=> <CountryDayCard data={e}/> ) 

    return <>
        <form className="select-form" onSubmit={handleDetailSubmit}>
            <Form.Select aria-label="Default select example" id="country">
                {props.countryArray}
            </Form.Select>

            <Form.Control
                required
                id="from"
                type="date"
                placeholder="from date"
                isInvalid={!validDate}
                defaultValue={yesterdayDate}
                max={yesterdayDate}

            />

            <Form.Control
                required
                id="to"
                type="date"
                name="duedate"
                placeholder="to date"
                max={todayDate}
                defaultValue={todayDate}
                isInvalid={!validDate}
            />
            <Button type={"submit"} className="sbtn">Search</Button>
        </form>
        <div className="days-cards">

        {isCountryDataLoading ? <Spinner className={"loading"} animation="border" role="status"/> :
            countryData ? dayCards : <></>}
        </div>

    </>;
}

export default CountrySearch;