/* ---------------------------------
initialState
--------------------------------- */

export default {
  meta: {
    app: "BookMan",
    version: `${process.env.REACT_APP_APP_VERSION}`,
    build: `${process.env.BUILD_ID}`, // will be resolved by Netlify
    source: `${process.env.REACT_APP_APP_SOURCE}`,
  },
  loading: false,
  authentication: {
    authenticated: false,
    user: null,
  },
  userData: null,
  bookmarks: [],
  tags: [],
  notificationMessage: {
    isVisible: false,
    message: "",
    icon: "",
    timeOut: 0,
    theme: "",
  },
  modal: {
    open: false,
    content: null,
    forceOpen: false,
  },
  error: null,
};

export interface IAppMeta {
  app: string;
  version: string;
  build: string;
  source: string;
}

export interface IAuthState {
  authenticated: boolean;
  user: null | {}; //TODO
}

export interface INotificationMessageState {
  isVisible: boolean;
  message: string;
  icon: string;
  timeOut: number;
  theme: string;
}

export interface IModalState {
  open: boolean;
  content: null | {}; // TODO
  forceOpen: boolean;
}

export interface IInitialState {
  meta: IAppMeta;
  loading: boolean;
  authentication: IAuthState;
  userData: null | {}; //TODO
  bookmarks: Array<{}>; //TODO
  tags: Array<{}>; //TODO
  notificationMessage: INotificationMessageState;
  modal: IModalState;
  error: null | {}; // TODO
}
