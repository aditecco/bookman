/* ---------------------------------
rootSaga
--------------------------------- */

import { all } from "redux-saga/effects";
import signInUser from "./signInUser";
import signUpUser from "./signUpUser";

export default function* rootSaga() {
  yield all([signInUser(), signUpUser()]);
}
