/* ---------------------------------
UpdateMask
--------------------------------- */

import React, { ReactElement, useState } from "react";
import BookmarkForm from "../BookmarkForm/BookmarkForm";
import { updateBookmark } from "../../redux/actions";
import PillButton from "../PillButton/PillButton";
import { ITag } from "../../types/bookman";
import { useDispatch } from "react-redux";
import { log } from "../../utils";

interface IOwnProps {
  url: string;
  fKey: string;
  tags: ITag[];
  tagKeys: string[];
}

export default function UpdateMask({
  url,
  fKey,
  tags,
  tagKeys,
}: IOwnProps): ReactElement {
  const dispatch = useDispatch();

  // TODO move all state management here,
  // extract from BookmarkForm
  const [markedTags, setMarkedTags] = useState({});

  return (
    <>
      <BookmarkForm
        submitLabel="update"
        valuesToUpdate={{
          url,
          tags: tags.map(tag => tag.value).toString(),
        }}
        onUpdateBookmark={(newUrl, newTags) =>
          dispatch(
            updateBookmark({
              newUrl,
              // newTags,
              fKey,
              // tagKeys,
              markedTags: Object.keys(markedTags).filter(k => markedTags[k]),
            })
          )
        }
      />

      {tags.map(tag => (
        <PillButton
          {...tag}
          fKey={tag.key}
          label={tag.value}
          // TODO use UUID?
          key={tag.id.substring(tag.id.length - 6)}
          onClick={_ =>
            setMarkedTags(marked => ({
              ...marked,
              [tag.key]: !marked[tag.key],
            }))
          }
        />
      ))}
    </>
  );
}
