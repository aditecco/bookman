/* ---------------------------------
Sidebar
--------------------------------- */

import React, { ReactElement } from "react";
import { removeDuplicates } from "../../utils";
import BaseButton from "../BaseButton";
import TagItem from "../TagItem";

interface IOwnProps {
  filteredTags: string[];
  filterHandler;
  filterResetHandler;
  filterKey;
  tags;
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
            {`tags - ${removeDuplicates(tags).length}`}
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
                    <TagItem name={tag} onClick={filterHandler} />
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
