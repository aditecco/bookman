
/******************
	Constants
*******************/

import stringify from 'json-stringify-safe';
import mockBookmarks from './data/mockBookmarks';


export const LOCAL_BOOKMARKS = localStorage.getItem('localBookmarks');
export const LOCAL_TAGS = localStorage.getItem('localTags');
export const LOCAL_FOUND = 'Found local bookmarks. Rendering...';
export const LOCAL_NOT_FOUND = 'Local bookmarks not found. Initializing...';
export const INITIAL = stringify([]);
export const TEST_BOOKMARKS = stringify(mockBookmarks);
export const MESSAGE__CONFIRM_DELETION = 'Do you really want to delete this bookmark?';
