
/* ---------------------------------
index
--------------------------------- */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import store from './store';

// comps
import App from './App';
import Template from './pages/Template';



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path={'/'} exact component={App} />
      <Route path="/test/" component={Template} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
