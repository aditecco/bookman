
/******************
  BookmarkForm
*******************/

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
    // console.log(currentInput);
  }

  handleTagChange = (e) => {
    let currentInput = e.target.value;
    this.setState({ tagInput: currentInput });
    // console.log(currentInput);
  }

  handleEmptyInput = (e) => {
    alert('URL is required!')
  }

  handleSubmit = (e) => {
    // only urlInput is required
    if (this.state.urlInput !== '') {
      let bundledInput = {};
      bundledInput.url = this.state.urlInput;
      bundledInput.tags = this.state.tagInput;

      this.props.passToParent(bundledInput);
      // console.log(bundledInput);

      this.setState({
        urlInput: '',
        tagInput: ''
      });
    } else {
      return this.handleEmptyInput();
    }
  }

  // handleKeyDown = (e) => {
  //   // e.preventDefault();
  //   console.log(e.key);
  //   console.log(e.target);

  //   const
  //     key = e.key,
  //     target = e.target.classList;

  //   if (key === 'Enter' && target.contains('submitButton')) {
  //     console.log('yo');
  //   }
  // }

  render() {
    const id = 'BookmarkForm';
    const {
      urlInput,
      tagInput
    } = this.state;

    return (
      <form
        className={id}
        // onKeyDown={this.handleKeyDown}
      >
        <InputField
            className='urlInput'
            label='url'
            onChange={this.handleUrlChange}
            placeholder='e.g. www.example.com'
            value={urlInput}
          />

          <InputField
            className='tagInput'
            label='tag(s)'
            onChange={this.handleTagChange}
            placeholder='linux, javascript (comma separated)'
            value={tagInput}
          />

          <BaseButton
            className='submitButton'
            label='save'
            onClick={this.handleSubmit}
          />
      </form>
    );
  }
}

export default BookmarkForm;
