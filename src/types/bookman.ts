/* ---------------------------------
BookMan types
--------------------------------- */

export interface IUser {
  uid: string | undefined;
  displayName: string | undefined;
  photoURL: string | undefined;
  email: string | undefined;
  lastLoginAt: string | undefined;
  createdAt: string | undefined;
}

export interface IContentMeta {
  id: string;
  timestamp: number;
  updatedAt?: number;
}

export interface IEnrichedContentMeta extends IContentMeta {
  _key?: string;
  createdBy: string;
}

// TODO decide which one to keep: this one or the DB version!
export interface IBookmark extends IEnrichedContentMeta {
  url: string;
  tags?: ITag[];
  tagKeys?: string[];
}

// TODO decide which one to keep: this one or the DB version!
export interface ITag extends IEnrichedContentMeta {
  bookmarks: {};
  value: string;
}

export type TTagBundle = ITag[];

export type TFetchUserBookmarksResponse = "";

export type TFetchUserTagsResponse = "";

export type TBookmarkInDB = {
  [k in TEntityKey]: TFirebaseRelationship | null;
} &
  IBookmark;

export type TTagInDB = {
  [k in TEntityKey]: TFirebaseRelationship | null;
} &
  ITag;

export type TTagsInDB = Record<TFirebaseKey, TTagInDB>;

export type TEntityKey = "bookmarks" | "tags" | "users";

export type TFirebaseRelationship = { [k: string]: boolean };

export type TFirebaseKey = string;

export type TFirebaseUID = string;

export interface IUserInDB {}

export interface ISetting {
  //
}

export type TSettings = Record<TSettingLabel, boolean>;

export type TSettingLabel = "showDescriptions" | string;

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

/**

BOOKMARK
{
  "-ME0-1jsB7QVfHW7ZaPQ" : {
    "createdBy" : "QtiwtZ2mZ0esaCwrnAFTQFLGEPe2",
    "id" : "767e3d55-6c4c-4abd-9efe-be8e237f25f6",
    "key" : "-ME0-1jsB7QVfHW7ZaPQ",
    "tagKeys" : [ "-ME0-1jtX75gtZha7oVx", "-ME0-1jtX75gtZha7oVy", "-ME0-1jtX75gtZha7oVz" ],
    "tags" : {
      "-ME0-1jtX75gtZha7oVx" : true,
    },
    "timestamp" : 1596670880824,
    "url" : "https://stackoverflow.com/questions/39712833/firebase-performance-how-many-children-per-node"
  },    
},

TAG
{
  "-ME0-1jtX75gtZha7oVx" : {
    "bookmarks" : {
      "-ME0-1jsB7QVfHW7ZaPQ" : true
    },
    "createdBy" : "QtiwtZ2mZ0esaCwrnAFTQFLGEPe2",
    "id" : "8a48c4da-c9d0-4a05-98c9-cbb99349bc8c",
    "key" : "-ME0-1jtX75gtZha7oVx",
    "timestamp" : 1596670880824,
    "value" : "firebase"
  },    
}
 */
