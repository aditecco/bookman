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
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import InfoMessage from "../InfoMessage/InfoMessage";

type TOwnProps = IBookmark;

export default function UpdateMask(props: TOwnProps): ReactElement {
  const dispatch = useDispatch();
  const { _key, id, timestamp, createdBy, url, tags, tagKeys } = props;

  // ...props contains nearly all the properties of a bookmark
  const initialState = { ...props, removedTags: {} };

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );

  return (
    <div className="UpdateMask">
      <header className="UpdateMaskHeader">
        <h4>Edit bookmark</h4>
      </header>

      <div className="UpdateMaskBody">
        <InfoMessage
          body="Write in the text field to edit the URL. Click on a tag to mark it for
        deletion; click again to undo."
        />

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
                  eventClass={
                    state.removedTags[tag._key] ? "PillButton--marked" : ""
                  }
                  onClick={() => {
                    state.removedTags[tag._key]
                      ? setState({
                          removedTags: {
                            ...state.removedTags,
                            [tag._key]: null,
                          },
                          tags: [...state.tags, tag],
                          tagKeys: [...state.tagKeys, tag._key],
                        })
                      : setState({
                          removedTags: {
                            ...state.removedTags,
                            [tag._key]: tag,
                          },
                          tags: state.tags.filter(t => t._key !== tag._key),
                          tagKeys: state.tagKeys.filter(k => k !== tag._key),
                        });
                  }}
                >
                  <MaterialIcon
                    icon={!state.removedTags[tag._key] ? "clear" : "undo"}
                  />
                </PillButton>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="UpdateMaskControls">
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
