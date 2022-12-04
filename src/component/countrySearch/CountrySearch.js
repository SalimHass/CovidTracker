import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {useLazyGetCountryDetailQuery} from "../../services/covidRecords";
import Spinner from "react-bootstrap/Spinner";
import {useNavigate} from "react-router";


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
        if (validDate) {
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
        {isCountryDataLoading ? <Spinner className={"loading"} animation="border" role="status"/> :
            countryData ? JSON.stringify(countryData) : <>nodata</>}

    </>;
}

export default CountrySearch;