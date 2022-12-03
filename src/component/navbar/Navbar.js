import React from 'react'
import { Link } from "react-router-dom"
import "./Navbar.css"
import Logo from "../../img/myCovidRecLogo.png"
function Navbar() {
  return (
    <div className='nav-hero' >

      <img className='nav-img' src={Logo} alt="logo-img"></img>
      <div className='title'>Covid19 Statistics</div>
      <div className='summary'>A website to provide you with all the updates on covid-19 statistics around the world</div>
    <div className='nav-container'>
    <Link className='nav-link'  to="/">Home</Link>
    <Link className='nav-link' to="/allCountries">All Countries</Link>
    <Link className='nav-link' to="/myRecords">My Records</Link>
    </div>
    </div>
  )
}

export default Navbar