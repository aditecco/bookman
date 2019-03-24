
/* ---------------------------------
actionCreators
--------------------------------- */

export function addBookmark(url, id) {
  return {
    type: 'ADD_BOOKMARK',
    url,
    id
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

export function addTags(tags, id) {
  return {
    type: 'ADD_TAGS',
    tags,
    id
  }
}

export function importLocalBookmarks(data) {
  return {
    type: 'IMPORT_LOCAL_BOOKMARKS',
    data,
  }
}

export function importLocalTags(data) {
  return {
    type: 'IMPORT_LOCAL_TAGS',
    data,
  }
}
