/* ---------------------------------
updateBookmark
--------------------------------- */

import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  showNotif,
  toggleModal,
  updateBookmark,
  updateBookmarkError,
  updateBookmarkPending,
  updateBookmarkSuccess,
} from "../store/actions";
import { IInitialState } from "../types/initial-state";
import { ITag, TFirebaseKey } from "../types/bookman";
import { db } from "../mocks";

/**
 * updateBookmarkSaga
 */

function* updateBookmarkSaga(action) {
  const {
    payload: { removedTags, ...updatedBookmark },
  } = action;
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

    const hasTags = Object.values(
      removedTags as Record<TFirebaseKey, ITag>
    ).filter((tag: ITag) => tag);

    let tagsToUpdate;

    if (hasTags.length) {
      // find out if the tags are not referenced in other bookmarks
      const leaves = hasTags
        .filter((tag: ITag) => Object.keys(tag.bookmarks).length === 1)
        .map(leaf => leaf._key);

      tagsToUpdate = hasTags.reduce((acc, tag) => {
        // tag was used only in that bookmark
        if (leaves.length && leaves.includes(tag._key)) {
          // remove from `/tags`
          acc[`/tags/${tag._key}`] = null;

          // remove from `/users/{uid}/tags`
          acc[`/users/${uid}/tags/${tag._key}`] = null;
        }

        // tag was NOT used only in that bookmark
        else {
          // remove bookmark from the tag's refs
          acc[`/tags/${tag._key}/bookmarks/${bookmarkKey}`] = null;
        }

        return acc;
      }, {});
    }

    yield call(
      {
        context,
        fn: context.update,
      },

      {
        [`/bookmarks/${bookmarkKey}`]: {
          ...updatedBookmark,
          // tags are already updated in UpdateMask,
          // but we have to convert them back to references
          tags: updatedBookmark.tags.reduce((acc, tag) => {
            acc[tag._key] = true;

            return acc;
          }, {}),
          // tagKeys arrive already processed from UpdateMask
        },
        ...(tagsToUpdate ? { ...tagsToUpdate } : {}),
      }
    );

    yield put(updateBookmarkSuccess());

    yield put(toggleModal());

    yield put(
      showNotif({
        message: `Bookmark updated.`,
        icon: "refresh",
        timeout: 2000,
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
