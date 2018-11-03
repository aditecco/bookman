
/******************
  App
*******************/

// js
import React, { Component } from 'react';

// components
import Bookmark from './Bookmark';
import BookmarkForm from './BookmarkForm';


// assets


// styles
import '../styles/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  renderPost = (input) => {
    const
      date = new Date(),
      post = {
        id: Date.now(),
        url: input.url,
        tag: input.tag,
        timeStamp: date.toLocaleString()
    };

    this.setState({
      posts: this.state.posts.concat(post)
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="wrapper">
        <section className="inputSection">
          <BookmarkForm
            passStateToParent={this.renderPost}
          />
        </section>

        <section className="postSection">
          {
            posts.map((post, i) => {
              return (
                <Bookmark
                  id={post.id}
                  key={i}
                  url={post.url}
                  tag={post.tag}
                  timeStamp={post.timeStamp}
                />
              )
            })
          }
        </section>
      </div>
    );
  }
}

export default App;
