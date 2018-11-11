
/******************
	Constants
*******************/

import stringify from 'json-stringify-safe';
import mockBookmarks from './data/mockBookmarks';


export const LOCAL = localStorage.getItem('localBookmarks');
export const LOCAL_FOUND = 'Found local bookmarks. Rendering...';
export const LOCAL_NOT_FOUND = 'Local bookmarks not found. Initializing...';
export const INITIAL_BOOKMARKS = stringify([]);
export const TEST_BOOKMARKS = stringify(mockBookmarks);