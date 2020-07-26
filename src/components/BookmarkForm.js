/******************
  BookmarkForm
*******************/

// deps
import React, { useState } from "react";
import uuidv1 from "uuid";

// components
import InputField from "./InputField";
import BaseButton from "./BaseButton";

export default function BookmarkForm({ addBookmark, addTags }) {
  const [state, setState] = useState({
    urlInput: "",
    tagInput: "",
  });

  const { urlInput, tagInput } = state;
  const root = "BookmarkForm";

  function handleUrlChange(e) {
    let { value: urlInput } = e.target;
    setState(prevState => ({ ...prevState, urlInput }));
  }

  function handleTagChange(e) {
    let { value: tagInput } = e.target;
    setState(prevState => ({ ...prevState, tagInput }));
  }

  function handleEmptyInput() {
    alert("URL is required!");
  }

  function handleSubmit() {
    const id = uuidv1();

    // only urlInput is required
    if (urlInput) {
      addBookmark(urlInput, id);
      addTags(tagInput, id);

      setState({
        urlInput: "",
        tagInput: "",
      });
    } else {
      return handleEmptyInput();
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

  return (
    <form
      className={root}
      // onKeyDown={this.handleKeyDown}
    >
      <div className="inputGroup">
        <InputField
          className="urlInput"
          label="url"
          onChange={handleUrlChange}
          placeholder="www.example.com"
          value={urlInput}
        />

        <InputField
          className="tagInput"
          label="tag(s)"
          onChange={handleTagChange}
          placeholder="Linux, JavaScript (comma separated)"
          value={tagInput}
        />
      </div>

      <BaseButton
        className="submitButton"
        label="save"
        onClick={handleSubmit}
      />
    </form>
  );
}
