
/* ---------------------------------
bookmarks reducer
--------------------------------- */

// import actionIDs from '../actions/';
import uuidv3 from 'uuid';

function bookmarks(state = [], action) {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      const
        { url, tags } = action,
        date = new Date(),
        splitTags = tags.split(',')
      ;

      return [
        {
          href: url,
          id: uuidv3(url, uuidv3.URL),
          tags: splitTags,
          timestamp: date.toLocaleString(),
        },
        ...state,
      ];

    case 'EDIT_BOOKMARK':
      const edited = state.findIndex(
        (bookmark) => bookmark.id === action.id)
      ;

      console.info(`Edited bookmark with ID ${action.id}.`);

      return [
        ...state.slice(0, edited),
        { ...state[edited], href: action.content },
        ...state.slice(edited + 1)
      ];

    case 'DELETE_BOOKMARK':
      const deleted = state.findIndex(
        (bookmark) => bookmark.id === action.id)
      ;

      console.info(`Deleted bookmark with ID ${action.id}.`);

      return [
        ...state.slice(0, deleted),
        ...state.slice(deleted + 1)
      ];

    case 'IMPORT_LOCAL_BOOKMARKS':
      return [
        ...action.data
      ];

    default:
      return state;
  }
}

export default bookmarks;
