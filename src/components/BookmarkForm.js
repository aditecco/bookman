
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

  handleSubmit = (e) => {
    let bundledInput = {};
    bundledInput.url = this.state.urlInput;
    bundledInput.tag = this.state.tagInput;

    this.props.passToParent(bundledInput);
    // console.log(bundledInput);

    this.setState({
      urlInput: '',
      tagInput: ''
    });
  }

  render() {
    const id = 'BookmarkForm';
    const {
      urlInput,
      tagInput
    } = this.state;

    return (
      <form className={id}>
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
            label='salva'
            onClick={this.handleSubmit}
          />
      </form>
    );
  }
}

export default BookmarkForm;
