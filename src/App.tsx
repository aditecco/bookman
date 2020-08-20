/* ---------------------------------
App
--------------------------------- */

import * as firebase from "firebase/app";
import React, { Suspense, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { db } from ".";
import Authentication from "./components/Authentication/Authentication";
import Spinner from "./components/Spinner/Spinner";
import {
  setAuthState,
  stopLoading,
  syncBookmarks,
  syncTags,
} from "./redux/actions";
import { BlankPage } from "./Routes";
import { TBookmarkInDB } from "./types/bookman";
import { log } from "./utils";

// lazy init
const Routes = React.lazy(() => import("./Routes"));

// App
function App({ authentication, loading, syncBookmarks, syncTags }) {
  const dispatch = useDispatch();
  const { authenticated } = authentication;

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

  useEffect(() => {
    if (authentication.user) {
      const bookmarksRef = db
        .ref(`/bookmarks`)
        .orderByChild("createdBy")
        .equalTo(authentication.user.uid)
        .limitToLast(50);

      // const userBookmarksRef = db.ref(
      //   `/users/${authentication.user.uid}/bookmarks`
      // );
      // .orderByChild('timestamp').limitToLast(50);

      const tagsRef = db
        .ref(`/tags`)
        .orderByChild("createdBy")
        .equalTo(authentication.user.uid);

      // const userTagsRef = db.ref(`/users/${authentication.user.uid}/tags`);

      // "Your callback will be triggered for the initial data
      // and again whenever the data changes."
      // https://firebase.google.com/docs/database/web/read-and-write

      bookmarksRef.on("child_added", async snap => {
        const bookmark: TBookmarkInDB = snap.val();
        const _tags = [];
        const { tags, tagKeys } = bookmark;

        // enrich bookmarks w/ tag values
        // extracted from the DB.
        // Firebase will ignore empty arrays,
        // so we'll get only tags with a length
        if (tags && tagKeys) {
          const tagsSnap = await tagsRef.once("value");
          const tagValues = tagsSnap.val();

          tagKeys.forEach(k => tagValues[k] && _tags.push(tagValues[k]));
        }

        syncBookmarks({
          ...bookmark,
          ...(_tags.length ? { tags: _tags } : {}),
        });
      });

      tagsRef.on("child_added", snap => syncTags(snap.val()));

      bookmarksRef.on("child_removed", async snap => {
        log("removed!");
      });

      return () => {
        bookmarksRef.off();
        tagsRef.off();
      }; // this will unsubscribe from the obs.
    }
  }, [authentication.user]);

  return loading ? (
    <Spinner />
  ) : authenticated ? (
    <Suspense fallback={<Spinner />}>
      <Routes />
    </Suspense>
  ) : (
    <Router>
      <Switch>
        <Route path="/" exact component={Authentication} />

        <Route
          render={({ location }) => {
            const matchesAuthenticatedRoute = [
              "/settings",
              "/profile",
            ].includes(location.pathname);

            return (
              <BlankPage
                title={
                  matchesAuthenticatedRoute
                    ? "Please log in or sign up"
                    : "Not found"
                }
              >
                {matchesAuthenticatedRoute ? (
                  <>
                    <h4>
                      You need to be authenticated to see {location.pathname}
                    </h4>

                    <Link to="/">Go to Authentication</Link>
                  </>
                ) : (
                  <h4>Sorry, nothing to see at {location.pathname}</h4>
                )}
              </BlankPage>
            );
          }}
        />
      </Switch>
    </Router>
  );
}

const mapStateToProps = ({ authentication, loading }) => ({
  authentication,
  loading,
});

const mapDispatchToProps = dispatch => ({
  syncBookmarks: data => dispatch(syncBookmarks(data)),
  syncTags: data => dispatch(syncTags(data)),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(App);
