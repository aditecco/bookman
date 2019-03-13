
/* ---------------------------------
tags reducer
--------------------------------- */

// import actionIDs from '../actions/';

function tags(state = [], action) {
  switch (action.type) {
    // case 'ADD_BOOKMARK':

    // const
    //   { content, id, tags, timestamp } = action,
    //   date = new Date(),
    //   splitTags = tags.split(',');

    // return [
    //     ...state,
    //     {
    //       href: content,
    //       id: Date.now(),
    //       tags: splitTags,
    //       timestamp: date.toLocaleString(),
    //     }
    //   ]
    //   break;

    // case 'EDIT_BOOKMARK':
    //   break;

    // case 'DELETE_BOOKMARK':
    //   break;

    default:
      return state;
  }
}

export default tags;
