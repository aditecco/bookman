/* ---------------------------------
rootSaga
--------------------------------- */

import { all } from "redux-saga/effects";
import createUser from "./createUser";
import signInUser from "./signInUser";

export default function* rootSaga() {
  yield all([
    //
    createUser(),
    signInUser(),
    //
  ]);
}
