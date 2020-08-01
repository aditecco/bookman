/* ---------------------------------
rootSaga
--------------------------------- */

import { all } from "redux-saga/effects";
import signInUser from "./signInUser";
import signUpUser from "./signUpUser";
import signOutUser from "./signOutUser";
import createBookmark from "./createBookmark";

export default function* rootSaga() {
  yield all([signInUser(), signOutUser(), signUpUser(), createBookmark()]);
}
