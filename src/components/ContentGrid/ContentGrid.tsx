/* ---------------------------------
ContentGrid
--------------------------------- */

import React, { ReactElement } from "react";
import BookmarkItem from "../BookmarkItem";
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
  return (
    <section className="bookmarkSection">
      <div className="bookmarkContainer">
        <h4 className="bookmarkSectionHeading">
          {filterKey
            ? filteredBookmarks.length > 1
              ? `Showing ${filteredBookmarks.length} bookmarks with tag '${filterKey}'`
              : `Showing ${filteredBookmarks.length} bookmark with tag '${filterKey}'`
            : `Bookmarks - ${bookmarks.length}`}
        </h4>

        {bookmarks.length ? (
          <ol className="bookmarkList">
            {!filterKey
              ? !searchResults
                ? bookmarks.map((bookmark, i) => {
                    return (
                      <li className="BookmarkItemContainer" key={i}>
                        <BookmarkItem
                          id={bookmark.id}
                          url={bookmark.url}
                          tags={bookmark.tags}
                          timestamp={bookmark.timestamp}
                          onEditClick={editBookmarkHandler}
                          onDeleteClick={destructiveActionHandler}
                        />
                      </li>
                    );
                  })
                : searchResults.map((bookmark, i) => {
                    return (
                      <li className="BookmarkItemContainer" key={i}>
                        <BookmarkItem
                          id={bookmark.id}
                          url={bookmark.url}
                          tags={bookmark.tags}
                          timestamp={bookmark.timestamp}
                          onEditClick={editBookmarkHandler}
                          onDeleteClick={destructiveActionHandler}
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
                        onEditClick={editBookmarkHandler}
                        onDeleteClick={destructiveActionHandler}
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
  );
}
