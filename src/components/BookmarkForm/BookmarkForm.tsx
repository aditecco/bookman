/******************
  BookmarkForm
 *******************/

// deps
import React, { ReactElement, useState } from "react";
import uuidv4 from "uuid";

// components
import InputField from "../InputField/InputField";
import BaseButton from "../BaseButton/BaseButton";
import { IBookmark, IContentMeta, ITag } from "../../types/bookman";
import AutoSuggest from "../AutoSuggest/AutoSuggest";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import PillButton from "../PillButton/PillButton";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import { TAG_VALIDATOR } from "../../constants";
import { showNotif } from "../../redux/actions";

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
  const dispatch = useDispatch();

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

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = e;

    // TODO key or keyCode?
    switch (key) {
      // case ",": // keyCode: Comma
      case "Enter":
      case "Tab": // keyCode: Enter
        handleAutoSuggestItemAdd(tags);

        // empty the controlled input
        setState(_ => ({ ..._, tags: "" }));
        break;

      default:
        break;
    }
  }

  // TODO processTags
  function processUrl(url) {
    return url;
  }

  // processTags
  function processTags(tags: string[]): string[] | boolean {
    // stop submit if nullish
    if (!tags) return false;

    // allow submit if no tags
    if (!tags.length) return true;

    // default tag processing
    return tags.map(tag => tag.replace(TAG_VALIDATOR, "").trim().toLowerCase());
  }

  // handleInvalidInput
  function handleInvalidInput() {
    // TODO create switch to handle different cases
    dispatch(
      showNotif({
        message: `URL is required!`,
        icon: "error",
        timeout: 4000,
        theme: "dark",
      })
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
     */

    //  submit rules
    if (!url || !processTags(_tags)) {
      return handleInvalidInput();
    }

    // if we are on a create scenario
    if (onCreateBookmark) {
      onCreateBookmark({
        ...generateNewItem(),
        url,
        tags: _tags.length
          ? // @ts-ignore
            processTags(_tags).map(
              tag => ({ value: tag, ...generateNewItem() }) as ITag
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
    set_tags([]);
  }

  // handleItemClick
  function handleAutoSuggestItemAdd(tag: string) {
    set_tags((prev_tags: string[]) => {
      if (prev_tags.find(prevTag => prevTag === tag)) {
        return prev_tags;
      }

      return [...prev_tags, tag];
    });

    // empty the controlled input
    setState(_ => ({ ..._, tags: "" }));
  }

  // handleItemClick
  function handleAutoSuggestItemDelete(tag: string) {
    set_tags((prev_tags: string[]) => {
      const tagToDelete = prev_tags.findIndex(prevTag => prevTag === tag);

      return [
        ...prev_tags.slice(0, tagToDelete),
        ...prev_tags.slice(tagToDelete + 1),
      ];
    });
  }

  return (
    <form className={root}>
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
          placeholder="i.e. JavaScript, Front-end"
          value={tags}
          onChange={handleTagChange}
          onKeyDown={handleTagKeyDown}
        >
          {_tags?.length
            ? _tags.map((_tag, i) => (
                <PillButton
                  key={i}
                  label={_tag}
                  style={i !== _tags.length - 1 ? { marginRight: 6 } : {}}
                  onClick={() => handleAutoSuggestItemDelete(_tag)}
                >
                  <MaterialIcon icon="clear" />
                </PillButton>
              ))
            : null}
        </InputField>

        {state.tags && (
          <AutoSuggest
            content={existingTags.filter(tag => tag.value.startsWith(tags))}
            limit={5}
            onItemClick={handleAutoSuggestItemAdd}
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
