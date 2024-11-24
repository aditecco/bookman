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

export type AuthorType = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string | null;
  confirmationToken: string | null;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
};

export type BookmarkType = {
  id: number;
  documentId: string;
  URL: string;
  Title?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  Tags?: TagType[];
  Author?: AuthorType;
};

export type TagType = {
  id: number;
  documentId: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type TTagBundle = TagType[];

export type TBookmarkInDB = {
  [k in TEntityKey]: TFirebaseRelationship | null;
} & BookmarkType;

export type TTagInDB = {
  [k in TEntityKey]: TFirebaseRelationship | null;
} & TagType;

export type TTagsInDB = Record<TFirebaseKey, TTagInDB>;

export type TEntityKey = "bookmarks" | "tags" | "users";

export type TFirebaseRelationship = { [k: string]: boolean };

export type TFirebaseKey = string;

export type TSettings = Record<TSettingLabel, boolean>;

export type TSettingLabel = "show_descriptions" | "admin_mode";
