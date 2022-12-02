import React from "react";
import {
  useGetWorldTotalQuery,
  useLazyGetCountryDetailQuery,
  useGetCountryListQuery,
} from "../../services/covidRecords";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import "./Home.css"

function Home() {
  const {
    data: totalData,
    error: totalError,
    isLoading: isTotalLoading,
  } = useGetWorldTotalQuery();
  console.log(totalData)
  const [
    trigger,
    {
      data: countryData,
      error: CountryDataError,
      isLoading: isCountryDataLoading,
    },
  ] = useLazyGetCountryDetailQuery();

  if (!isCountryDataLoading) console.log(countryData);
  async function handleDetailSubmit(e) {
    e.preventDefault();
    /* await trigger({
      name: e.target["country"].value,
      start: e.target["from"].value,
      end: e.target["to"].value,
    }); */
   
  }
  const {
    data: countryListData,
    error: counrytListError,
    isLoading: isCountryListLoading,
  } = useGetCountryListQuery();

  
  const countryArray = countryListData?.map((e) => (
    <option value={e.Slug} key={e.Slug}>{e.Country}</option>
  ));

  const totalCovidArr =<div>
    TotalConfirmed:{totalData?.TotalConfirmed},TotalDeaths:{totalData?.TotalDeaths},TotalRecovered:{totalData?.TotalRecovered}
  </div>
  return (
    <div className="home-hero">
      {totalCovidArr}
      <form onSubmit={handleDetailSubmit}>
        <label>Country</label>
        <Form.Select aria-label="Default select example" id="country">
          {countryArray}
        </Form.Select>
        <label>from</label>
        <Form.Control
          id="from"
          type="date"
          name="duedate"
          placeholder="Due date"
        />

        <label>to</label>
        <Form.Control
          id="to"
          type="date"
          name="duedate"
          placeholder="Due date"
        />
        <Button className="sbtn">Submit</Button>
      </form>
    </div>
  );
}

export default Home;
