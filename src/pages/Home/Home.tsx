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
import { IBookmark } from "../../types/bookman";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IAuthState } from "../../types/initial-state";
import ContentGrid from "../../components/ContentGrid/ContentGrid";

interface IGlobalStateProps {
  bookmarks: IBookmark[];
  tags: string[];
  authentication: IAuthState;
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
}: TProps) {
  //
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      searchQuery: "",
      filterKey: "",
      found: null,
    }
  );

  const { filterKey, found, searchQuery } = state;
  const filteredTags = removeDuplicates(tags).filter(tag => tag === filterKey);
  const filteredBookmarks = bookmarks.filter(
    (bookmark: IBookmark) => bookmark.tags && bookmark.tags.includes(filterKey)
  );

  // updates state w/ tag filter
  function handleTagSorting(e) {
    e.preventDefault();

    setState({ filterKey: e.target.innerHTML });
  }

  // gets confirmation for destructive actions
  function confirmDestructiveAction(...args) {
    const confirmDialog = window.confirm(Constants.MESSAGE__CONFIRM_DELETION);

    return confirmDialog
      ? deleteBookmark(...args)
      : console.log("Canceled deletion.");
  }

  function handleSearch(e) {
    const { value: key } = e.currentTarget;
    const result = bookmarks.filter(b => b.url.includes(key));

    if (result.length) {
      setState({ found: result });
    }

    setState({ searchQuery: key });
  }

  function handleSearchReset() {
    setState({ searchQuery: "", found: null });
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
      .equalTo(authentication.user.uid);

    // const userTagsRef = db.ref(`/users/${authentication.user.uid}/tags`);

    // "Your callback will be triggered for the initial data
    // and again whenever the data changes."
    // https://firebase.google.com/docs/database/web/read-and-write

    bookmarksRef.on("child_added", async snap => {
      const bookmark = snap.val();
      const _tags = [];

      // Firebase will ignore empty arrays,
      // so we'll get only tags with a length
      if (bookmark.tags) {
        // we get the Firebase keys for the tags
        const tagKeys = Object.keys(bookmark.tags);
        const tags = await tagsRef.once("value");
        const tagValues = tags.val();

        tagKeys.forEach(k => tagValues[k] && _tags.push(tagValues[k].value));
      }

      syncBookmarks({
        ...bookmark,
        ...(_tags.length ? { tags: _tags } : {}),
      });
    });

    tagsRef.on("child_added", snap => syncTags(snap.val().value));

    bookmarksRef.on("child_removed", async snap => {
      log("removed!");
    });

    // we turn off the observer
    return () => {
      bookmarksRef.off();
      tagsRef.off();
    };
  }, []);

  return (
    <div className="page Home">
      {/* Navbar */}
      <Navbar onLogoClick={() => console.log("logo click!")} debug={false}>
        <BaseButton style={{ visibility: "hidden" }} />

        <SearchWidget
          className="searchInput"
          placeholder="search…"
          closeIcon="close"
          value={searchQuery}
          onChange={handleSearch}
          onSearchReset={handleSearchReset}
        />
      </Navbar>

      {/* inputSection */}
      <section className="inputSection">
        <div className="wrapper">
          <BookmarkForm onCreateBookmark={createBookmark} />
        </div>
      </section>

      {/* content */}
      <main className="wrapper mainContentWrapper">
        <Sidebar
          filteredTags={filteredTags}
          filterHandler={handleTagSorting}
          filterResetHandler={() => setState({ filterKey: "" })}
          filterKey={filterKey}
          tags={tags}
        />

        <ContentGrid
          bookmarks={bookmarks}
          destructiveActionHandler={confirmDestructiveAction}
          // editBookmarkHandler={editBookmark}
          editBookmarkHandler={toggleModal}
          filteredBookmarks={filteredBookmarks}
          filterKey={filterKey}
          searchResults={found}
        />
      </main>

      <Footer
        footerInfo={`BookMan
      ${process.env.REACT_APP_APP_VERSION} ${
          process.env.BUILD_ID && process.env.BUILD_ID.substring(0, 4)
        }`}
      >
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
}: IGlobalStateProps) {
  return {
    bookmarks,
    tags,
    authentication,
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
