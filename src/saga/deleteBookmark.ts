/* ---------------------------------
deleteBookmark
--------------------------------- */

import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  deleteBookmark,
  deleteBookmarkError,
  deleteBookmarkPending,
  deleteBookmarkSuccess,
  showNotif,
} from "../redux/actions";
import { db } from "../mocks";
import { IInitialState } from "../types/initial-state";

/**
 * deleteBookmarkSaga
 */

function* deleteBookmarkSaga(action) {
  const {
    payload: { key, tags: tagKeys },
  } = action;

  const authSelector = (state: IInitialState) => state.authentication;
  const {
    user: { uid },
  } = yield select(authSelector);

  yield put(deleteBookmarkPending());

  try {
    const context = db.ref();

    // !!! TODO delete if tags are used ONLY in this bookmark
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
        timeout: 2000,
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
