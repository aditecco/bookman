/* ---------------------------------
App
--------------------------------- */

import React, { Suspense } from "react";
import { connect } from "react-redux";
import Authentication from "./components/Authentication";

const AuthenticatedRoutes = React.lazy(() => import("./AuthenticatedRoutes"));

function App({ authentication, loading }) {
  return loading ? (
    "loading…" // TODO
  ) : authentication.authenticated ? (
    <Suspense fallback="loading...">
      <AuthenticatedRoutes />
    </Suspense>
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
