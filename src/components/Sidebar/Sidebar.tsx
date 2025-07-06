/* ---------------------------------
Sidebar
--------------------------------- */

import React, { ReactElement } from "react";
import { removeDuplicates } from "../../utils";
import BaseButton from "../BaseButton/BaseButton";
import TagItem from "../TagItem/TagItem";
import { TagType } from "../../types/bookman";

interface IOwnProps {
  filteredTags: string[];
  filterHandler;
  filterResetHandler;
  filterKey;
  sortFn?: (arg0, arg1) => number;
  tags: TagType[];
}

export default function Sidebar({
  filteredTags,
  filterHandler,
  filterResetHandler,
  filterKey,
  sortFn = (a, b) => a.value < b.value && -1,
  tags,
}: IOwnProps): ReactElement {
  return (
    <section className="Sidebar">
      <aside className="tagListContainer">
        {!filterKey ? (
          <h4 className="tagSectionHeading">
            {`tags - ${removeDuplicates(tags.map(tag => tag.value)).length}`}
          </h4>
        ) : (
          <BaseButton
            className="clearTagsButton"
            onClick={filterResetHandler}
            onKeyDown={null}
            label="clear tags"
          />
        )}

        <ul className="tagList">
          {!filterKey
            ? [...tags].sort(sortFn).map((tag, i) => {
                return (
                  <li key={i}>
                    <TagItem
                      // count={String(Object.keys(tag.bookmarks).length || "")}
                      name={tag.name}
                      onClick={filterHandler}
                    />
                  </li>
                );
              })
            : filteredTags.map((tag, i) => {
                return (
                  <li key={i}>
                    <TagItem name={tag} />
                  </li>
                );
              })}
        </ul>
      </aside>
    </section>
  );
}
