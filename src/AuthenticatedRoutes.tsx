/* ---------------------------------
AuthenticatedRoutes
--------------------------------- */

import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Modal from "./components/Modal/Modal";
import NotificationMessage from "./components/NotificationMessage/NotificationMessage";

export default function AuthenticatedRoutes() {
  return (
    <Router>
      <NotificationMessage />
      <Modal />

      <Switch>
        <Route path={"/"} exact component={Home} />
      </Switch>
    </Router>
  );
}
