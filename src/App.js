
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
        url: input.url,
        tag: input.tag,
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

  render() {
    const {
      bookmarks,
      tags,
      sortedByTag
    } = this.state;

    // let reversedBookmarks = bookmarks.reverse();

    return (
      <div className="wrapper">
        <section className="inputSection">
          <BookmarkForm
            passToParent={this.renderBookmarks}
          />
        </section>

        <section className="tagSection">
          <h4 className="tagSectionHeading">
            tags
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
                mockBookmarks.map((bookmark, i) => {
                  let filter = this.state.sortedByTag;

                  if (filter === '') {
                    return (
                      <li key={i}>
                        <TagItem
                          name={bookmark.tags}
                          count={null}
                          onClick={this.handleTagSorting}
                        />
                      </li>
                    )
                  } else if (filter === bookmark.tags) {
                    return (
                      <li key={i}>
                        <TagItem
                          name={bookmark.tags}
                          count={null}
                          onClick={this.handleTagSorting}
                        />
                      </li>
                    )
                  }
                })
              }
              {/* { */}
              {/*   tags.map((tag, i) => { */}
              {/*     return ( */}
              {/*       <li key={i}> */}
              {/*         <TagItem */}
              {/*           name={tag} */}
              {/*           count={null} */}
              {/*           onClick={(e) => console.log('tag')} */}
              {/*         /> */}
              {/*       </li> */}
              {/*     ) */}
              {/*   }) */}
              {/* } */}
            </ul>
          </aside>
        </section>

        <section className="bookmarkSection">
          <h4 className="bookmarkSectionHeading">
            {`Bookmarks - ${this.state.bookmarks.length}`}
          </h4>

          <main className="bookmarkContainer">
            <ol className="bookmarkList">
              {
                mockBookmarks.map((bookmark, i) => {
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
              {/* { */}
              {/*   reversedBookmarks.map((bookmark, i) => { */}
              {/*     return ( */}
              {/*       <li key={i}> */}
              {/*         <BookmarkItem */}
              {/*           id={bookmark.id} */}
              {/*           url={bookmark.url} */}
              {/*           tag={bookmark.tag} */}
              {/*           timeStamp={bookmark.timeStamp} */}
              {/*         /> */}
              {/*       </li> */}
              {/*     ) */}
              {/*   }) */}
              {/* } */}
            </ol>
          </main>
        </section>
      </div>
    );
  }
}

export default App;
