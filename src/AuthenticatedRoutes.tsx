/* ---------------------------------
AuthenticatedRoutes
--------------------------------- */

import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";

export default function AuthenticatedRoutes() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact component={Home} />
      </Switch>
    </Router>
  );
}
