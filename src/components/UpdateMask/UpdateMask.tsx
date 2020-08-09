/* ---------------------------------
UpdateMask
--------------------------------- */

import React, { ReactElement, useReducer } from "react";
import { useDispatch } from "react-redux";
import { updateBookmark } from "../../redux/actions";
import { IBookmark } from "../../types/bookman";
import BaseButton from "../BaseButton/BaseButton";
import InputField from "../InputField/InputField";
import PillButton from "../PillButton/PillButton";

type TOwnProps = IBookmark;

export default function UpdateMask(props: TOwnProps): ReactElement {
  const dispatch = useDispatch();

  // TODO move all state management here,
  // extract from BookmarkForm
  const [state, setState] = useReducer(
    (state: IBookmark, newState) => ({ ...state, ...newState }),
    { ...props }
  );

  const { id, timestamp, key: fKey, createdBy, url, tags, tagKeys } = props;

  return (
    <div className="UpdateMask">
      <InputField
        className="BaseInput"
        onChange={e =>
          setState({
            url: e.currentTarget.value,
          })
        }
        value={url}
      />

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

      <BaseButton
        label="Update"
        onClick={() => dispatch(updateBookmark(state))}
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
