
/******************
  App
*******************/

// js
import React, { Component } from 'react';

// components
import BookmarkItem from './components/BookmarkItem';
import TagItem from './components/TagItem';
import BookmarkForm from './components/BookmarkForm';
import BaseButton from './components/BaseButton';


// assets
import mockBookmarks from './data/mockBookmarks';


// styles
import './styles/main.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: mockBookmarks,
      tags: [],
      sortedByTag: ''
    }
  }

  renderBookmarks = (input) => {
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
      // tags: this.state.tags.concat(bookmark.tag)
    })

    this.updateTags(bookmark.tag);
  }

  updateTags = (tag) => {
    this.setState({
      tags: this.state.tags.concat(tag)
    })
  }

  handleTagSorting = (e) => {
    e.preventDefault();

    let clickedTag = e.target.innerHTML;

    this.setState({ sortedByTag: clickedTag });
    // console.log(e.target);
    console.log(clickedTag);
  }

  resetTagSorting = (e) => {
    this.setState({ sortedByTag: '' })
  }

  persistBookmarks = (bookmarks) => {
    let jsonBookmarks = JSON.stringify(bookmarks, true);
    localStorage.setItem('localBookmarks', jsonBookmarks)

    // bookmarks.forEach((el, i) => {
    //   localStorage.setItem(el.description, el.href);
    // });

    console.warn('Saved to localStorage')
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
        {
          bookmarks.length > 0 ?
          this.persistBookmarks(bookmarks)
          :
          <h4>no bookmarks!</h4>
        }
        <section className="inputSection">
          <BookmarkForm
            passToParent={this.renderBookmarks}
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
              label='clear tags'
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
                bookmarks.map((bookmark, i) => {
                  let filter = this.state.sortedByTag;

                  if (filter === '') {
                    return (
                      <li key={i}>
                        <BookmarkItem
                          id={null}
                          url={bookmark.href}
                          tag={bookmark.tags}
                          timeStamp={null}
                        />
                      </li>
                    )
                  } else if (filter === bookmark.tags) {
                    return (
                      <li key={i}>
                        <BookmarkItem
                          id={null}
                          url={bookmark.href}
                          tag={bookmark.tags}
                          timeStamp={null}
                        />
                      </li>
                    )
                  }
                })
              }
            </ol>
          </main>
        </section>
      </div>
    );
  }
}

export default App;
