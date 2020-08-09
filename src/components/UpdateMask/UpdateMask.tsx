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

  const initialState = { ...props }; // initial state is an IBookmark

  const [state, setState] = useReducer(
    (state: IBookmark, newState) => ({ ...state, ...newState }),
    initialState
  );

  const { id, timestamp, key: fKey, createdBy, url, tags, tagKeys } = props;

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
          {tags.map(tag => (
            <PillButton
              {...tag}
              fKey={tag.key}
              label={tag.value}
              // TODO use UUID?
              key={tag.id.substring(tag.id.length - 6)}
              onClick={_ =>
                setState({ tags: state.tags.filter(t => t.key !== tag.key) })
              }
            />
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
