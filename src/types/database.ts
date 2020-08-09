/* ---------------------------------
database types
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

export type TBookmarkInDB = {
  [k in TEntityKey]: TFirebaseRelationship | null;
} & {
  _key: string;
  id: string;
  timestamp: number;
  url: string;
  createdBy: string;
  tagKeys?: string[];
};

export type TTagInDB = {
  [k in TEntityKey]: TFirebaseRelationship | null;
} & {
  _key: string;
  id: string;
  timestamp: number;
  value: string;
  createdBy: string;
};

export type TEntityKey = "bookmarks" | "tags" | "users";

export type TFirebaseRelationship = { [k: string]: boolean };

export type TFirebaseKey = string;

export type TFirebaseUID = string;

export interface IUserInDB {}
