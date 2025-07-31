"use client";

/* ---------------------------------
Bookmarks Page
--------------------------------- */

import React, { useEffect, useReducer, useRef } from "react";
import * as Constants from "../../../constants";
import { removeDuplicates } from "../../../utils";

// components
import BookmarkForm from "../../../components/BookmarkForm/BookmarkForm";
import ContentGrid from "../../../components/ContentGrid/ContentGrid";
import InfoMessage, {
  InfoMessageTypes,
} from "../../../components/InfoMessage/InfoMessage";
import Spinner from "../../../components/Spinner/Spinner";
import Sidebar from "../../../components/Sidebar/Sidebar";

// hooks
import {
  useBookmarks,
  useInfiniteBookmarks,
} from "../../../hooks/useBookmarks";
import { useTags } from "../../../hooks/useTags";
import { useAuth } from "../../../hooks/useAuth";
import { useAppStore } from "../../../stores/appStore";
import { useUserSettings } from "../../../hooks/useUserSettings";

export default function Bookmarks() {
  const { user } = useAuth();
  const { uniqueTagNames, tagsWithCounts } = useTags();
  const { openModal, setFilterKey, filterKey } = useAppStore();
  const { settings } = useUserSettings();

  // Infinite bookmarks for fetching
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteBookmarks();

  // Regular bookmarks hook for mutations
  const { createBookmark, deleteBookmark, isCreating } = useBookmarks();

  // Flatten bookmarks from all pages
  const bookmarks = data ? data.pages.flatMap(page => page.bookmarks) : [];

  // Infinite scroll sentinel
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      error: null,
      searchQuery: "",
      found: null,
    }
  );

  const { error: localError, filterKey: localFilterKey, found } = state;

  const filteredTags = removeDuplicates(uniqueTagNames).filter(
    val => val === filterKey
  );

  const filteredBookmarks = bookmarks.filter(bookmark => {
    if (bookmark?.tags?.length) {
      return bookmark.tags.map(tag => tag.name).includes(filterKey);
    }
    return false;
  });

  /**
   * confirmDestructiveAction
   * gets confirmation for destructive actions
   */
  function confirmDestructiveAction(bookmarkId: string) {
    const confirmDialog = window.confirm(Constants.MESSAGE__CONFIRM_DELETION);

    return confirmDialog
      ? deleteBookmark(bookmarkId)
      : console.log("Canceled deletion.");
  }

  /**
   * handleTagFiltering
   * updates state w/ tag filter
   */
  function handleTagFiltering(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const tagName = e.currentTarget.textContent || "";
    setFilterKey(tagName);
  }

  /**
   * handleCreateBookmark
   * creates a new bookmark
   */
  function handleCreateBookmark(bookmarkData: any) {
    if (!user) return;

    const bookmarkWithUser = {
      ...bookmarkData,
      user_id: user.id,
    };

    createBookmark(bookmarkWithUser);
  }

  /**
   * handleEditBookmark
   * opens edit modal for bookmark
   */
  function handleEditBookmark(bookmark: any) {
    // TODO: Implement edit modal
    openModal(<div>Edit bookmark: {bookmark.title}</div>);
  }

  if (error || localError) {
    return (
      <div className="wrapper error">
        <InfoMessage
          type={InfoMessageTypes.error}
          body={error?.message || localError?.message || "An error occurred"}
        />
      </div>
    );
  }

  if (!isLoading && !(error || localError))
    return (
      <>
        {/* inputSection */}
        <section className="inputSection">
          <div className="wrapper">
            <BookmarkForm
              onCreateBookmark={handleCreateBookmark}
              isLoading={isCreating}
            />
          </div>
        </section>

        {/* content */}
        {!bookmarks?.length ? (
          <div className="wrapper">
            <InfoMessage
              type={InfoMessageTypes.info}
              body="No bookmarks yet. Create your first one above!"
            />
          </div>
        ) : (
          <main className="wrapper mainContentWrapper">
            <Sidebar
              filteredTags={filteredTags}
              filterHandler={handleTagFiltering}
              filterResetHandler={() => setFilterKey("")}
              filterKey={filterKey}
              tags={tagsWithCounts.map(tag => ({
                id: parseInt(tag.id),
                documentId: tag.id,
                Name: tag.name,
                createdAt: tag.created_at,
                updatedAt: tag.updated_at,
                publishedAt: tag.created_at,
                value: tag.name,
                bookmarks: { count: tag.bookmark_count },
              }))}
            />

            <ContentGrid
              bookmarks={bookmarks.map(bookmark => ({
                id: parseInt(bookmark.id),
                documentId: bookmark.id,
                URL: bookmark.url,
                Title: bookmark.title || undefined,
                createdAt: bookmark.created_at,
                updatedAt: bookmark.updated_at,
                publishedAt: bookmark.created_at,
                locale: null,
                Tags: bookmark.tags.map(tag => ({
                  id: parseInt(tag.id),
                  documentId: tag.id,
                  Name: tag.name,
                  createdAt: tag.created_at,
                  updatedAt: tag.updated_at,
                  publishedAt: tag.created_at,
                })),
              }))}
              destructiveActionHandler={confirmDestructiveAction}
              editBookmarkHandler={handleEditBookmark}
              filteredBookmarks={filteredBookmarks.map(bookmark => ({
                id: parseInt(bookmark.id),
                documentId: bookmark.id,
                URL: bookmark.url,
                Title: bookmark.title || undefined,
                createdAt: bookmark.created_at,
                updatedAt: bookmark.updated_at,
                publishedAt: bookmark.created_at,
                locale: null,
                Tags: bookmark.tags.map(tag => ({
                  id: parseInt(tag.id),
                  documentId: tag.id,
                  Name: tag.name,
                  createdAt: tag.created_at,
                  updatedAt: tag.updated_at,
                  publishedAt: tag.created_at,
                })),
              }))}
              filterKey={filterKey}
              searchResults={found}
              descriptions={settings?.show_descriptions ?? true}
            />
            {/* Infinite scroll sentinel */}
            <div ref={loadMoreRef} style={{ height: 40 }} />
            {isFetchingNextPage && <Spinner />}
          </main>
        )}
      </>
    );

  return <Spinner />;
}
