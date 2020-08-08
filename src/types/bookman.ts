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
}

export interface IEnrichedContentMeta extends IContentMeta {
  key: string;
  createdBy: string;
}

export interface IBookmark extends IEnrichedContentMeta {
  url: string;
  tags?: string[];
  tagKeys?: string[];
}

export interface ITag extends IEnrichedContentMeta {
  value: string;
}

export interface ISetting {
  //
}

export type TTagBundle = ITag[];

export type TFetchUserBookmarksResponse = "";

export type TFetchUserTagsResponse = "";

/**
 * 
 * {
  createdBy: 'xr44Zf92BaW8P0Mr6WsfdsaYoMS2',
  id: 'b402a4bc-dea6-4ce5-a2ae-52ddac9c901e',
  key: '-ME-tUT5-Ja7Eyu1Ytn4',
  timestamp: 1596669163460,
  tagKeys: [
    '-ME-tUT6LVnHtmJ5anMi',
    '-ME-tUT6LVnHtmJ5anMj',
    '-ME-tUT6LVnHtmJ5anMk'
  ],
  tags: [
    'a',
    'v',
    'c'
  ],
  url: 'tagRefs'
},
 * 
 */
