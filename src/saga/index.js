/* ---------------------------------
rootSaga
--------------------------------- */

import { all } from "redux-saga/effects";
import signInUser from "./signInUser";
import signUpUser from "./signUpUser";
import signOutUser from "./signOutUser";

export default function* rootSaga() {
  yield all([signInUser(), signOutUser(), signUpUser()]);
}
