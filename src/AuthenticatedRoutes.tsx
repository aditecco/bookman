/* ---------------------------------
AuthenticatedRoutes
--------------------------------- */

import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Modal from "./components/Modal/Modal";
import NotificationMessage from "./components/NotificationMessage/NotificationMessage";

export function BlankPage({ title, children }) {
  return (
    <div className="BlankPage">
      <h1>{title}</h1>

      {children}
    </div>
  );
}

export default function AuthenticatedRoutes() {
  return (
    <Router>
      <NotificationMessage />
      <Modal />

      <Switch>
        <Route path={"/"} exact component={Home} />

        <Route
          render={({ location }) => (
            <BlankPage title="404">
              <h4>Sorry, nothing to see at {location.pathname}</h4>
            </BlankPage>
          )}
        />
      </Switch>
    </Router>
  );
}
