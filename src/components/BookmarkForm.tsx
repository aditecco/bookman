/******************
  BookmarkForm
*******************/

// deps
import React, { useState } from "react";
import uuidv4 from "uuid";

// components
import InputField from "./InputField";
import BaseButton from "./BaseButton";
import { IContentMeta, IBookmark, ITag } from "../types/bookman";

export default function BookmarkForm({ createBookmark, addTags }) {
  const [state, setState] = useState({
    url: "",
    tag: "",
  });

  const { url, tag } = state;
  const root = "BookmarkForm";

  function handleUrlChange(e) {
    let { value: url } = e.target;
    setState(prevState => ({ ...prevState, url }));
  }

  function handleTagChange(e) {
    let { value: tag } = e.target;
    setState(prevState => ({ ...prevState, tag }));
  }

  function handleEmptyInput() {
    alert("URL is required!");
  }

  function handleSubmit() {
    const newItem: IContentMeta = {
      id: uuidv4(),
      timestamp: Date.now(),
    };

    // only urlInput is required
    if (url) {
      createBookmark({
        ...newItem,
        url,
      } as IBookmark);

      // addTags({
      //   ...newItem,
      //   value: tag,
      // } as ITag);

      setState({
        url: "",
        tag: "",
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
          value={url}
        />

        <InputField
          className="tagInput"
          label="tag(s)"
          onChange={handleTagChange}
          placeholder="Linux, JavaScript (comma separated)"
          value={tag}
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
