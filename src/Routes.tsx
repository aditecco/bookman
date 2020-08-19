/* ---------------------------------
Routes
--------------------------------- */

import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Modal from "./components/Modal/Modal";
import NotificationMessage from "./components/NotificationMessage/NotificationMessage";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Layout from "./components/Layout/Layout";

// BlankPage
export function BlankPage({ title, children }) {
  return (
    <Layout root="BlankPage">
      <h1>{title}</h1>

      {children}
    </Layout>
  );
}

// Routes
export default function Routes() {
  return (
    <Router>
      <NotificationMessage />
      <Modal />

      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/profile" exact component={Profile} />

        <Route path="/settings" exact component={Settings} />

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
