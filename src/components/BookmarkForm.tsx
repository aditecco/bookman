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
import { log } from "../utils";

export default function BookmarkForm({ createBookmark, createTag }) {
  const initialState = {
    url: "",
    tags: "",
  };
  const [state, setState] = useState(initialState);

  const { url, tags } = state;
  const root = "BookmarkForm";

  function handleUrlChange(e) {
    let { value: url } = e.target;
    setState(prevState => ({ ...prevState, url }));
  }

  function handleTagChange(e) {
    let { value: tags } = e.target;
    setState(prevState => ({ ...prevState, tags }));
  }

  // TODO
  function processUrl(url) {
    return url;
  }

  function processTags(tags) {
    if (!tags) return true;

    // TODO What if it's just one tag?
    if (!tags.includes(",")) return false;

    // TODO also check that there's exactly 1 comma per word, -1
    // - maybe use an input mask
    // - if there's a comma at the end, strip it
    // - if there's a ,, remove the unneeded comma

    return tags
      .trim()
      .split(",")
      .map(tag => tag.trim());
  }

  function handleInvalidInput() {
    alert(
      "URL is required! -- Or, there's a problem with how tags are formatted."
    );
  }

  function handleSubmit() {
    function newItem(): IContentMeta {
      return {
        id: uuidv4(),
        timestamp: Date.now(),
      };
    }

    /**
     * TO SUBMIT
     *
     * - Valid URL
     * - valid tags if present, or no tags
     */

    if (!url || !processTags(tags)) {
      return handleInvalidInput();
    }

    createBookmark({
      ...newItem(),
      url,
      tags: tags
        ? processTags(tags).map(tag => ({ value: tag, ...newItem() } as ITag))
        : [],
    } as IBookmark);

    // if (tags) {
    //   createTag(
    //     processTags(tags).map(tag => ({ value: tag, ...newItem() } as ITag))
    //   );
    // }

    setState(initialState);
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
          value={tags}
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
