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

export type BookmarkInDB = {
  [k in EntityKey]: FirebaseRelationship | null;
} & {
  id: string;
  timestamp: number;
  url: string;
  createdBy: string;
};

export type TagInDB = {
  [k in EntityKey]: FirebaseRelationship | null;
} & {
  id: string;
  timestamp: number;
  value: string;
  createdBy: string;
};

export type EntityKey = "bookmarks" | "tags" | "users";

export type FirebaseRelationship = { [k: string]: boolean };
