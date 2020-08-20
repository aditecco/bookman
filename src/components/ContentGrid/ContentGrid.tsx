/* ---------------------------------
ContentGrid
--------------------------------- */

import React, { ReactElement, useState, useContext } from "react";
import BookmarkCard from "../BookmarkCard/BookmarkCard";
import { IBookmark } from "../../types/bookman";
import { SettingsContext } from "../../Routes";

interface IOwnProps {
  bookmarks: IBookmark[];
  destructiveActionHandler;
  editBookmarkHandler;
  filteredBookmarks: IBookmark[];
  filterKey: string;
  searchResults: IBookmark[];
}

export default function ContentGrid({
  bookmarks,
  destructiveActionHandler,
  editBookmarkHandler,
  filteredBookmarks,
  filterKey,
  searchResults,
}: IOwnProps): ReactElement {
  const [settings, updateSettings] = useContext(SettingsContext);
  const { show_descriptions: descriptions } = settings;

  function bookmarkCardRenderer(bookmark: IBookmark, i: number) {
    return (
      <li className="BookmarkCardContainer" key={i}>
        <BookmarkCard
          {...bookmark}
          descriptions={descriptions}
          onDeleteClick={destructiveActionHandler}
          onEditClick={editBookmarkHandler}
        />
      </li>
    );
  }

  return (
    <section className="ContentGrid">
      <div className="bookmarkContainer">
        <header className="bookmarkSectionHeader">
          <h4 className="bookmarkSectionHeading">
            {filterKey
              ? filteredBookmarks.length > 1
                ? `Showing ${filteredBookmarks.length} bookmarks with tag '${filterKey}'`
                : `Showing ${filteredBookmarks.length} bookmark with tag '${filterKey}'`
              : `Bookmarks - ${bookmarks.length}`}
          </h4>

          <button
            type="button"
            className="toggleButton"
            onClick={() => updateSettings({ show_descriptions: !descriptions })}
          >
            &middot; {descriptions ? "Descriptions on" : "Descriptions off"}
          </button>
        </header>

        {bookmarks.length ? (
          <ol className="bookmarkList">
            {!filterKey
              ? !searchResults
                ? bookmarks.map(bookmarkCardRenderer)
                : searchResults.map(bookmarkCardRenderer)
              : filteredBookmarks.map(bookmarkCardRenderer)}
          </ol>
        ) : (
          <p className="blankSlateMessage">No bookmarks! Create one.</p>
        )}
      </div>
    </section>
  );
}
