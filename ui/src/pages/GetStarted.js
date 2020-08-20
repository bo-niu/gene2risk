import React from 'react';
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <div className="GetStarted">
      <Link to="/" className="cardlinks">Back</Link>
      <h1>GetStarted</h1>
    </div>
  );
}

export default GetStarted;
