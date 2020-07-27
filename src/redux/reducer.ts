/* ---------------------------------
reducer
--------------------------------- */

import { createReducer } from "@reduxjs/toolkit";
import { log, clipText } from "../utils";
import initialState from "./initialState";
import {
  addBookmark,
  createNoteError,
  createNotePending,
  createNoteSuccess,
  destroyUser,
  hideNotif,
  initUser,
  setAuthState,
  setInitialData,
  showNotif,
  toggleModal,
  addTags,
  deleteBookmark,
  editBookmark,
  importLocalBookmarks,
  importLocalTags,
} from "./actions";

const userDataTemplate = {
  watched: [],
  toWatch: [],
  settings: {
    apiKey: "",
  },
};

const reducer = createReducer(initialState, {
  // @ts-ignore
  [setAuthState](state, action) {
    const {
      payload: { authenticated, user },
    } = action;

    return {
      ...state,
      authentication: {
        ...state.authentication,
        authenticated,
        user,
      },
    };
  },

  // @ts-ignore
  [initUser](state, action) {
    const { uid } = action.payload;

    return {
      ...state,
      userData: {
        [uid]: {
          ...userDataTemplate,
        },
      },
    };
  },

  // @ts-ignore
  [destroyUser](state) {
    return {
      ...state,
      authentication: { authenticated: false, user: null },
      userData: {},
    };
  },

  // @ts-ignore
  [setInitialData](state, action) {
    const {
      payload: { uid, mappedData },
    } = action;

    return {
      ...state,
      userData: {
        [uid]: {
          ...state.userData[uid],
          watched: [...mappedData.watched].reverse(),
          toWatch: [...mappedData.toWatch].reverse(),
        },
      },
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
  [createNotePending](state, action) {
    return state;
  },

  // @ts-ignore
  [createNoteSuccess](state, action) {
    return state;
  },

  // @ts-ignore
  [createNoteError](state, action) {
    return state;
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
