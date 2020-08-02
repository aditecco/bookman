/* ---------------------------------
BookMan types
--------------------------------- */

/**
 - User
  <-> Bookmark
  <-> Tag
  -> Setting
- Bookmark
  <-> Tag
- Tag
  <-> Bookmark
- Setting
  <- User
 */

export interface IContentMeta {
  key?: string;
  id: string;
  timestamp: number;
}

export interface IUser {
  uid: string | undefined;
  displayName: string | undefined;
  photoURL: string | undefined;
  email: string | undefined;
  lastLoginAt: string | undefined;
  createdAt: string | undefined;
}

export interface IBookmark extends IContentMeta {
  url: string;
  tags?: TTagBundle;
}

export interface ITag extends IContentMeta {
  value: string;
}

export interface ISetting {
  //
}

export type TTagBundle = ITag[];

export type TFetchUserBookmarksResponse = "";

export type TFetchUserTagsResponse = "";
