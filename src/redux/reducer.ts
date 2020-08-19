/* ---------------------------------
reducer
--------------------------------- */

import { createReducer } from "@reduxjs/toolkit";
import { log, clipText } from "../utils";
import initialState from "./initialState";
import { IInitialState } from "../types/initial-state";
import {
  createBookmarkError,
  createBookmarkPending,
  createBookmarkSuccess,
  createTagError,
  createTagPending,
  createTagSuccess,
  deleteBookmark,
  deleteBookmarkError,
  deleteBookmarkPending,
  deleteBookmarkSuccess,
  destroyUser,
  hideNotif,
  importLocalBookmarks,
  importLocalTags,
  setAuthState,
  setInitialData,
  showNotif,
  signInUserError,
  signInUserPending,
  signInUserSuccess,
  signOutUserError,
  signOutUserPending,
  signOutUserSuccess,
  signUpUserError,
  signUpUserPending,
  signUpUserSuccess,
  stopLoading,
  syncBookmarks,
  syncTags,
  toggleModal,
  updateBookmarkPending,
  updateBookmarkSuccess,
  updateBookmarkError,
} from "./actions";
import updateBookmark from "../saga/updateBookmark";

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
      payload: { user },
    } = action;

    return {
      ...state,
      loading: false,
      authentication: {
        ...state.authentication,
        authenticated: true,
        user,
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
      payload: { user },
    } = action;

    return {
      ...state,
      loading: false,
      authentication: {
        ...state.authentication,
        authenticated: true,
        user,
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
    };
  },

  // @ts-ignore
  [setAuthState](state, action) {
    const {
      payload: { authenticated, user },
    } = action;

    return {
      ...state,
      loading: false,
      authentication: {
        ...state.authentication,
        authenticated,
        user,
      },
    };
  },

  // @ts-ignore
  [stopLoading](state) {
    return { ...state, loading: false };
  },

  // @ts-ignore
  [syncBookmarks](state, action) {
    const { payload: bookmark } = action;

    return {
      ...state,
      dataTransfer: {
        ...state.dataTransfer,
        loadingBookmarks: false,
      },
      bookmarks: [bookmark, ...state.bookmarks],
    };
  },

  // @ts-ignore
  [syncTags](state, action) {
    return {
      ...state,
      dataTransfer: {
        ...state.dataTransfer,
        loadingTags: false,
      },
      tags: [action.payload, ...state.tags],
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
  [deleteBookmarkPending](state, action) {
    return state;
  },

  // @ts-ignore
  [deleteBookmarkSuccess](state, action) {
    return state;
  },

  // @ts-ignore
  [deleteBookmarkError](state, action) {
    return state;
  },

  // @ts-ignore
  [updateBookmarkPending](state, action) {
    return state;
  },

  // @ts-ignore
  [updateBookmarkSuccess](state, action) {
    return state;
  },

  // @ts-ignore
  [updateBookmarkError](state, action) {
    return state;
  },

  // // @ts-ignore
  // [editBookmark](state, action) {
  //   const {
  //     payload: { id, editedUrl },
  //   } = action;

  //   const toEdit = state.bookmarks.findIndex(bookmark => bookmark.id === id);

  //   return {
  //     ...state,
  //     bookmarks: [
  //       ...state.bookmarks.slice(0, toEdit),
  //       { ...state.bookmarks[toEdit], url: editedUrl },
  //       ...state.bookmarks.slice(toEdit + 1),
  //     ],
  //   };
  // },

  // // @ts-ignore
  // [deleteBookmark](state, action) {
  //   const {
  //     payload: { id },
  //   } = action;

  //   const toDelete = state.bookmarks.findIndex(bookmark => bookmark.id === id);

  //   return {
  //     ...state,
  //     bookmarks: [
  //       ...state.bookmarks.slice(0, toDelete),
  //       ...state.bookmarks.slice(toDelete + 1),
  //     ],
  //   };
  // },

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

  ["xx"](state, action) {
    return state;
  },

  // end
});

export default reducer;
