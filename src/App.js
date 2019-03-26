
/******************
  App
*******************/

// js deps
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';
import stringify from 'json-stringify-safe';


// components
import BookmarkItem from './components/BookmarkItem';
import TagItem from './components/TagItem';
import BookmarkForm from './components/BookmarkForm';
import BaseButton from './components/BaseButton';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


// assets
import Actions from './actions/actionIDs';
import * as Constants from './constants';


// styles
import './styles/main.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedByTag: '',
      uniqueTags: [],
    }
  }


  componentWillMount() {
    if (Constants.LOCAL_BOOKMARKS && Constants.LOCAL_TAGS) {
      console.info(Constants.LOCAL_FOUND);

      const parsed = {
        bookmarks: [...JSON.parse(Constants.LOCAL_BOOKMARKS)],
        tags: [...JSON.parse(Constants.LOCAL_TAGS)],
      }

      this.props.importLocalBookmarks(parsed.bookmarks);
      this.props.importLocalTags(parsed.tags);

    } else {
      console.info(Constants.LOCAL_NOT_FOUND);

      localStorage.setItem(
        'localBookmarks',
        Constants.INITIAL
        // Constants.TEST_BOOKMARKS
      );
      localStorage.setItem(
        'localTags',
        Constants.INITIAL
      );
    }
  }

  componentDidMount() {
    const fetchTags = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.props.tags);
      }, 999);
    });

    fetchTags.then((data) => {
      const extracted = data.map(
        (tagObject, i) => tagObject.tags.map(
          (tag, i) => tag
        )
      )

      const flattened = extracted.concat.apply([], extracted);

      const unique = this.removeDuplicates(flattened);
      this.setState({ uniqueTags: unique })

      console.info('fetchTags: resolved!');
      console.log('>> Promise', data);
      console.log('>> extracted', extracted);
      console.log('>> flattened', flattened);
      console.log('>> uniqueTags', this.state.uniqueTags);
    })
  }


  componentDidUpdate(prevProps) {
    const { bookmarks, tags } = this.props;
    const localBookmarks = JSON.parse(Constants.LOCAL_BOOKMARKS);
    const localTags = JSON.parse(Constants.LOCAL_TAGS);
    const updated = {
      bookmarks: [...bookmarks],
      tags: [...tags],
    }

    // if (bookmarks !== prevProps.bookmarks)
    if ({ bookmarks, tags } !== prevProps) {
      localStorage.setItem('localBookmarks', JSON.stringify(updated.bookmarks));
      localStorage.setItem('localTags', JSON.stringify(updated.tags));

      console.info('Updated localStorage.')
    }
  }


  // updates state w/ tag filter
  handleTagSorting = (e) => {
    e.preventDefault();

    let clickedTag = e.currentTarget.innerText;

    this.setState({ sortedByTag: clickedTag.toLowerCase() });
  }


  // resets tag filter in state
  resetTagSorting = (e) => {
    this.setState({ sortedByTag: '' })
  }


  // gets confirmation for destructive actions
  confirmDestructiveAction = (id) => {
    const confirmDialog = window.confirm(Constants.MESSAGE__CONFIRM_DELETION);

    return confirmDialog ? this.props.deleteBookmark(id) : console.log('Canceled deletion.');
  }


  findRelationships = (source = [], key) => {
    const match = source.filter((el) => el.tags.includes(key));
    const ids = match.map((el, i) => el.id);

    return ids;
  }


  filterBookmarks = () => {
    const
      { bookmarks, tags } = this.props,
      filter = this.state.sortedByTag,
      matches = this.findRelationships(tags, filter),
      found = []
    ;

    for (const id of matches) {
      found.push(bookmarks.find((bookmark) => bookmark.id === id));
    }

    // console.log('>> matches', matches);
    // console.log('>> filter', filter)
    // console.log('>> found', found);

    return found;
  }


  // removes duplicates
  removeDuplicates = (duplicates) => {
    let deduplicator = new Set(duplicates);
    let deduplicated = [];

    deduplicated = [...deduplicator];
    return deduplicated;
  }


  /* ---------------------------------
    Render
  --------------------------------- */

  render() {
    const
      { sortedByTag } = this.state,
      { bookmarks, tags } = this.props,
      filteredBookmarks = this.filterBookmarks(),
      { uniqueTags } = this.state
    ;

    const filteredTags = uniqueTags.filter(
      (tag, i) => tag === sortedByTag
    );


    return (
      <>
        <Navbar
          onLogoClick={() => console.log('logo click!')}
        />

        <section className="inputSection">
          <div className="wrapper">
            <BookmarkForm {...this.props} />
          </div>
        </section>

        <main className="wrapper mainContentWrapper">
          <section className="tagSection">
            <aside className="tagListContainer">
              {
                (sortedByTag === '') ?
                (
                  <h4 className="tagSectionHeading">
                    {`tags - ${tags.length + 1}`}
                  </h4>
                )
                :
                (<BaseButton
                  className='clearTagsButton'
                  onClick={this.resetTagSorting}
                  onKeyDown={null}
                  label='clear tags'
                />)
              }

              <ul className="tagList">
                {
                  sortedByTag === '' ?

                  uniqueTags.map((tag, i) => {
                    return (
                      <li key={i}>
                        <TagItem
                          name={tag}
                          count={null}
                          onClick={this.handleTagSorting}
                        />
                      </li>
                    )
                  })

                  :

                  filteredTags.map((tag, i) => {
                      return (
                        <li key={i}>
                          <TagItem
                            name={tag}
                            count={null}
                            onClick={this.handleTagSorting}
                          />
                        </li>
                      )
                  })
                }
              </ul>
            </aside>
          </section>

          <section className="bookmarkSection">
            <div className="bookmarkContainer">
              <h4 className="bookmarkSectionHeading">
                {
                  sortedByTag !== '' ?
                    filteredBookmarks.length > 1 ?
                    `Showing ${filteredBookmarks.length} bookmarks with tag '${sortedByTag}'`
                    :
                    `Showing ${filteredBookmarks.length} bookmark with tag '${sortedByTag}'`
                  :
                  `Bookmarks - ${bookmarks.length}`
                }
              </h4>

              <ol className="bookmarkList">
                {
                  bookmarks.length > 0 ?

                    sortedByTag === '' ?
                    (
                      bookmarks.map((bookmark, i) => {
                        return (
                          <li
                            className='BookmarkItemContainer'
                            key={i}
                          >
                            <BookmarkItem
                              id={bookmark.id}
                              url={bookmark.href}
                              tags={tags.filter((tag) => tag.id === bookmark.id)}
                              timestamp={bookmark.timestamp}
                              onEditClick={this.props.editBookmark}
                              onDeleteClick={this.confirmDestructiveAction}
                            />
                          </li>
                        );
                      })
                    )

                    :

                    (
                      filteredBookmarks.map((bookmark, i) => {
                        return (
                          <li
                            className='BookmarkItemContainer'
                            key={i}
                          >
                            <BookmarkItem
                              id={bookmark.id}
                              url={bookmark.href}
                              tags={tags.filter((tag) => tag.id === bookmark.id)}
                              timestamp={bookmark.timestamp}
                              onEditClick={this.props.editBookmark}
                              onDeleteClick={this.confirmDestructiveAction}
                            />
                          </li>
                        );
                      })
                    )

                  :

                  <li className="blankSlateMessage">No bookmarks! Create one.</li>
                }
              </ol>
            </div>
          </section>
        </main>

        <Footer
          footerInfo='BookMan v0.9 | build xyz | source: https://gitlab.com/aditecco/bookman'
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookmarks: state.bookmarks,
    tags: state.tags,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const WithRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default WithRedux;
