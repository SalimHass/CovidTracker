import React from "react";
import {
    useGetWorldTotalQuery,
    useGetCountryListQuery,
} from "../../services/covidRecords";
import "./Home.css";
import CountrySearch from "../countrySearch/CountrySearch";
import Spinner from "react-bootstrap/Spinner";
import {useNavigate} from "react-router";

function Home() {
    const navigate = useNavigate();
    const {
        data: totalData,
        error: totalError,
        isLoading: isTotalLoading,
    } = useGetWorldTotalQuery();
    const {
        data: countryListData,
        error: countryListError,
        isLoading: isCountryListLoading,
    } = useGetCountryListQuery();



    if (countryListError) {
        navigate('/errorPage', {state: countryListError})
    } else if (totalError) {
        navigate('/errorPage', {state: totalError})
    }

    const countryArray = countryListData?.map((e) => (
        <option value={e.Slug} key={e.Slug}>
            {e.Country}
        </option>
    ));

    const totalCovidArr = (
        <div className="total-container">
            {isCountryListLoading || isTotalLoading ?
                <Spinner className={"loading"} animation="border" role="status"/> :
                <>
                    <div className="total-card">
                        TotalConfirmed: {totalData?.TotalConfirmed}
                    </div>
                    <div className="total-card">TotalDeaths: {totalData?.TotalDeaths}</div>
                    <div className="total-card">
                        TotalRecovered: {totalData?.TotalRecovered}
                    </div>
                </>
            }
        </div>
    );

    return (
        <div className="home-hero">
            <div className="total-title">World Total Statistics</div>

            {totalCovidArr}
            <div className="form-title">Get Statistics for a specific country</div>
            <CountrySearch countryArray={countryArray}/>
        </div>
    );
}

export default Home;
