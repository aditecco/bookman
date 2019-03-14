
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

export function editBookmark(id, content) {
  return {
    type: 'EDIT_BOOKMARK',
    id,
    content,
  }
}

export function deleteBookmark(id) {
  return {
    type: 'DELETE_BOOKMARK',
    id,
  }
}
