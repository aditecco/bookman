/* ---------------------------------
Sidebar
--------------------------------- */

import React, { ReactElement } from "react";
import { removeDuplicates } from "../../utils";
import BaseButton from "../BaseButton/BaseButton";
import TagItem from "../TagItem/TagItem";
import { ITag } from "../../types/bookman";

interface IOwnProps {
  filteredTags: string[];
  filterHandler;
  filterResetHandler;
  filterKey;
  tags: ITag[];
}

export default function Sidebar({
  filteredTags,
  filterHandler,
  filterResetHandler,
  filterKey,
  tags,
}: IOwnProps): ReactElement {
  return (
    <section className="tagSection">
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
            ? tags.map((tag, i) => {
                return (
                  <li key={i}>
                    <TagItem name={tag.value} onClick={filterHandler} />
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
