
/* ---------------------------------
tags reducer
--------------------------------- */


// import uuidv3 from 'uuid';
// import uuidv1 from 'uuid';

function tags(state = [], action) {
  switch (action.type) {
    case 'ADD_TAGS':

    const
      { tags, id } = action,
      date = new Date(),
      splitTags = tags.split(',');

    return [
        {
          tags: splitTags,
          id,
          timestamp: date.toLocaleString(),
        },
        ...state,
      ]
      break;

    // case 'EDIT_BOOKMARK':
    //   break;

    // case 'DELETE_BOOKMARK':
    //   break;

    default:
      return state;
  }
}

export default tags;
