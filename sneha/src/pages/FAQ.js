import React from 'react';
import '../css/subpage.css';
import { Link } from "react-router-dom";


function FAQ() {
  return (
    <div className="FAQ">
    <div className="back-btn">
      <Link to="/" className="cardlinks">Back</Link>
    </div>
      <div className="hero">
        <h1> FAQ </h1>
      </div>
    </div>
  );
}

export default FAQ;
