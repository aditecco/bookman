
/* ---------------------------------
bookmarks reducer
--------------------------------- */

// import actionIDs from '../actions/';

function bookmarks(state = [], action) {
  switch (action.type) {
    case 'ADD_BOOKMARK':

    const
      { url, tags } = action,
      date = new Date(),
      splitTags = tags.split(',')
    ;

    return [
        ...state,
        {
          href: url,
          id: Date.now(),
          tags: splitTags,
          timestamp: date.toLocaleString(),
        }
      ]
      break;

    case 'EDIT_BOOKMARK':
      break;

    case 'DELETE_BOOKMARK':
      break;

    default:
      return state;
  }
}

export default bookmarks;
