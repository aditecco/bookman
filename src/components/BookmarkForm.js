
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
  }

  handleTagChange = (e) => {
    let currentInput = e.target.value;
    this.setState({ tagInput: currentInput });
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
      <form
        className={id}
        onSubmit={this.handleSubmit}
      >
        <InputField
            className='urlInput'
            onChange={this.handleUrlChange}
            placeholder='Your URL'
            value={urlInput}
          />

          <InputField
            className='tagInput'
            onChange={this.handleTagChange}
            placeholder='Your tag'
            value={tagInput}
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
