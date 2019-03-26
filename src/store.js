
/* ---------------------------------
Redux store
--------------------------------- */

import { createStore, compose } from 'redux';
import rootReducer from './reducers/index';
// import mockBookmarks from './data/mockBookmarks';


const defaultState = { bookmarks: [] };

const store = createStore(
  rootReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
