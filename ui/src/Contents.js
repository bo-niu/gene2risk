import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes.js';
// import Home from './pages/Home';
// import GetStarted from './pages/GetStarted';
// import AboutUs from './pages/AboutUs';
// import FAQ from './pages/FAQ';
// import NotFound from './pages/NotFound';

export default function Contents(props) {
  const { onUserChange } = props;
  return (
    <Switch>
      {/* <Redirect exact from="/" to="/issues" /> */}
      {routes.map(({ path, component: Comp }) => (
        <Route
          exact
          key={path}
          path={path}
          render={(props1) => (
            <Comp {...props1} onUserChange={onUserChange} />
          )}
        />
      ))}
      {/* <Route exact path="/" component={Home} /> */}



      {/* <Route exact path="/" component={() => <Home onUserChange={onUserChange}/>} />
      <Route exact path="/GetStarted" component={GetStarted} />
      <Route exact path="/AboutUs" component={AboutUs} />
      <Route exact path="/FAQ" component={FAQ} /> */}
    </Switch>
  );
}
