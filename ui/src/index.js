import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from '../src/Page.js';
import store from '../src/store.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// ReactDOM.render(<App />, document.getElementById('root'));

store.initialData = window.__INITIAL_DATA__;
store.userData = window.__USER_DATA__;
const element = (
  <Router>
    <Page />
  </Router>
);

ReactDOM.hydrate(element, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
// registerServiceWorker();
