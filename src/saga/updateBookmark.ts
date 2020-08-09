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

  const { payload: updatedBookmark } = action;
  const { _key: bookmarkKey, url: newUrl } = updatedBookmark;

  const authSelector = (state: IInitialState) => state.authentication;
  const {
    user: { uid },
  } = yield select(authSelector);

  /**
   *
   * - get the modified bookmark
   *  - URL is saved as-is
   *  - tags
   *    - some/all tags were removed
   *      - for tags that were NOT used only in that bookmark
   *        - remove from bookmark refs
   *        - remove from tag keys
   *        - remove bookmark from those tags' refs
   *      - for tags were used only in that bookmark
   *        - remove from bookmark refs
   *        - remove from tag keys
   *        - remove from `/tags`
   *        - remove from `/users/{uid}/tags`
   */

  yield put(updateBookmarkPending());

  try {
    const context = db.ref();

    const removedTags: string[] = updatedBookmark.tagKeys.filter(
      k => !updatedBookmark.tags.map(tag => tag._key).includes(k)
    );

    const tagsToUpdate =
      removedTags.length &&
      removedTags.reduce((acc, k) => {
        acc[`/tags/${k}/bookmarks/${bookmarkKey}`] = null;
        // acc[`/users/${uid}/tags/${key}`] = null;

        return acc;
      }, {});

    log({
      [`/bookmarks/${bookmarkKey}`]: {
        ...updatedBookmark,
        tags: updatedBookmark.tags.reduce((acc, tag) => {
          acc[tag._key] = true;

          return acc;
        }, {}),
        tagKeys: updatedBookmark.tags.map(tag => tag._key),
      },
      ...(tagsToUpdate ? { ...tagsToUpdate } : {}),
    });

    return;

    yield call(
      {
        context,
        fn: context.update,
      },

      {}
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
