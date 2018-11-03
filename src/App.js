
/******************
  App
*******************/

// js
import React, { Component } from 'react';

// components
import BookmarkItem from './components/BookmarkItem';
import TagItem from './components/TagItem';
import BookmarkForm from './components/BookmarkForm';


// assets
import mockBookmarks from './data/mockBookmarks';


// styles
import './styles/main.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      tags: []
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

  render() {
    const {
      bookmarks,
      tags
    } = this.state;

    let reversedBookmarks = bookmarks.reverse();

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
            <ul className="tagList">
              {
                mockBookmarks.map((b, i) => {
                  return (
                    <li key={i}>
                      <TagItem
                        name={b.tags}
                        count={null}
                        onClick={(e) => console.log('tag')}
                      />
                    </li>
                  )
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
            bookmarks
          </h4>

          <main className="bookmarkContainer">
            <ol className="bookmarkList">
              {
                mockBookmarks.map((bookmark, i) => {
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
