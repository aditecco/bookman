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

// TODO DRY

export interface IBookmarkInDB {
  id: string;
  timestamp: number;
  url: string;
  tags: IFirebaseRelationship | null;
  createdBy: IFirebaseRelationship | null;
}

export interface ITagInDB {
  id: string;
  timestamp: number;
  value: string;
  bookmarks: IFirebaseRelationship | null;
}

export type TFirebaseKey = string;

export type IFirebaseRelationship = Record<TFirebaseKey, boolean>;
