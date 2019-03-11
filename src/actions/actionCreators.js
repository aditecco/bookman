
/* ---------------------------------
actionCreators
--------------------------------- */

export function addBookmark(content, id, tags, timestamp) {
  return {
    type: 'ADD_BOOKMARK',
    content,
    id,
    tags,
    timestamp
  }
}

export function editBookmark(index, content) {
  return {
    type: 'EDIT_BOOKMARK',
    index,
    content,
  }
}

export function deleteBookmark(index, content) {
  return {
    type: 'DELETE_BOOKMARK',
    index,
    content,
  }
}
