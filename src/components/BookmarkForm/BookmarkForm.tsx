/******************
  BookmarkForm
 *******************/

// deps
import React, { ReactElement, useState } from "react";
import uuidv4 from "uuid";

// components
import InputField from "../InputField/InputField";
import BaseButton from "../BaseButton/BaseButton";
import AutoSuggest from "../AutoSuggest/AutoSuggest";
import PillButton from "../PillButton/PillButton";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import { TAG_VALIDATOR } from "../../constants";
import { useAppStore } from "../../stores/appStore";
import { useTags } from "../../hooks/useTags";

interface IOwnProps {
  onCreateBookmark?: (bookmarkData: any) => void;
  onUpdateBookmark?: (url: string, tags: string) => void;
  valuesToUpdate?: { url: string; tags: string };
  submitLabel?: string;
  isLoading?: boolean;
}

export default function BookmarkForm({
  onCreateBookmark,
  onUpdateBookmark,
  valuesToUpdate,
  submitLabel = "save",
  isLoading = false,
}: IOwnProps): ReactElement {
  const initialState = {
    url: valuesToUpdate?.url || "",
    tags: valuesToUpdate?.tags || "",
  };

  const [state, setState] = useState(initialState);
  const [_tags, set_tags] = useState<string[]>([]);
  const { uniqueTagNames } = useTags();
  const { addNotification } = useAppStore();

  const { url, tags } = state;
  const root = "BookmarkForm";

  // handleUrlChange
  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: url } = e.currentTarget;
    setState(prevState => ({ ...prevState, url }));
  }

  // handleTagChange
  function handleTagChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: tags } = e.currentTarget;
    setState(prevState => ({ ...prevState, tags }));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = e;

    switch (key) {
      case "Enter":
      case "Tab":
        handleAutoSuggestItemAdd(tags);
        setState(_ => ({ ..._, tags: "" }));
        break;
      default:
        break;
    }
  }

  // processTags
  function processTags(tags: string[]): string[] | boolean {
    if (!tags) return false;
    if (!tags.length) return true;
    return tags.map(tag => tag.replace(TAG_VALIDATOR, "").trim().toLowerCase());
  }

  // handleInvalidInput
  function handleInvalidInput() {
    addNotification({
      message: "URL is required!",
      type: "error",
      timeout: 4000
    });
  }

  // generateNewItem
  function generateNewItem() {
    return {
      id: uuidv4(),
      timestamp: Date.now(),
    };
  }

  // handleSubmit
  function handleSubmit() {
    if (!url || !processTags(_tags)) {
      return handleInvalidInput();
    }

    if (onCreateBookmark) {
      const processedTags = processTags(_tags);
      onCreateBookmark({
        ...generateNewItem(),
        url,
        tags: Array.isArray(processedTags) && processedTags.length
          ? processedTags.map(
              tag => ({ value: tag, ...generateNewItem() })
            )
          : [],
      });
    }

    if (onUpdateBookmark) {
      onUpdateBookmark(url, tags);
    }

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
        />

        <BaseButton
          className="submitButton"
          onClick={handleSubmit}
          label={isLoading ? "Creating..." : submitLabel}
        />
      </div>

      {/* tag suggestions */}
      {_tags.length > 0 && (
        <div className="tagSuggestions">
          {_tags.map(tag => (
            <PillButton
              key={tag}
              label={tag}
              onClick={() => handleAutoSuggestItemDelete(tag)}
            >
              <MaterialIcon icon="close" />
            </PillButton>
          ))}
        </div>
      )}

      {/* auto suggest */}
      {uniqueTagNames.length > 0 && (
        <AutoSuggest
          content={uniqueTagNames.map(name => ({
            id: 0,
            documentId: name,
            Name: name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
            value: name,
            timestamp: Date.now(),
            bookmarks: {}
          }))}
          limit={5}
          onItemClick={handleAutoSuggestItemAdd}
        />
      )}
    </form>
  );
}
