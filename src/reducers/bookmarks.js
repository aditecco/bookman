
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
        {
          href: url,
          id: Date.now(),
          tags: splitTags,
          timestamp: date.toLocaleString(),
        },
        ...state,
      ];

    case 'EDIT_BOOKMARK':
      // TODO rename consts or use let
      const
        // { id, content } = action,
        // _clone = [...state],
        i = state.findIndex(
          (bookmark) => bookmark.id === action.id)
      ;

      const edited = state[i]['href'] = action.content;

      console.info(`Edited bookmark with ID ${action.id}.`);

      return state;

    case 'DELETE_BOOKMARK':
      const
        { id } = action,
        clone = [...state],
        index = state.findIndex(
          (bookmark) => bookmark.id === id)
      ;

      console.info(`Deleted bookmark with ID ${id}.`);

      return [
        ...clone.slice(0, index),
        ...clone.slice(index + 1, clone.length)
      ];

    default:
      return state;
  }
}

export default bookmarks;
