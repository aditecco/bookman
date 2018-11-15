
/******************
  App
*******************/

// js deps
import React, { Component } from 'react';
// import stringify from 'json-stringify-safe';


// components
import BookmarkItem from './components/BookmarkItem';
import TagItem from './components/TagItem';
import BookmarkForm from './components/BookmarkForm';
import BaseButton from './components/BaseButton';


// assets
import Actions from './actions';
import * as Constants from './constants';


// styles
import './styles/main.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      // bookmarks: mockBookmarks,
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
        Constants.INITIAL_BOOKMARKS
        // Constants.TEST_BOOKMARKS
      );
    }
  }


  // adds a bookmark to state, updates localStorage
  addBookmark = (input) => {
    const
      date = new Date(),
      splittedTags = input.tags.split(','),
      bookmark = {
        id: Date.now(),
        href: input.url,
        tags: splittedTags,
        timeStamp: date.toLocaleString()
    };

    this.setState({
      bookmarks: this.state.bookmarks.concat(bookmark)
    })

    this.localDispatcher(Actions.create, bookmark);

    // we update tags separately
    this.updateTags(bookmark.tags);
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

    this.localDispatcher(Actions.remove, clone)

    // console.log(`${target} deleted.`);
  }


  // handles localStorage actions
  localDispatcher = (action, payload) => {
    let bookmarks = this.state.bookmarks;
    let local = JSON.parse(localStorage.getItem('localBookmarks'));

    switch (action) {
      case Actions.create:
        let updated = [...local];
        updated.push(payload)
        localStorage.setItem('localBookmarks', JSON.stringify(updated, true));
        console.info('Created new bookmark.')

        break;

      case Actions.edit:
        console.warn('action not set.')
        break;

      case Actions.remove:
        localStorage.setItem('localBookmarks', JSON.stringify(payload, true));
        console.info(`Bookmark deleted.`);

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
    console.log(cloned);

    let flattened = cloned.concat.apply([], cloned);
    console.log(flattened);

    this.setState({ tags: flattened });
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

    let clickedTag = e.target.innerHTML;

    this.setState({ sortedByTag: clickedTag });
    // console.log(clickedTag);
  }


  // resets tag filter in state
  resetTagSorting = (e) => {
    this.setState({ sortedByTag: '' })
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

    return (
      <div className="wrapper">
        <section className="inputSection">
          <BookmarkForm
            passToParent={this.addBookmark}
          />
        </section>

        <div className="content">
          <section className="tagSection">
            <h4 className="tagSectionHeading">
              {`tags - ${tags.length}`}
            </h4>

            <aside className="tagListContainer">
              <BaseButton
                className=''
                onClick={this.resetTagSorting}
                onKeyDown={null}
                label={
                  tags.length > 0 ?
                  'clear tags' : null
                }
              />

              <ul className="tagList">
                {
                  sortedByTag === '' ?

                  tags.sort().map((tag, i) => {
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
            <h4 className="bookmarkSectionHeading">
              {
                sortedByTag !== '' ?
                  filteredTags.length > 1 ?
                  `Showing ${filteredTags.length} bookmarks with tag '${sortedByTag}'`
                  :
                  `Showing ${filteredTags.length} bookmark with tag '${sortedByTag}'`
                :
                `Bookmarks - ${this.state.bookmarks.length}`
              }
            </h4>

            <main className="bookmarkContainer">
              <ol className="bookmarkList">
                {
                  bookmarks.length > 0 ?

                  bookmarks.map((bookmark, i) => {
                    let
                      filter = this.state.sortedByTag,
                      tags = bookmark.tags;

                    const bookmarkComp = (
                      <li key={i}>
                        <BookmarkItem
                          id={bookmark.id}
                          url={bookmark.href}
                          tags={bookmark.tags}
                          timeStamp={bookmark.timeStamp}
                          onEditClick={null}
                          onDeleteClick={
                            this.removeBookmark
                          }
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
                  <span className="blankSlateMessage">No bookmarks! Create one.</span>
                }
              </ol>
            </main>
          </section>
        </div>

      </div>
    );
  }
}

export default App;
