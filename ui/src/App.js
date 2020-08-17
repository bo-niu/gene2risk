import React from 'react';
import Home from './pages/Home';
import GetStarted from './pages/GetStarted';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Footer from './components/Footer';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div>
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/GetStarted" component={GetStarted} />
      <Route exact path="/AboutUs" component={AboutUs} />
      <Route exact path="/FAQ" component={FAQ} />
    </Router>
    <Footer/>
    </div>
  );
}

export default App;
