/* ---------------------------------
Initial state types
--------------------------------- */

import { IUser, IBookmark, ITag } from "./bookman";

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

export interface IInitialState {
  meta: IAppMeta;
  loading: boolean;
  error: null | IErrorState;
  authentication: IAuthState;
  bookmarks: Array<IBookmark>;
  tags: Array<ITag>;
  notificationMessage: INotificationMessageState;
  modal: IModalState;
}
