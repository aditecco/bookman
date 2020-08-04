/* ---------------------------------
Home
--------------------------------- */

// deps
import React, { useReducer, useEffect } from "react";
import { connect } from "react-redux";
import * as Constants from "../../constants";
import { log, removeDuplicates } from "../../utils";
import {
  addBookmark,
  addTags,
  createBookmark,
  createTag,
  deleteBookmark,
  editBookmark,
  signInUser,
  signOutUser,
  signUpUser,
  syncBookmarks,
  syncTags,
} from "../../redux/actions";

// components
import BookmarkItem from "../../components/BookmarkItem";
import TagItem from "../../components/TagItem";
import BookmarkForm from "../../components/BookmarkForm";
import BaseButton from "../../components/BaseButton";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db } from "../../index";
import SearchWidget from "../../components/SearchWidget/SearchWidget";

function Home({
  addBookmark,
  addTags,
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
}) {
  //
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      sortedByTag: "",
      uniqueTags: [],
      found: null,
    }
  );

  const { sortedByTag, uniqueTags, found } = state;
  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.tags.includes(sortedByTag)
  );
  const filteredTags = uniqueTags.filter(tag => tag === sortedByTag);

  // updates state w/ tag filter
  function handleTagSorting(e) {
    e.preventDefault();

    let clickedTag = e.currentTarget.innerText;

    setState({ sortedByTag: clickedTag.toLowerCase() });
  }

  // resets tag filter in state
  function resetTagSorting(e) {
    setState({ sortedByTag: "" });
  }

  // gets confirmation for destructive actions
  function confirmDestructiveAction(id) {
    const confirmDialog = window.confirm(Constants.MESSAGE__CONFIRM_DELETION);

    return confirmDialog
      ? deleteBookmark(id)
      : console.log("Canceled deletion.");
  }

  function handleSearch(e) {
    const key = e.target.value;

    const r = bookmarks.filter(b => b.url.includes(key));

    if (r.length > 0) {
      setState({ found: r });
    }
  }

  function handleSearchReset(e) {
    setState({ found: null });
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

    // we turn off the observer
    return () => {
      bookmarksRef.off();
      tagsRef.off();
    };
  }, []);

  // useEffect(() => {
  //   if (bookmarks.length) {
  //     setState({ uniqueTags: bookmarks.map(({ tags }) => tags).flat() });
  //   }
  // }, bookmarks);

  useEffect(() => {
    if (tags.length) {
      setState({ uniqueTags: removeDuplicates(tags) });
      // removeDuplicates( tags.map(tag => tag.toLowerCase()))
    }
  }, tags);

  return (
    <div className="page Home">
      {/* Navbar */}
      <Navbar onLogoClick={() => console.log("logo click!")} debug={false}>
        <BaseButton style={{ visibility: "hidden" }} />

        <SearchWidget
          className="searchInput"
          placeholder="search…"
          onChange={handleSearch}
          onSearchReset={handleSearchReset}
          closeIcon="close"
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
        {/* TAGS */}
        <section className="tagSection">
          <aside className="tagListContainer">
            {!sortedByTag ? (
              <h4 className="tagSectionHeading">
                {`tags - ${uniqueTags.length}`}
              </h4>
            ) : (
              <BaseButton
                className="clearTagsButton"
                onClick={resetTagSorting}
                onKeyDown={null}
                label="clear tags"
              />
            )}

            <ul className="tagList">
              {!sortedByTag
                ? tags.map((tag, i) => {
                    return (
                      <li key={i}>
                        <TagItem
                          name={tag}
                          count={null}
                          onClick={handleTagSorting}
                        />
                      </li>
                    );
                  })
                : filteredTags.map((tag, i) => {
                    return (
                      <li key={i}>
                        <TagItem
                          name={tag}
                          count={null}
                          onClick={handleTagSorting}
                        />
                      </li>
                    );
                  })}
            </ul>
          </aside>
        </section>

        {/* BOOKMARKS */}
        <section className="bookmarkSection">
          <div className="bookmarkContainer">
            <h4 className="bookmarkSectionHeading">
              {sortedByTag
                ? filteredBookmarks.length > 1
                  ? `Showing ${filteredBookmarks.length} bookmarks with tag '${sortedByTag}'`
                  : `Showing ${filteredBookmarks.length} bookmark with tag '${sortedByTag}'`
                : `Bookmarks - ${bookmarks.length}`}
            </h4>

            {bookmarks.length ? (
              <ol className="bookmarkList">
                {!sortedByTag
                  ? !state.found
                    ? bookmarks.map((bookmark, i) => {
                        return (
                          <li className="BookmarkItemContainer" key={i}>
                            <BookmarkItem
                              id={bookmark.id}
                              url={bookmark.url}
                              tags={bookmark.tags}
                              timestamp={bookmark.timestamp}
                              onEditClick={editBookmark}
                              onDeleteClick={confirmDestructiveAction}
                            />
                          </li>
                        );
                      })
                    : state.found.map((bookmark, i) => {
                        return (
                          <li className="BookmarkItemContainer" key={i}>
                            <BookmarkItem
                              id={bookmark.id}
                              url={bookmark.url}
                              tags={bookmark.tags}
                              timestamp={bookmark.timestamp}
                              onEditClick={editBookmark}
                              onDeleteClick={confirmDestructiveAction}
                            />
                          </li>
                        );
                      })
                  : filteredBookmarks.map((bookmark, i) => {
                      return (
                        <li className="BookmarkItemContainer" key={i}>
                          <BookmarkItem
                            id={bookmark.id}
                            url={bookmark.url}
                            tags={bookmark.tags}
                            timestamp={bookmark.timestamp}
                            onEditClick={editBookmark}
                            onDeleteClick={confirmDestructiveAction}
                          />
                        </li>
                      );
                    })}
              </ol>
            ) : (
              <p className="blankSlateMessage">No bookmarks! Create one.</p>
            )}
          </div>
        </section>
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

function mapStateToProps({ bookmarks, tags, authentication }) {
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
    addTags: (tags, id) => dispatch(addTags({ tags, id })),
    deleteBookmark: id => dispatch(deleteBookmark({ id })),
    editBookmark: (id, editedUrl) => dispatch(editBookmark({ id, editedUrl })),
    syncBookmarks: data => dispatch(syncBookmarks(data)),
    syncTags: data => dispatch(syncTags(data)),
  };
}

const WithRedux = connect(mapStateToProps, mapDispatchToProps)(Home);

export default WithRedux;