
/* ---------------------------------
actionCreators
--------------------------------- */

export function addBookmark(url, tags) {
  return {
    type: 'ADD_BOOKMARK',
    url,
    tags,
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
