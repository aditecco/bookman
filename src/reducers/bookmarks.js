
/* ---------------------------------
bookmarks reducer
--------------------------------- */

import actionIDs from '../actions/';

export function bookmarks(state = [], action) {
  switch (action.type) {
    case actionIDs.bookmarks.create:

    const
      { content, id, tags, timestamp } = action,
      date = new Date(),
      splitTags = tags.split(',');

    return [
        ...state,
        {
          href: content,
          id: Date.now(),
          tags: splitTags,
          timestamp: date.toLocaleString(),
        }
      ]
      break;

    case actionIDs.bookmarks.edit:
      break;

    case actionIDs.bookmarks.delete:
      break;

    default:
      return state;
  }

}
