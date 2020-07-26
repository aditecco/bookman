/* ---------------------------------
index
--------------------------------- */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";

// comps
import App from "./App";
import Template from "./pages/Template";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
