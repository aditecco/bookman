/* ---------------------------------
UpdateMask
--------------------------------- */

import React, { ReactElement, useReducer } from "react";
import { useDispatch } from "react-redux";
import { updateBookmark, toggleModal } from "../../redux/actions";
import { IBookmark } from "../../types/bookman";
import BaseButton from "../BaseButton/BaseButton";
import InputField from "../InputField/InputField";
import PillButton from "../PillButton/PillButton";

type TOwnProps = IBookmark;

export default function UpdateMask(props: TOwnProps): ReactElement {
  const dispatch = useDispatch();
  const { _key, id, timestamp, createdBy, url, tags, tagKeys } = props;

  const initialState = { ...props, removedTags: [] };

  const [state, setState] = useReducer(
    (state: IBookmark, newState) => ({ ...state, ...newState }),
    initialState
  );

  return (
    <div className="UpdateMask">
      <InputField
        className="BaseInput"
        value={url}
        onChange={e =>
          setState({
            url: e.target.value,
          })
        }
      />

      {tags && (
        <div className="tagContainer">
          {tags.map((tag, i) => (
            <span key={i}>
              <PillButton
                {...tag}
                label={tag.value}
                onClick={() =>
                  setState({
                    tags: state.tags.filter(t => t._key !== tag._key),
                    tagKeys: state.tagKeys.filter(k => k !== tag._key),
                    removedTags: [...state.removedTags, tag],
                  })
                }
              />
            </span>
          ))}
        </div>
      )}

      <BaseButton
        className="button--outline"
        label="Cancel"
        onClick={() => {
          setState(initialState);
          dispatch(toggleModal());
        }}
      />

      <BaseButton
        label="Update"
        onClick={() =>
          dispatch(updateBookmark({ ...state, updatedAt: Date.now() }))
        }
      />
    </div>
  );
}

{
  /* <>
  <BookmarkForm
    submitLabel="update"
    valuesToUpdate={{
      url,
      tags: tags.map(tag => tag.value).toString(),
    }}
    onUpdateBookmark={
    }
  />

  
    />
  ))}
</> */
}
