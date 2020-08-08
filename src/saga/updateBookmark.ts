/* ---------------------------------
updateBookmark
--------------------------------- */

import { put, takeEvery, select, call } from "redux-saga/effects";
import {
  updateBookmark,
  updateBookmarkPending,
  updateBookmarkError,
  updateBookmarkSuccess,
  showNotif,
} from "../redux/actions";
import { db } from "../index";
import { log } from "../utils";
import { IInitialState } from "../types/initial-state";

/**
 * updateBookmarkSaga
 */

function* updateBookmarkSaga(action) {
  log(action);
  // const {
  //   payload: { key, tags: tagKeys },
  // } = action;

  // const authSelector = (state: IInitialState) => state.authentication;
  // const {
  //   user: { uid },
  // } = yield select(authSelector);

  // yield put(updateBookmarkPending());

  // try {
  //   const context = db.ref();

  //   const tagsToUpdate =
  //     tagKeys &&
  //     tagKeys.reduce((acc, key) => {
  //       acc[`/tags/${key}`] = null;
  //       acc[`/users/${uid}/tags/${key}`] = null;

  //       return acc;
  //     }, {});

  //   yield call(
  //     {
  //       context,
  //       fn: context.update,
  //     },

  //     {
  //       [`/bookmarks/${key}`]: null,
  //       [`/users/${uid}/bookmarks/${key}`]: null,
  //       ...(tagsToUpdate ? { ...tagsToUpdate } : {}),
  //     }
  //   );

  //   yield put(updateBookmarkSuccess(key));

  //   yield put(
  //     showNotif({
  //       message: `Bookmark removed.`,
  //       icon: "remove_circle",
  //       timeOut: 2000,
  //       theme: "light",
  //     })
  //   );

  //   //
  // } catch (error) {
  //   //
  //   console.error(error);
  //   yield put(updateBookmarkError({ error }));
  // }
}

/**
 * updateBookmark
 */

export default function* () {
  yield takeEvery(`${updateBookmark}`, updateBookmarkSaga);
}
