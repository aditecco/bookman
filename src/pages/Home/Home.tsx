/* ---------------------------------
Home
--------------------------------- */

// deps
import React, { useReducer, useEffect } from "react";
import { connect } from "react-redux";
import * as Constants from "../../constants";
import { log, removeDuplicates } from "../../utils";
import {
  createBookmark,
  createTag,
  deleteBookmark,
  signInUser,
  signOutUser,
  signUpUser,
  syncBookmarks,
  syncTags,
  toggleModal,
} from "../../redux/actions";

// components
import BookmarkForm from "../../components/BookmarkForm/BookmarkForm";
import BaseButton from "../../components/BaseButton/BaseButton";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { db } from "../../index";
import SearchWidget from "../../components/SearchWidget/SearchWidget";
import { IBookmark, ITag, TBookmarkInDB } from "../../types/bookman";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IAuthState, IDataTransferState } from "../../types/initial-state";
import ContentGrid from "../../components/ContentGrid/ContentGrid";
import InfoMessage, {
  InfoMessageTypes,
} from "../../components/InfoMessage/InfoMessage";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

interface IGlobalStateProps {
  bookmarks: IBookmark[];
  tags: ITag[];
  authentication: IAuthState;
  dataTransfer: IDataTransferState;
}

interface IOwnProps {}

interface IDispatchProps {
  createBookmark;
  createTag;
  deleteBookmark;
  editBookmark;
  signInUser;
  signOutUser;
  signUpUser;
  syncBookmarks;
  syncTags;
  toggleModal;
}

type TProps = IGlobalStateProps & IDispatchProps & IOwnProps;

