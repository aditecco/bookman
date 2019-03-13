
/* ---------------------------------
actionCreators
--------------------------------- */

export function addBookmark(url) {
  return {
    type: 'ADD_BOOKMARK',
    url,
    // id,
    // tags,
    // timestamp
  }
}

export function editBookmark(index, content) {
  return {
    type: 'EDIT_BOOKMARK',
    index,
    content,
  }
}

export function deleteBookmark(index) {
  return {
    type: 'DELETE_BOOKMARK',
    index,
  }
}
