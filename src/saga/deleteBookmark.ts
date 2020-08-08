/* ---------------------------------
deleteBookmark
--------------------------------- */

import { put, takeEvery, select, call } from "redux-saga/effects";
import {
  deleteBookmark,
  deleteBookmarkPending,
  deleteBookmarkError,
  deleteBookmarkSuccess,
  deleteLocalContent,
  showNotif,
} from "../redux/actions";
import { db } from "../index";
import { log } from "../utils";
import { IInitialState } from "../types/initial-state";

/**
 * deleteBookmarkSaga
 */

function* deleteBookmarkSaga(action) {
  const {
    payload: { fkey: key, tagKeys },
  } = action;

  const authSelector = (state: IInitialState) => state.authentication;
  const {
    user: { uid },
  } = yield select(authSelector);

  yield put(deleteBookmarkPending());

  try {
    const context = db.ref();

    const tagsToDelete =
      tagKeys &&
      tagKeys.reduce((acc, key) => {
        acc[`/tags/${key}`] = null;
        acc[`/users/${uid}/tags/${key}`] = null;

        return acc;
      }, {});

    yield call(
      {
        context,
        fn: context.update,
      },

      {
        [`/bookmarks/${key}`]: null,
        [`/users/${uid}/bookmarks/${key}`]: null,
        ...(tagsToDelete ? { ...tagsToDelete } : {}),
      }
    );

    yield put(deleteBookmarkSuccess(key));

    yield put(
      showNotif({
        message: `Bookmark removed.`,
        icon: "remove_circle",
        timeOut: 2000,
        theme: "light",
      })
    );

    //
  } catch (error) {
    //
    console.error(error);
    yield put(deleteBookmarkError({ error }));
  }
}

/**
 * deleteBookmark
 */

export default function* () {
  yield takeEvery(`${deleteBookmark}`, deleteBookmarkSaga);
}
