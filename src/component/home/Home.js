import React from "react";
import {
  useGetWorldTotalQuery,
  useLazyGetCountryDetailQuery,
  useGetCountryListQuery,
} from "../../services/covidRecords";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Home.css";

function Home() {
  const {
    data: totalData,
    error: totalError,
    isLoading: isTotalLoading,
  } = useGetWorldTotalQuery();
  const [
    trigger,
    {
      data: countryData,
      error: CountryDataError,
      isLoading: isCountryDataLoading,
    },
  ] = useLazyGetCountryDetailQuery();
 

  async function handleDetailSubmit(e) {
    e.preventDefault();
     await trigger({
      name: e.target["country"].value,
      start: e.target["from"].value,
      end: e.target["to"].value,
    }); 
  }
  const {
    data: countryListData,
    error: counrytListError,
    isLoading: isCountryListLoading,
  } = useGetCountryListQuery();

  const countryArray = countryListData?.map((e) => (
    <option value={e.Slug} key={e.Slug}>
      {e.Country}
    </option>
  ));

  const totalCovidArr = (
    <div className="total-container">
      <div className="total-card">
        TotalConfirmed: {totalData?.TotalConfirmed}
      </div>
      <div className="total-card">TotalDeaths: {totalData?.TotalDeaths}</div>
      <div className="total-card">
        TotalRecovered: {totalData?.TotalRecovered}
      </div>
    </div>
  );

  return (
    <div className="home-hero">
      <div className="total-title">World Total Statisitcs</div>

      {totalCovidArr}
      <div className="form-title">Get Statisitcs for a specific country</div>
      <form className="select-form" onSubmit={handleDetailSubmit}>
        <Form.Select aria-label="Default select example" id="country">
          {countryArray}
        </Form.Select>

        <Form.Control
          id="from"
          type="date"
          name="duedate"
          placeholder="Due date"
        />

        <Form.Control
          id="to"
          type="date"
          name="duedate"
          placeholder="Due date"
        />
        <Button className="sbtn">Search</Button>
      </form>
      {countryData? console.log(countryData):  <>nodata</>}
    </div>
  );
}

export default Home;
