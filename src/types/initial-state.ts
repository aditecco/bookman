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
  visible: boolean;
  message: string;
  icon: string;
  timeout: number;
  theme: string;
}

export interface IModalState {
  open: boolean;
  content: null | {}; // TODO
  forceOpen: boolean;
}

export interface IDataTransferState {
  loadingBookmarks: boolean;
  loadingTags: boolean;
}

// TODO
export interface IErrorState {}

export interface IInitialState {
  meta: IAppMeta;
  loading: boolean;
  error: null | IErrorState;
  authentication: IAuthState;
  dataTransfer: IDataTransferState;
  bookmarks: IBookmark[];
  tags: ITag[];
  notificationMessage: INotificationMessageState;
  modal: IModalState;
}