function Home({
  authentication,
  bookmarks,
  createBookmark,
  createTag,
  deleteBookmark,
  editBookmark,
  syncBookmarks,
  syncTags,
  signInUser,
  signOutUser,
  signUpUser,
  tags,
  toggleModal,
  dataTransfer,
}: TProps) {
  //
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      error: null,
      searchQuery: "",
      filterKey: "",
      found: null,
    }
  );

  const { error, filterKey, found, searchQuery } = state;
  const filteredTags = removeDuplicates(tags.map(tag => tag.value)).filter(
    val => val === filterKey
  );

  const filteredBookmarks = bookmarks.filter(
    (bookmark: IBookmark) =>
      bookmark.tags && bookmark.tags.map(tag => tag.value).includes(filterKey)
  );

  /**
   * confirmDestructiveAction
   * gets confirmation for destructive actions
   */

  function confirmDestructiveAction(...args) {
    const confirmDialog = window.confirm(Constants.MESSAGE__CONFIRM_DELETION);

    return confirmDialog
      ? deleteBookmark(...args)
      : console.log("Canceled deletion.");
  }

  /**
   * handleSearch
   */

  function handleSearch(e) {
    const { value: searchQuery } = e.currentTarget;
    const result = bookmarks.filter(b => b.url.includes(searchQuery));

    if (result.length) {
      setState({ found: result });
    } else {
      setState({
        error: { message: `No results for ${searchQuery}` },
      });
    }

    setState({ searchQuery });
  }

  /**
   * handleSearchReset
   */

  function handleSearchReset() {
    setState({ searchQuery: "", found: null, error: null });
  }

  /**
   * handleTagFiltering
   * updates state w/ tag filter
   */

  function handleTagFiltering(e) {
    e.preventDefault();

    setState({ filterKey: e.target.innerHTML });
  }

  /**
   * Firebase sync
   */

  useEffect(() => {
    const bookmarksRef = db
      .ref(`/bookmarks`)
      .orderByChild("createdBy")
      .equalTo(authentication.user.uid);
    // .limitToLast(100)

    // const userBookmarksRef = db.ref(
    //   `/users/${authentication.user.uid}/bookmarks`
    // );
    // .orderByChild('timestamp').limitToLast(50);

    const tagsRef = db
      .ref(`/tags`)
      .orderByChild("createdBy")
      .equalTo(authentication.user.uid)
      .limitToLast(50);

    // const userTagsRef = db.ref(`/users/${authentication.user.uid}/tags`);

    // "Your callback will be triggered for the initial data
    // and again whenever the data changes."
    // https://firebase.google.com/docs/database/web/read-and-write

    bookmarksRef.on("child_added", async snap => {
      const bookmark: TBookmarkInDB = snap.val();
      const _tags = [];
      const { tags, tagKeys } = bookmark;

      // enrich bookmarks w/ tag values
      // extracted from the DB.
      // Firebase will ignore empty arrays,
      // so we'll get only tags with a length
      if (tags && tagKeys) {
        const tagsSnap = await tagsRef.once("value");
        const tagValues = tagsSnap.val();

        tagKeys.forEach(k => tagValues[k] && _tags.push(tagValues[k]));
      }

      syncBookmarks({
        ...bookmark,
        ...(_tags.length ? { tags: _tags } : {}),
      });
    });

    tagsRef.on("child_added", snap => syncTags(snap.val()));

    bookmarksRef.on("child_removed", async snap => {
      log("removed!");
    });

    // we turn off the observers
    return () => {
      bookmarksRef.off();
      tagsRef.off();
    };
  }, []);

  return (
    <div className="page Home">
      {/* Navbar */}
      <Navbar onLogoClick={() => console.log("logo click!")} debug={false}>
        <SearchWidget
          className="searchInput"
          placeholder="search…"
          closeIcon="close"
          value={searchQuery}
          onChange={handleSearch}
          onSearchReset={handleSearchReset}
        />

        <Link to="/profile">profile</Link>
      </Navbar>

      {/* inputSection */}
      <section className="inputSection">
        <div className="wrapper">
          <BookmarkForm onCreateBookmark={createBookmark} />
        </div>
      </section>

      {/* content */}
      {error ? (
        <div className="wrapper error">
          <InfoMessage type={InfoMessageTypes.error} body={error.message} />
        </div>
      ) : dataTransfer.loadingBookmarks || dataTransfer.loadingTags ? (
        <Spinner />
      ) : (
        <main className="wrapper mainContentWrapper">
          <Sidebar
            filteredTags={filteredTags}
            filterHandler={handleTagFiltering}
            filterResetHandler={() => setState({ filterKey: "" })}
            filterKey={filterKey}
            tags={tags}
          />

          <ContentGrid
            bookmarks={bookmarks}
            destructiveActionHandler={confirmDestructiveAction}
            editBookmarkHandler={toggleModal}
            filteredBookmarks={filteredBookmarks}
            filterKey={filterKey}
            searchResults={found}
          />
        </main>
      )}

      <Footer>
        <div>
          {authentication.user && "Welcome," + authentication.user.email}

          <div>
            <a href="#" onClick={() => signOutUser()}>
              Logout
            </a>
          </div>
        </div>
      </Footer>
    </div>
  );
}

function mapStateToProps({
  bookmarks,
  tags,
  authentication,
  dataTransfer,
}: IGlobalStateProps) {
  return {
    bookmarks,
    tags,
    authentication,
    dataTransfer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUpUser: (email, password) => dispatch(signUpUser({ email, password })),
    signInUser: (email, password) => dispatch(signInUser({ email, password })),
    signOutUser: () => dispatch(signOutUser()),
    createBookmark: bookmark => dispatch(createBookmark(bookmark)),
    createTag: tags => dispatch(createTag(tags)),
    deleteBookmark: (key, tags) => dispatch(deleteBookmark({ key, tags })),
    syncBookmarks: data => dispatch(syncBookmarks(data)),
    syncTags: data => dispatch(syncTags(data)),
    toggleModal: payload => dispatch(toggleModal(payload)),
  };
}

const WithRedux = connect(mapStateToProps, mapDispatchToProps)(Home);

export default WithRedux;
