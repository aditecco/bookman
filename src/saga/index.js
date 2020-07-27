/* ---------------------------------
rootSaga
--------------------------------- */

import { all } from "redux-saga/effects";
import deleteContentWatcher from "./deleteContent";
import createRatingWatcher from "./createRating";

export default function* rootSaga() {
  yield all([
    //
    createRatingWatcher(),
    deleteContentWatcher(),
    //
  ]);
}
