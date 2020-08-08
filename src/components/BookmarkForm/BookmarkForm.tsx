/******************
  BookmarkForm
*******************/

// deps
import React, { useState, ReactElement } from "react";
import uuidv4 from "uuid";

// components
import InputField from "../InputField/InputField";
import BaseButton from "../BaseButton/BaseButton";
import { IContentMeta, IBookmark, ITag } from "../../types/bookman";
import { log } from "../../utils";

interface IOwnProps {
  onCreateBookmark;
}

export default function BookmarkForm({
  onCreateBookmark,
}: IOwnProps): ReactElement {
  const initialState = {
    url: "",
    tags: "",
  };
  const [state, setState] = useState(initialState);

  const { url, tags } = state;
  const root = "BookmarkForm";

  function handleUrlChange(e) {
    const { value: url } = e.currentTarget;

    setState(prevState => ({ ...prevState, url }));
  }

  function handleTagChange(e) {
    const { value: tags } = e.currentTarget;

    setState(prevState => ({ ...prevState, tags }));
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
     *
     * TODO
     * - can't submit only one tag
     * - one tag + comma creates empty tag
     */

    if (!url || !processTags(tags)) {
      return handleInvalidInput();
    }

    onCreateBookmark({
      ...newItem(),
      url,
      tags: tags
        ? processTags(tags).map(tag => ({ value: tag, ...newItem() } as ITag))
        : [],
    } as IBookmark);

    setState(initialState);
  }

  return (
    <form
      className={root}
      // onKeyDown={this.handleKeyDown}
    >
      <div className="inputGroup">
        <InputField
          className="urlInput"
          label="url"
          placeholder="www.example.com"
          value={url}
          onChange={handleUrlChange}
        />

        <InputField
          className="tagInput"
          label="tag(s)"
          placeholder="Linux, JavaScript (comma separated)"
          value={tags}
          onChange={handleTagChange}
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
