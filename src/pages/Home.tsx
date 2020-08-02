/* ---------------------------------
Home
--------------------------------- */

// deps
import React, { useReducer, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Constants from "../constants";
import { log } from "../utils";
import stringify from "json-stringify-safe";
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
  setInitialData,
} from "../redux/actions";

// components
import BookmarkItem from "../components/BookmarkItem";
import TagItem from "../components/TagItem";
import BookmarkForm from "../components/BookmarkForm";
import BaseButton from "../components/BaseButton";
import PillButton from "../components/PillButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { db } from "../index";

function Home({
  addBookmark,
  addTags,
  authentication,
  bookmarks,
  createBookmark,
  createTag,
  deleteBookmark,
  editBookmark,
  setInitialData,
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
  const filteredBookmarks = filterBookmarks();
  const filteredTags = uniqueTags.filter((tag, i) => tag === sortedByTag);

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

  function findRelationships(source = [], key) {
    const match = source.filter(el => el.tags.includes(key));
    const ids = match.map((el, i) => el.id);

    return ids;
  }

  function filterBookmarks() {
    const filter = state.sortedByTag,
      matches = findRelationships(tags, filter),
      found = [];
    for (const id of matches) {
      found.push(bookmarks.find(bookmark => bookmark.id === id));
    }

    return found;
  }

  // removes duplicates
  function removeDuplicates(duplicates) {
    let deduplicator = new Set(duplicates);
    let deduplicated = [];

    deduplicated = [...deduplicator];
    return deduplicated;
  }

  // collects tags in an array, flattens the array,
  // lowercases all items & removes dupes
  function normalizeTags(tags) {
    const extracted = tags.map((tagObject, i) =>
      tagObject.tags.map((tag, i) => tag)
    );

    const flattened = extracted.concat.apply([], extracted);
    const lowercase = flattened.map(t => t.toLowerCase());
    const unique = removeDuplicates(lowercase);

    console.log("normalizeTags >> unique", unique);

    return unique;
  }

  function handleSearch(e) {
    const key = e.target.value;

    const r = bookmarks.filter(b => b.href.includes(key));

    if (r.length > 0) {
      setState({ found: r });
    }
  }

  function resetSearch(e) {
    setState({ found: null });
  }

  useEffect(() => {
    const bookmarksRef = db.ref(`/bookmarks`);
    const userBookmarksRef = db
      .ref(`/users/${authentication.user.uid}/bookmarks`)
      .limitToLast(10);

    // "Your callback will be triggered for the initial data and again whenever the data changes."
    // https://firebase.google.com/docs/database/web/read-and-write

    userBookmarksRef.on("child_added", snap => {
      bookmarksRef.once("value", bookmarks => {
        setInitialData(bookmarks.val()[snap.key]);
      });
    });

    // we turn off the observer
    return () => userBookmarksRef.off();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar onLogoClick={() => console.log("logo click!")} debug={false}>
        <BaseButton style={{ visibility: "hidden" }} />

        <InputField
          className="searchInput"
          placeholder="search…"
          onChange={handleSearch}
        >
          <BaseButton
            className="searchInputClearButton button--naked"
            onClick={resetSearch}
          >
            <i className="material-icons">close</i>
          </BaseButton>
        </InputField>
      </Navbar>

      {/* inputSection */}
      <section className="inputSection">
        <div className="wrapper">
          <BookmarkForm
            {...{
              bookmarks,
              tags,
              createBookmark,
              createTag,
              addTags,
              deleteBookmark,
              editBookmark,
            }}
          />
        </div>
      </section>

      {/* content */}
      <main className="wrapper mainContentWrapper">
        <section className="tagSection">
          <aside className="tagListContainer">
            {sortedByTag === "" ? (
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
              {sortedByTag === ""
                ? uniqueTags.map((tag, i) => {
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

        <section className="bookmarkSection">
          <div className="bookmarkContainer">
            <h4 className="bookmarkSectionHeading">
              {sortedByTag !== ""
                ? filteredBookmarks.length > 1
                  ? `Showing ${filteredBookmarks.length} bookmarks with tag '${sortedByTag}'`
                  : `Showing ${filteredBookmarks.length} bookmark with tag '${sortedByTag}'`
                : `Bookmarks - ${bookmarks.length}`}
            </h4>

            {bookmarks.length > 0 ? (
              <ol className="bookmarkList">
                {sortedByTag === ""
                  ? state.found === null
                    ? bookmarks.map((bookmark, i) => {
                        return (
                          <li className="BookmarkItemContainer" key={i}>
                            <BookmarkItem
                              id={bookmark.id}
                              url={bookmark.url}
                              tags={tags.filter(tag => tag.id === bookmark.id)}
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
                              tags={tags.filter(tag => tag.id === bookmark.id)}
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
                            tags={tags.filter(tag => tag.id === bookmark.id)}
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

      <div>
        {authentication.user && "Welcome," + authentication.user.email}

        <div>
          <a href="#" onClick={() => signOutUser()}>
            Logout
          </a>
        </div>
      </div>

      <Footer footerInfo="BookMan v0.9 | build xyz | source: https://gitlab.com/aditecco/bookman" />
    </>
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
    setInitialData: data => dispatch(setInitialData(data)),
  };
}

const WithRedux = connect(mapStateToProps, mapDispatchToProps)(Home);

export default WithRedux;
