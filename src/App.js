
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
      bookmarks: [],
      tags: [],
      sortedByTag: ''
    }
  }


  componentWillMount() {
    if (Constants.LOCAL) {
      console.info(Constants.LOCAL_FOUND);
      let parsed = JSON.parse(Constants.LOCAL);

      this.setState(
        {
          bookmarks: parsed,
          tags: this.extractTags(parsed)
        }
      )
    } else {
      console.info(Constants.LOCAL_NOT_FOUND);
      localStorage.setItem(
        'localBookmarks',
        // Constants.INITIAL_BOOKMARKS
        // Constants.TEST_BOOKMARKS
        stringify(this.props.bookmarks)
      );
    }

    console.info(this.props);
  }


  // adds a bookmark to state, updates localStorage
  addBookmark = (input) => {
    const
      date = new Date(),
      splittedTags = input.tags.split(','),
      bookmarks = this.state.bookmarks,
      newBookmark = {
        id: Date.now(),
        href: input.url,
        tags: splittedTags,
        timeStamp: date.toLocaleString()
    };

    let clone = [...bookmarks];
    clone.unshift(newBookmark);
    this.setState({
      // bookmarks: this.state.bookmarks.concat(bookmark)
      bookmarks: clone
    })

    this.localDispatcher(Actions.create, newBookmark);

    // we update tags separately
    this.updateTags(newBookmark.tags);

    // // we add a class that will toggle an animated reveal for the BM item
    // const bookmarkContainer = document.querySelector('.bookmarkList');
    // const bookmarkContainerLength = bookmarkContainer.children.length;

    // if (bookmarkContainerLength >= 1) {
    //   setTimeout(() => {
    //     bookmarkContainer.lastChild.classList.add('visible');
    //     // console.log(bookmarkContainer.lastElementChild);
    //   }, 200);
    // } else {
    //   console.error('Failed to create a new bookmark.');
    // }
  }


  // removes a bookmark from state, updates localStorage
  removeBookmark = (id) => {
    let
      bookmarks = this.state.bookmarks,
      target = bookmarks.findIndex(
      (el) => el.id === id
    );
    // console.log(target);

    let clone = [...bookmarks];
    clone.splice(target, 1);

    this.setState({ bookmarks: clone })

    this.localDispatcher(Actions.remove, clone, { id })

    // console.log(`${target} deleted.`);
  }


  // handles localStorage actions
  localDispatcher = (action, payload, meta = {}) => {
    let bookmarks = this.state.bookmarks;
    let local = JSON.parse(localStorage.getItem('localBookmarks'));

    switch (action) {
      case Actions.create:
        let updated = [...local];
        updated.unshift(payload)
        localStorage.setItem('localBookmarks', JSON.stringify(updated));
        console.info('Created new bookmark.')

        break;

      case Actions.edit:
        console.warn('action not set.')
        break;

      case Actions.remove:
        localStorage.setItem('localBookmarks', JSON.stringify(payload));
        console.info(`Deleted bookmark with ID ${meta.id}.`);

        break;

      default:
        console.warn('no action passed!')
        break;
    }
  }


  // updates tags in state
  updateTags = (tag) => {
    let cloned = [...this.state.tags];
    cloned.push(tag);

    let flattened = cloned.concat.apply([], cloned);

    this.setState({ tags: flattened });

    // console.log(cloned);
    // console.log(flattened);
  }


  // extracts tags from bookmarks in state
  extractTags = (bookmarks) => {
    let
      extracted = [],
      flattened;

    bookmarks.map((bookmark) => {
      extracted.push(bookmark.tags);
    });

    flattened = extracted.concat.apply([], extracted);
    // console.log(flattened);

    return flattened;
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


  // removes duplicates
  removeDuplicates = (duplicates) => {
    let dedupDevice = new Set(duplicates);
    let deduped = [];

    deduped = [...dedupDevice];
    return deduped;
  }


  // gets confirmation for destructive actions
  confirmDestructiveAction = (id) => {
    let confirmDialog = window.confirm(Constants.MESSAGE__CONFIRM_DELETION);

    return confirmDialog ? this.props.deleteBookmark(id) : console.log('Canceled deletion.');
  }


  render() {
    const {
      bookmarks,
      tags,
      sortedByTag
    } = this.state;

    // let reversedBookmarks = bookmarks.reverse();
    let filteredTags = tags.filter(
      (tag, i) => tag === sortedByTag
    );

    let uniqueTags = this.removeDuplicates(tags);

    return (
      <>
        <Navbar
          onLogoClick={() => console.log('logo click!')}
        />

        <section className="inputSection">
          <div className="wrapper">
            <BookmarkForm
              addBookmark={this.props.addBookmark}
            />
          </div>
        </section>

        <main className="wrapper mainContentWrapper">
          <section className="tagSection">
            <aside className="tagListContainer">
              {
                (sortedByTag === '') ?
                (
                  <h4 className="tagSectionHeading">
                    {`tags - ${tags.length}`}
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

                  uniqueTags.sort().map((tag, i) => {
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
                  filteredTags
                    .slice(0, 1)
                    .map((tag, i) => {
                    return (
                      <li key={i}>
                        <TagItem
                          name={tag}
                          count={filteredTags.length}
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
                    filteredTags.length > 1 ?
                    `Showing ${filteredTags.length} bookmarks with tag '${sortedByTag}'`
                    :
                    `Showing ${filteredTags.length} bookmark with tag '${sortedByTag}'`
                  :
                  `Bookmarks - ${this.props.bookmarks.length}`
                }
              </h4>

              <ol className="bookmarkList">
                {
                  this.props.bookmarks.length > 0 ?

                  this.props.bookmarks.map((bookmark, i) => {
                    let
                      filter = this.state.sortedByTag,
                      tags = bookmark.tags;

                    const bookmarkComp = (
                      <li
                        className='BookmarkItemContainer'
                        key={i}
                      >
                        <BookmarkItem
                          id={bookmark.id}
                          url={bookmark.href}
                          tags={bookmark.tags}
                          timestamp={bookmark.timestamp}
                          onDeleteClick={this.confirmDestructiveAction}
                          // {...this.props}
                        />
                      </li>
                    );

                    // console.log(typeof tags)

                    if (filter === '') {
                      return bookmarkComp
                    } else if (
                        typeof tags === 'string'
                        && filter === tags
                      ) {
                      return bookmarkComp
                    } else if (
                        typeof tags === 'object'
                        && tags.includes(filter)
                      ) {
                      return bookmarkComp
                    }
                  })
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
