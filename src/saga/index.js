/* ---------------------------------
rootSaga
--------------------------------- */

import { all } from "redux-saga/effects";
import deleteContentWatcher from "./deleteContent";
import createRatingWatcher from "./createRating";
import createUser from "./createUser";

export default function* rootSaga() {
  yield all([
    //
    createUser(),
    createRatingWatcher(),
    deleteContentWatcher(),
    //
  ]);
}
