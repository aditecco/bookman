
/******************
  App
*******************/

// js deps
import React, { Component } from 'react';


// components
import BookmarkItem from './components/BookmarkItem';
import TagItem from './components/TagItem';
import BookmarkForm from './components/BookmarkForm';
import BaseButton from './components/BaseButton';


// assets
import Actions from './actions';
import * as Constants from './constants';
import mockBookmarks from './data/mockBookmarks';


// styles
import './styles/main.css';


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
        JSON.stringify(Constants.INITIAL_BOOKMARKS, true)
      );
    }
  }


  // adds a bookmark to state, updates localStorage
  addBookmark = (input) => {
    const
      date = new Date(),
      bookmark = {
        id: Date.now(),
        href: input.url,
        tags: input.tags,
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
    let local = JSON.parse(Constants.LOCAL);

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
    this.setState({
      tags: this.state.tags.concat(tag)
    })
  }


  // extracts tags from bookmarks in state
  extractTags = (bookmarks) => {
    let extracted = [];

    bookmarks.map((bookmark) => {
      extracted.push(bookmark.tags);
    });

    return extracted;
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
    let filteredTags = bookmarks.filter(
      (el, i) => el.tags === sortedByTag
    );

    return (
      <div className="wrapper">
        <section className="inputSection">
          <BookmarkForm
            passToParent={this.addBookmark}
          />
        </section>

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

                bookmarks.map((bookmark, i) => {
                  return (
                    <li key={i}>
                      <TagItem
                        name={bookmark.tags}
                        count={null}
                        onClick={this.handleTagSorting}
                      />
                    </li>
                  )
                })
                :
                filteredTags.slice(0, 1).map((bookmark, i) => {
                  return (
                    <li key={i}>
                      <TagItem
                        name={bookmark.tags}
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
                  let filter = this.state.sortedByTag;

                  if (filter === '') {
                    return (
                      <li key={i}>
                        <BookmarkItem
                          id={bookmark.id}
                          url={bookmark.href}
                          tag={bookmark.tags}
                          timeStamp={bookmark.timeStamp}
                          onEditClick={null}
                          onDeleteClick={
                            this.removeBookmark
                          }
                        />
                      </li>
                    )
                  } else if (filter === bookmark.tags) {
                    return (
                      <li key={i}>
                        <BookmarkItem
                          id={bookmark.id}
                          url={bookmark.href}
                          tag={bookmark.tags}
                          timeStamp={bookmark.timeStamp}
                          onEditClick={null}
                          onDeleteClick={
                            this.removeBookmark
                          }
                        />
                      </li>
                    )
                  }
                })
                :
                <span className="blankSlateMessage">No bookmarks! Create one.</span>
              }
            </ol>
          </main>
        </section>
      </div>
    );
  }
}

export default App;
