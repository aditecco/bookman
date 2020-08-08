/* ---------------------------------
actions
--------------------------------- */

import { createAction } from "@reduxjs/toolkit";

type Action = object;

// TODO Create generic error action


// signUpUser
export const signUpUser = createAction<Action>("SIGN_UP_USER");
export const signUpUserPending = createAction<Action>("SIGN_UP_USER_PENDING");
export const signUpUserSuccess = createAction<Action>("SIGN_UP_USER_SUCCESS");
export const signUpUserError = createAction<Action>("SIGN_UP_USER_ERROR");


// signInUser
export const signInUser = createAction<Action>("SIGN_IN_USER");
export const signInUserPending = createAction<Action>("SIGN_IN_USER_PENDING");
export const signInUserSuccess = createAction<Action>("SIGN_IN_USER_SUCCESS");
export const signInUserError = createAction<Action>("SIGN_IN_USER_ERROR");


// signOutUser
export const signOutUser = createAction<Action>("SIGN_OUT_USER");
export const signOutUserPending = createAction<Action>("SIGN_OUT_USER_PENDING");
export const signOutUserSuccess = createAction<Action>("SIGN_OUT_USER_SUCCESS");
export const signOutUserError = createAction<Action>("SIGN_OUT_USER_ERROR");


// createBookmark
export const createBookmark = createAction<Action>("CREATE_BOOKMARK");
export const createBookmarkPending = createAction<Action>("CREATE_BOOKMARK_PENDING");
export const createBookmarkSuccess = createAction<Action>("CREATE_BOOKMARK_SUCCESS");
export const createBookmarkError = createAction<Action>("CREATE_BOOKMARK_ERROR");

// deleteBookmark
export const deleteBookmark = createAction<Action>("DELETE_BOOKMARK");
export const deleteBookmarkPending = createAction<Action>("DELETE_BOOKMARK_PENDING");
export const deleteBookmarkSuccess = createAction<Action>("DELETE_BOOKMARK_SUCCESS");
export const deleteBookmarkError = createAction<Action>("DELETE_BOOKMARK_ERROR");

// createTag
export const createTag = createAction<Action>("CREATE_TAG");
export const createTagPending = createAction<Action>("CREATE_TAG_PENDING");
export const createTagSuccess = createAction<Action>("CREATE_TAG_SUCCESS");
export const createTagError = createAction<Action>("CREATE_TAG_ERROR");


// syncData
export const syncData = createAction<Action>("SYNC_DATA");
export const syncBookmarks = createAction<Action>("SYNC_BOOKMARKS");
export const syncTags = createAction<Action>("SYNC_TAGS");

// -------------------------------------------------------

// 
export const editBookmark = createAction<Action>("EDIT_BOOKMARK");
export const importLocalBookmarks = createAction<Action>("IMPORT_LOCAL_BOOKMARKS");
export const importLocalTags = createAction<Action>("IMPORT_LOCAL_TAGS");





// convertContent
export const convertContent = createAction<Action>("CONVERT_CONTENT");
export const convertContentError = createAction<Action>("CONVERT_CONTENT_ERROR");
export const convertContentPending = createAction<Action>("CONVERT_CONTENT_PENDING");
export const convertContentSuccess = createAction<Action>("CONVERT_CONTENT_SUCCESS");


// createNote
export const createNote = createAction<Action>("CREATE_NOTE");
export const createNotePending = createAction<Action>("CREATE_NOTE_PENDING");
export const createNoteSuccess = createAction<Action>("CREATE_NOTE_SUCCESS");
export const createNoteError = createAction<Action>("CREATE_NOTE_ERROR");





// createRemoteContent
export const createRemoteContent = createAction<Action>("CREATE_REMOTE_CONTENT");
export const createRemoteContentError = createAction<Action>("CREATE_REMOTE_CONTENT_ERROR");
export const createRemoteContentPending = createAction<Action>("CREATE_REMOTE_CONTENT_PENDING");
export const createRemoteContentSuccess = createAction<Action>("CREATE_REMOTE_CONTENT_SUCCESS");


// deleteContent
export const deleteContent = createAction<Action>("DELETE_CONTENT");
export const deleteContentError = createAction<Action>("DELETE_CONTENT_ERROR");
export const deleteContentPending = createAction<Action>("DELETE_CONTENT_PENDING");
export const deleteContentSuccess = createAction<Action>("DELETE_CONTENT_SUCCESS");


// fetchQueryData
export const fetchQueryData = createAction<Action>("FETCH_QUERY_DATA");
export const fetchQueryDataError = createAction<Action>("FETCH_QUERY_DATA_ERROR");
export const fetchQueryDataPending = createAction<Action>("FETCH_QUERY_DATA_PENDING");
export const fetchQueryDataSuccess = createAction<Action>("FETCH_QUERY_DATA_SUCCESS");


// refreshCardData
export const refreshCardData = createAction<Action>("REFRESH_CARD_DATA");
export const refreshCardDataError = createAction<Action>("REFRESH_CARD_DATA_ERROR");
export const refreshCardDataPending = createAction<Action>("REFRESH_CARD_DATA_PENDING");
export const refreshCardDataSuccess = createAction<Action>("REFRESH_CARD_DATA_SUCCESS");


// updateRemoteContent
export const updateRemoteContent = createAction<Action>("UPDATE_REMOTE_CONTENT");
export const updateRemoteContentError = createAction<Action>("UPDATE_REMOTE_CONTENT_ERROR");
export const updateRemoteContentPending = createAction<Action>("UPDATE_REMOTE_CONTENT_PENDING");
export const updateRemoteContentSuccess = createAction<Action>("UPDATE_REMOTE_CONTENT_SUCCESS");


// other
export const createToWatch = createAction<Action>("CREATE_TO_WATCH");
export const createWatched = createAction<Action>("CREATE_WATCHED");
export const deleteLocalContent = createAction<Action>("DELETE_LOCAL_CONTENT");
export const destroyUser = createAction<Action>("DESTROY_USER");
export const fetchAdditionalData = createAction<Action>("FETCH_ADDITIONAL_DATA");
export const filterWatched = createAction<Action>("FILTER_WATCHED");
export const getUser = createAction<Action>("GET_USER");
export const hideNotif = createAction<Action>("HIDE_NOTIF");
export const resetQueryData = createAction<Action>("RESET_QUERY_DATA");
export const setApiKey = createAction<Action>("SET_API_KEY");
export const setAuthState = createAction<Action>("SET_AUTH_STATE");
export const setInitialData = createAction<Action>("SET_INITIAL_DATA");
export const showNotif = createAction<Action>("SHOW_NOTIF");
export const stopLoading = createAction<Action>("STOP_LOADING");
export const toggleModal = createAction<Action>("TOGGLE_MODAL");
export const updateLocalContent = createAction<Action>("UPDATE_LOCAL_CONTENT");
