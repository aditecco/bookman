
/* ---------------------------------
root reducer
--------------------------------- */

import { combineReducers } from 'redux';
import bookmarks from './bookmarks';
import tags from './tags';


const rootReducer = combineReducers({
  bookmarks,
  tags,
});

export default rootReducer;
