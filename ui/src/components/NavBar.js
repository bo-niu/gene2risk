import React from 'react';
import '../css/navbar.css';
import logo from '../img/logo.png';
import usericon from '../img/usericon.png';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
    <Link to="/" className="cardlinks"><img className="logo" src={logo}/></Link>
      <ul className= "navbar-items">
        <li><Link to="/GetStarted" className="links">GetStarted</Link></li>
        <li><Link to="/AboutUs" className="links">AboutUs</Link></li>
        <li><Link to="/FAQ" className="links">FAQ</Link></li>
      </ul>
      <img className="usericon" src={usericon}/>
    </div>
  );
}

export default NavBar;
