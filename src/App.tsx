/* ---------------------------------
App
--------------------------------- */

import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./components/Authentication";

function App({ authentication, loading }) {
  return loading ? (
    "loading…" // TODO
  ) : authentication.authenticated ? (
    <Router>
      <Route path={"/"} exact component={Home} />
    </Router>
  ) : (
    <Authentication />
  );
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({});
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(App);
