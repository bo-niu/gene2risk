import React from 'react';
import '../css/index.css';
import NavBar from '../components/NavBar';
import { Link } from "react-router-dom";


function Home(props) {
  const { onUserChange } = props;
  return (
    <div className="Home">
      <NavBar onUserChange={onUserChange} />
      <div className="body">
        <div className="hero">
        <h1 className="hero-text">Be educated about your natural risk</h1>
        <p className="hero-subtext">Stay one step ahead of life. Learn more about your genetic health today.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
