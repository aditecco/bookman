/* ---------------------------------
initialState
--------------------------------- */

import { IInitialState } from "../types/initial-state";

export default {
  meta: {
    app: "BookMan",
    version: `${process.env.NEXT_PUBLIC_VERSION}`,
    build: `${process.env.BUILD_ID}`, // will be resolved by Netlify
    source: `${process.env.NEXT_PUBLIC_APP_SOURCE}`,
  },
  loading: true,
  error: null,
  authentication: {
    authenticated: false,
    user: null,
  },
  dataTransfer: {
    loadingBookmarks: true,
    loadingTags: true,
  },
  bookmarks: [],
  tags: [],
  notificationMessage: {
    visible: false,
    message: "",
    icon: "",
    timeout: 0,
    theme: "",
  },
  modal: {
    open: false,
    content: null,
    forceOpen: false,
  },
} as IInitialState;
