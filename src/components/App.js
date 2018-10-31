
/* ----------------
  App
---------------- */


import React, { Component } from 'react';
import '../styles/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlInput: '',
      tagInput: '',
      posts: []
    }
  }

  handleUrlChange = (e) => {
    // console.log(e.target.value);
    let currentInput = e.target.value;
    this.setState({ urlInput: currentInput })
  }

  handleTagChange = (e) => {
    // console.log(e.target.value);
    let currentInput = e.target.value;
    this.setState({ tagInput: currentInput })
  }

  handleSubmit = (e, primaryInput, secondaryInput) => {
    // console.log(e.target);
    primaryInput = this.state.urlInput;
    secondaryInput = this.state.tagInput;

    const
      date = new Date(),
      post = {
        id: Date.now(),
        url: primaryInput,
        tag: secondaryInput,
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
          <input
            className='urlInput'
            type="text"
            placeholder='url here'
            onChange={this.handleUrlChange}
          />
          <input
            className='tagInput'
            type="text"
            placeholder='tag here'
            onChange={this.handleTagChange}
          />
          <a
            className='submitButton'
            href="#"
            onClick={this.handleSubmit}
          >
            submit
          </a>
        </section>

        <section className="postSection">
          {
            posts.map((post, i) => {
              return (
                <article
                  className='postItem'
                  id={post.id}
                >
                  <a
                    className="postWrapper"
                    href={post.url}
                  >
                    <header className="bookmark-header">
                      <h4>{post.url}</h4>
                    </header>
                    <div className="bookmark-body">
                      {post.tag}
                    </div>
                    <footer className="bookmark-footer">
                      {post.timeStamp}
                    </footer>
                  </a>
                </article>
              )
            })
          }
        </section>
      </div>
    );
  }
}

export default App;
