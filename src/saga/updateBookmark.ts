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
  const {
    payload: { newUrl, newTags, fKey: key, tagKeys },
  } = action;

  const authSelector = (state: IInitialState) => state.authentication;
  const {
    user: { uid },
  } = yield select(authSelector);

  /**
   *
   * 1. Modify the URL
   *  - URL is updated in the DB bookmark
   * 2. Mark tags for deletion
   *  - tag refs are set to null in the DB bookmark
   *    - if the tags were used **only in that bookmark:**
   *      - remove the tags from /tags
   *      - remove the tags refs from /users/{uid}/tags
   */

  yield put(updateBookmarkPending());

  try {
    const context = db.ref();
    let tagsToUpdate;
    // const tagsToUpdate =
    //   tagKeys &&
    //   tagKeys.reduce((acc, key) => {
    //     acc[`/tags/${key}`] = null;
    //     acc[`/users/${uid}/tags/${key}`] = null;

    //     return acc;
    //   }, {});

    yield call(
      {
        context,
        fn: context.update,
      },

      {
        [`/bookmarks/${key}/url`]: newUrl,
        ...(tagsToUpdate ? { ...tagsToUpdate } : {}),
      }
    );

    yield put(updateBookmarkSuccess());

    yield put(
      showNotif({
        message: `Bookmark updated.`,
        icon: "refresh",
        timeOut: 2000,
        theme: "light",
      })
    );

    //
  } catch (error) {
    //
    console.error(error);
    yield put(updateBookmarkError({ error }));
  }
}

/**
 * updateBookmark
 */

export default function* () {
  yield takeEvery(`${updateBookmark}`, updateBookmarkSaga);
}
