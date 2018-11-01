
/******************
  App
*******************/

// js
import React, { Component } from 'react';

// components
import Bookmark from './Bookmark';


// assets


// styles
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
