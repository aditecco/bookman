/* ---------------------------------
reducer
--------------------------------- */

import { createReducer } from "@reduxjs/toolkit";
import { log, clipText } from "../utils";
import initialState, { IInitialState } from "./initialState";
import {
  addBookmark,
  addTags,
  createBookmarkError,
  createBookmarkPending,
  createBookmarkSuccess,
  createNoteError,
  createNotePending,
  createNoteSuccess,
  createTagError,
  createTagPending,
  createTagSuccess,
  deleteBookmark,
  destroyUser,
  editBookmark,
  hideNotif,
  importLocalBookmarks,
  importLocalTags,
  initUser,
  setAuthState,
  setInitialData,
  showNotif,
  signInUserError,
  signInUserPending,
  signInUserSuccess,
  signOutUser,
  signOutUserError,
  signOutUserPending,
  signOutUserSuccess,
  signUpUserError,
  signUpUserPending,
  signUpUserSuccess,
  stopLoading,
  toggleModal,
  syncTags,
  syncBookmarks,
} from "./actions";

const reducer = createReducer(/*initialState as IInitialState,*/ initialState, {
  // @ts-ignore
  // https://github.com/reduxjs/redux-toolkit/issues/478
  [signUpUserPending](state) {
    return {
      ...state,
      loading: true,
    };
  },

  // @ts-ignore
  [signUpUserSuccess](state, action) {
    const {
      payload: {
        user: { uid, displayName, photoURL, email, lastLoginAt, createdAt },
      },
    } = action;

    return {
      ...state,
      loading: false,
      authentication: {
        ...state.authentication,
        authenticated: true,
        user: { uid, displayName, photoURL, email, lastLoginAt, createdAt },
      },
    };
  },

  // @ts-ignore
  [signUpUserError](state, action) {
    const {
      payload: { error },
    } = action;

    return {
      ...state,
      loading: false,
      error,
    };
  },

  // @ts-ignore
  [signInUserPending](state) {
    return {
      ...state,
      loading: true,
    };
  },

  // @ts-ignore
  [signInUserSuccess](state, action) {
    const {
      payload: {
        user: { uid, displayName, photoURL, email, lastLoginAt, createdAt },
      },
    } = action;

    return {
      ...state,
      loading: false,
      authentication: {
        ...state.authentication,
        authenticated: true,
        user: { uid, displayName, photoURL, email, lastLoginAt, createdAt },
      },
    };
  },

  // @ts-ignore
  [signInUserError](state, action) {
    const {
      payload: { error },
    } = action;

    return {
      ...state,
      loading: false,
      error,
    };
  },

  // @ts-ignore
  [signOutUserPending](state) {
    return {
      ...state,
      loading: true,
    };
  },

  // @ts-ignore
  [signOutUserError](state, action) {
    const {
      payload: { error },
    } = action;

    return {
      ...state,
      loading: false,
      error,
    };
  },

  // @ts-ignore
  [signOutUserSuccess](state) {
    return {
      ...state,
      loading: false,
      authentication: { authenticated: false, user: null },
      // userData: null,
    };
  },

  // @ts-ignore
  [setAuthState](state, action) {
    const {
      payload: {
        authenticated,
        user: { uid, displayName, photoURL, email, lastLoginAt, createdAt },
      },
    } = action;

    return {
      ...state,
      loading: false,
      authentication: {
        ...state.authentication,
        authenticated,
        user: { uid, displayName, photoURL, email, lastLoginAt, createdAt },
      },
    };
  },

  // @ts-ignore
  [stopLoading](state) {
    return { ...state, loading: false };
  },

  ["xx"](state, action) {
    return state;
  },

  ["yy"](state, action) {
    return state;
  },

  ["zz"](state, action) {
    return state;
  },

  // @ts-ignore
  [initUser](state, action) {
    const { uid } = action.payload;

    return {
      ...state,
      userData: {
        [uid]: {
          ...{},
        },
      },
    };
  },

  // @ts-ignore
  [syncBookmarks](state, action) {
    const { payload: bookmark } = action;

    return {
      ...state,
      bookmarks: [bookmark, ...state.bookmarks],
    };
  },

  // @ts-ignore
  [syncTags](state, action) {
    const { payload: tag } = action;

    return {
      ...state,
      tags: [tag, ...state.tags],
    };
  },

  // @ts-ignore
  [showNotif](state, action) {
    const {
      payload: { message, icon, timeOut, theme = "dark" },
    } = action;

    return {
      ...state,
      notificationMessage: {
        isVisible: true,
        message: clipText(message, 25),
        icon,
        timeOut,
        theme,
      },
    };
  },

  // @ts-ignore
  [hideNotif](state) {
    return {
      ...state,
      notificationMessage: {
        ...initialState.notificationMessage,
      },
    };
  },

  // @ts-ignore
  [toggleModal](state, action) {
    return {
      ...state,
      modal: {
        forceOpen: (action.payload && action.payload.forceOpen) || false,
        open: state.modal.forceOpen ? true : !state.modal.open,
        content: (action.payload && action.payload.content) || null,
      },
    };
  },

  // @ts-ignore
  [addBookmark](state, action) {
    const {
      payload: { url, id },
    } = action;

    return {
      ...state,
      bookmarks: [
        {
          id,
          url,
          timestamp: new Date().toLocaleString(),
        },
        ...state.bookmarks,
      ],
    };
  },

  // @ts-ignore
  [editBookmark](state, action) {
    const {
      payload: { id, editedUrl },
    } = action;

    const toEdit = state.bookmarks.findIndex(bookmark => bookmark.id === id);

    return {
      ...state,
      bookmarks: [
        ...state.bookmarks.slice(0, toEdit),
        { ...state.bookmarks[toEdit], url: editedUrl },
        ...state.bookmarks.slice(toEdit + 1),
      ],
    };
  },

  // @ts-ignore
  [deleteBookmark](state, action) {
    const {
      payload: { id },
    } = action;

    const toDelete = state.bookmarks.findIndex(bookmark => bookmark.id === id);

    return {
      ...state,
      bookmarks: [
        ...state.bookmarks.slice(0, toDelete),
        ...state.bookmarks.slice(toDelete + 1),
      ],
    };
  },

  // @ts-ignore
  [addTags](state, action) {
    const {
      payload: { tags, id },
    } = action;

    return {
      ...state,
      tags: [
        {
          id,
          tags: tags.split(","),
          timestamp: new Date().toLocaleString(),
        },
        ...state.tags,
      ],
    };
  },

  // @ts-ignore
  [importLocalBookmarks](state, action) {
    const {
      payload: { data },
    } = action;

    return state;
  },

  // @ts-ignore
  [importLocalTags](state, action) {
    const {
      payload: { data },
    } = action;

    return state;
  },

  // end
});

export default reducer;
