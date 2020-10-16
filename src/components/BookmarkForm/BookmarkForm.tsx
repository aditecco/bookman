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
import AutoSuggest from "../AutoSuggest/AutoSuggest";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PillButton from "../PillButton/PillButton";

interface IOwnProps {
  onCreateBookmark?;
  onUpdateBookmark?;
  valuesToUpdate?: { url: string; tags: string };
  submitLabel?: string;
}

export default function BookmarkForm({
  onCreateBookmark,
  onUpdateBookmark,
  valuesToUpdate,
  submitLabel = "save",
}: IOwnProps): ReactElement {
  const initialState = {
    url: valuesToUpdate?.url || "",
    tags: valuesToUpdate?.tags || "",
  };

  const [state, setState] = useState(initialState);
  const [_tags, set_tags] = useState<string[]>([]);
  const existingTags = useSelector((state: RootState) => state.tags);

  const { url, tags } = state;
  const root = "BookmarkForm";

  // handleUrlChange
  function handleUrlChange(e) {
    const { value: url } = e.currentTarget;

    setState(prevState => ({ ...prevState, url }));
  }

  // handleTagChange
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

  // TODO processTags
  function processUrl(url) {
    return url;
  }

  // processTags
  function processTags(tags: string): string[] | boolean {
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

  // handleInvalidInput
  function handleInvalidInput() {
    alert(
      "URL is required! -- Or, there's a problem with how tags are formatted."
    );
  }

  // generateNewItem
  function generateNewItem(): IContentMeta {
    return {
      id: uuidv4(),
      timestamp: Date.now(),
    };
  }

  // handleSubmit
  function handleSubmit() {
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

    //  submit rules
    if (!url || !processTags(tags)) {
      return handleInvalidInput();
    }

    // if we are on a create scenario
    if (onCreateBookmark) {
      onCreateBookmark({
        ...generateNewItem(),
        url,
        tags: tags
          ? // @ts-ignore
            processTags(tags).map(
              tag => ({ value: tag, ...generateNewItem() } as ITag)
            )
          : [],
      } as IBookmark);
    }

    // if we are in an update scenario
    if (onUpdateBookmark) {
      onUpdateBookmark(url, tags);
    }

    // we reset nonetheless
    setState(initialState);
  }

  // handleItemClick
  function handleItemClick(tag: string) {
    set_tags(prev_tags => [...prev_tags, tag]);
    setState(_ => ({ ..._, tags: "" }));
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
        >
          {_tags?.length && _tags.map(_tag => <PillButton label={_tag} />)}
        </InputField>

        {state.tags && (
          <AutoSuggest
            content={existingTags.filter(tag => tag.value.startsWith(tags))}
            limit={5}
            onItemClick={handleItemClick}
          />
        )}
      </div>

      <BaseButton
        className="submitButton"
        label={submitLabel}
        onClick={handleSubmit}
      />
    </form>
  );
}
