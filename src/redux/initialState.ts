/* ---------------------------------
initialState
--------------------------------- */

import { IUser } from "../types/bookman";

export default {
  meta: {
    app: "BookMan",
    version: `${process.env.REACT_APP_APP_VERSION}`,
    build: `${process.env.BUILD_ID}`, // will be resolved by Netlify
    source: `${process.env.REACT_APP_APP_SOURCE}`,
  },
  loading: true,
  error: null,
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
};

export interface IAppMeta {
  app: string;
  version: string;
  build: string;
  source: string;
}

export interface IAuthState {
  authenticated: boolean;
  user: null | IUser;
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

// TODO
export interface IErrorState {}
export interface IBookmark {}
export interface ITag {}

export interface IInitialState {
  meta: IAppMeta;
  loading: boolean;
  error: null | IErrorState;
  authentication: IAuthState;
  userData: null | IUser;
  bookmarks: Array<IBookmark>;
  tags: Array<ITag>;
  notificationMessage: INotificationMessageState;
  modal: IModalState;
}
