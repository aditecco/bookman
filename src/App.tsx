/* ---------------------------------
App
--------------------------------- */

import React, { Suspense } from "react";
import { connect } from "react-redux";
import Authentication from "./components/Authentication";
import Spinner from "./components/Spinner/Spinner";

const AuthenticatedRoutes = React.lazy(() => import("./AuthenticatedRoutes"));

function App({ authentication: { authenticated }, loading }) {
  return loading ? (
    <Spinner />
  ) : authenticated ? (
    <Suspense fallback={Spinner}>
      <AuthenticatedRoutes />
    </Suspense>
  ) : (
    <Authentication />
  );
}

const mapStateToProps = ({ authentication, loading }) => ({
  authentication,
  loading,
});

const mapDispatchToProps = dispatch => ({});
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(App);
