/* ---------------------------------
Sidebar
--------------------------------- */

import React, { ReactElement } from "react";
import { removeDuplicates } from "../../utils";
import BaseButton from "../BaseButton/BaseButton";
import TagItem from "../TagItem/TagItem";

interface TagWithCount {
  id: number;
  documentId: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  value: string;
  bookmarks?: { count: number } | Record<string, any>;
}

interface IOwnProps {
  filteredTags: string[];
  filterHandler: (e: React.MouseEvent<HTMLElement>) => void;
  filterResetHandler: () => void;
  filterKey: string;
  sortFn?: (arg0: TagWithCount, arg1: TagWithCount) => number;
  tags: TagWithCount[];
}

export default function Sidebar({
  filteredTags,
  filterHandler,
  filterResetHandler,
  filterKey,
  sortFn = (a, b) => a.value < b.value ? -1 : 1,
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
            label="clear tags"
          />
        )}

        <ul className="tagList">
          {!filterKey
            ? [...tags].sort(sortFn).map((tag, i) => {
                const count = tag.bookmarks?.count || 
                  (typeof tag.bookmarks === 'object' && tag.bookmarks ? Object.keys(tag.bookmarks).length : 0);
                return (
                  <li key={i}>
                    <TagItem
                      count={String(count)}
                      name={tag.value}
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
