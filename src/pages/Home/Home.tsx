/* ---------------------------------
Home
--------------------------------- */

// deps
import React, { useReducer } from "react";
import { connect } from "react-redux";
import * as Constants from "../../constants";
import { removeDuplicates } from "../../utils";
import {
  createBookmark,
  deleteBookmark,
  toggleModal,
} from "../../redux/actions";

// components
import BookmarkForm from "../../components/BookmarkForm/BookmarkForm";
import { IBookmark, ITag } from "../../types/bookman";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IAuthState, IDataTransferState } from "../../types/initial-state";
import ContentGrid from "../../components/ContentGrid/ContentGrid";
import InfoMessage, {
  InfoMessageTypes,
} from "../../components/InfoMessage/InfoMessage";
import Spinner from "../../components/Spinner/Spinner";
import Layout from "../../components/Layout/Layout";

interface IGlobalStateProps {
  bookmarks: IBookmark[];
  tags: ITag[];
  authentication: IAuthState;
  dataTransfer: IDataTransferState;
}

interface IOwnProps {}

interface IDispatchProps {
  createBookmark;
  deleteBookmark;
  toggleModal;
}

type TProps = IGlobalStateProps & IDispatchProps & IOwnProps;

function Home({
  bookmarks,
  createBookmark,
  dataTransfer,
  deleteBookmark,
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
      error: null,
      searchQuery: "",
      filterKey: "",
      found: null,
    }
  );

  const { error, filterKey, found } = state;
  const filteredTags = removeDuplicates(tags.map(tag => tag.value)).filter(
    val => val === filterKey
  );

  const filteredBookmarks = bookmarks.filter((bookmark: IBookmark) => {
    if (bookmark?.tags?.length) {
      return bookmark.tags.map(tag => tag.value).includes(filterKey);
    }

    return false;
  });

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
   * handleTagFiltering
   * updates state w/ tag filter
   */

  function handleTagFiltering(e) {
    e.preventDefault();

    setState({ filterKey: e.target.innerHTML });
  }

  return (
    <Layout root="Home" hasNav>
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
    </Layout>
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
    createBookmark: bookmark => dispatch(createBookmark(bookmark)),
    deleteBookmark: (key, tags) => dispatch(deleteBookmark({ key, tags })),
    toggleModal: payload => dispatch(toggleModal(payload)),
  };
}

const WithRedux = connect(mapStateToProps, mapDispatchToProps)(Home);

export default WithRedux;
