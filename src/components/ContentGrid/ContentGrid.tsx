/* ---------------------------------
ContentGrid
--------------------------------- */

import React, { ReactElement, useState } from "react";
import BookmarkItem from "../BookmarkItem/BookmarkItem";
import { IBookmark } from "../../types/bookman";

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
  const [descriptions, toggleDescriptions] = useState(false);

  function bookmarkItemRenderer(bookmark: IBookmark, i: number) {
    return (
      <li className="BookmarkItemContainer" key={i}>
        <BookmarkItem
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
            onClick={() => toggleDescriptions(toggle => !toggle)}
          >
            Toggle descriptions
          </button>
        </header>

        {bookmarks.length ? (
          <ol className="bookmarkList">
            {!filterKey
              ? !searchResults
                ? bookmarks.map(bookmarkItemRenderer)
                : searchResults.map(bookmarkItemRenderer)
              : filteredBookmarks.map(bookmarkItemRenderer)}
          </ol>
        ) : (
          <p className="blankSlateMessage">No bookmarks! Create one.</p>
        )}
      </div>
    </section>
  );
}
