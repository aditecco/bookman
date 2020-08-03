/* ---------------------------------
createBookmark
--------------------------------- */

import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  showNotif,
  createBookmark,
  createBookmarkPending,
  createBookmarkError,
  createBookmarkSuccess,
} from "../redux/actions";
import { db } from "../index";
import { IInitialState } from "../redux/initialState";
import { access } from "fs";
import { TTagBundle } from "../types/bookman";
import { BookmarkInDB, TagInDB } from "../types/database";

function* createBookmarkSaga(action) {
  const { payload: bookmark } = action;

  const authSelector = (state: IInitialState) => state.authentication;

  const {
    user: { uid },
  } = yield select(authSelector);

  yield put(createBookmarkPending());

  try {
    const context = db.ref();
    const newBookmarkRef = db.ref("/bookmarks").push().key;
    const tagRefs = [];

    if (!newBookmarkRef) {
      throw new Error("Missing FireBase key!");
    }

    // we build the update payload for the tags part…
    const tagUpdates = (bookmark.tags as TTagBundle).reduce((acc, tag) => {
      const newTagRef = db.ref("/tags").push().key;

      if (!newTagRef) {
        throw new Error("Missing FireBase key!");
      }

      tagRefs.push(newTagRef);

      acc[`/users/${uid}/tags/${newTagRef}`] = true;
      acc[`/tags/${newTagRef}`] = {
        ...tag,
        bookmarks: { [newBookmarkRef]: true },
        createdBy: uid,
      } as TagInDB;

      return acc;
    }, {});

    // …then for the bookmark part
    const bookmarkUpdates = {
      [`/users/${uid}/bookmarks/${newBookmarkRef}`]: true,
      [`/bookmarks/${newBookmarkRef}`]: {
        ...bookmark,
        createdBy: uid,
        // we override tags
        tags: tagRefs.length
          ? tagRefs.reduce((acc, ref) => {
              acc[ref] = true;

              return acc;
            }, {})
          : [],
      } as BookmarkInDB,
    };

    // we create the bookmark remotely
    yield call(
      {
        context,
        fn: context.update,
      },

      {
        ...bookmarkUpdates,
        ...tagUpdates,
      }
    );

    // this is the key generated by firebase
    yield put(
      createBookmarkSuccess({ remoteKey: newBookmarkRef, ...bookmark })
    );

    yield put(
      showNotif({
        message: `Created new bookmark!`,
        icon: "star",
        timeOut: 2000,
        theme: "light",
      })
    );

    //
  } catch (error) {
    //
    console.error(error);
    yield put(createBookmarkError({ error }));
  }
}

/**
 * createBookmark
 */

export default function* () {
  yield takeEvery(`${createBookmark}`, createBookmarkSaga);
}
