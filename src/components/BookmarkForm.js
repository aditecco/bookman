
/* ----------------
  BookmarkForm
---------------- */

// js
import React, { Component } from 'react';

// components
import InputField from './InputField';
import BaseButton from './BaseButton';


class BookmarkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlInput: '',
      tagInput: ''
    };
  }

  handleUrlChange = (e) => {
    let currentInput = e.target.value;
    this.setState({ urlInput: currentInput });
  }

  handleTagChange = (e) => {
    let currentInput = e.target.value;
    this.setState({ tagInput: currentInput });
  }

  handleSubmit = (e) => {
    let bundledState = {};
    bundledState.url = this.state.urlInput;
    bundledState.tag = this.state.tagInput;
    this.props.passStateToParent(bundledState);
    // console.log(bundledState);
  }

  render() {
    const id = 'BookmarkForm';

    return (
      <form
        className={id}
        onSubmit={this.handleSubmit}
      >
        <InputField
            className='urlInput'
            placeholder='Your URL'
            onChange={this.handleUrlChange}
          />

          <InputField
            className='tagInput'
            placeholder='Your tag'
            onChange={this.handleTagChange}
          />

          <BaseButton
            className='submitButton'
            label='salva'
            handleSubmit={this.handleSubmit}
          />
      </form>
    );
  }
}

export default BookmarkForm;
