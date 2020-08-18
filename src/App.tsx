/* ---------------------------------
App
--------------------------------- */

import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import Authentication from "./components/Authentication/Authentication";
import Spinner from "./components/Spinner/Spinner";
import * as firebase from "firebase/app";
import { setAuthState, stopLoading } from "./redux/actions";
import { useDispatch } from "react-redux";
import { log } from "./utils";

const Routes = React.lazy(() => import("./Routes"));

function App({ authentication: { authenticated }, loading }) {
  const dispatch = useDispatch();
  /**
   * Auth observer
   */

  // TODO prevent setAuthState firing
  // at the same time with signInUserSuccess
  useEffect(() => {
    const observer = firebase.auth().onAuthStateChanged(
      user => {
        /**
         * user should be present in case of
         *  signup, login or persistent session
         */

        if (user) {
          log("@@@ user is present");

          // @ts-ignore
          const { uid, displayName, email, lastLoginAt, createdAt } = user;

          dispatch(
            setAuthState({
              authenticated: true,
              user: { uid, displayName, email, lastLoginAt, createdAt },
            })
          );
        }

        dispatch(stopLoading());
      },

      err => {
        console.error("@onAuthStateChanged", err);

        dispatch(stopLoading());
      }
    );

    return () => observer(); // this will unsubscribe from the obs.
  }, []);

  return loading ? (
    <Spinner />
  ) : authenticated ? (
    <Suspense fallback={<Spinner />}>
      <Routes />
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
