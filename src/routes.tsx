/* ---------------------------------
Routes
--------------------------------- */

import React from "react";
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

// context init
export const SettingsContext = React.createContext(null);

// Routes
/*
export default function Routes() {
  return (
    <SettingsContext.Provider value={useReducer(updateSettings, settings)}>
      <Router>
        <NotificationMessage />
        <Modal />

        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/profile" exact component={Profile} />

          <Route path="/settings" exact component={Settings} />

          <Route path="/admin" exact component={Admin} />

          <Route
            render={({ location }) => (
              <BlankPage title="404">
                <h4>Sorry, nothing to see at {location.pathname}</h4>
              </BlankPage>
            )}
          />
        </Switch>
      </Router>
    </SettingsContext.Provider>
  );
}
*/
