/* ---------------------------------
AutoSuggest
--------------------------------- */

import React, {
  useState,
  useEffect,
  ReactElement,
  SetStateAction,
} from "react";
import Skeleton from "react-loading-skeleton";
import { ITag } from "../../types/bookman";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

interface OwnProps {
  content: ITag[];
  limit: number;
  onItemClick: (arg: string) => void;
}

export default function AutoSuggest({
  content,
  limit,
  onItemClick,
}: OwnProps): ReactElement {
  const [itemsToShow, setItemsToShow] = useState(limit);

  // useEffect(() => {
  //   // TODO w/ ref
  //   const app: HTMLDivElement | null = document.querySelector(".App");
  //   app.style.overflow = "hidden";

  //   return () => (app.style.overflow = "visible");
  // }, []);

  return !content ? (
    <div className="AutoSuggest">
      <ul className="AutoSuggestContent">
        {Array(5).fill(loadingPlaceholder)}
      </ul>
    </div>
  ) : (
    <div className="AutoSuggest">
      <ul className="AutoSuggestContent">
        {content.slice(0, itemsToShow).map((tag, i) => (
          <li className="AutoSuggestItem wrapper" key={i}>
            <div
              className="AutoSuggestItemLinkTarget"
              onClick={() => onItemClick(tag.value)}
            >
              <h4 className="AutoSuggestItemTitle">{tag.value}</h4>

              <p className="AutoSuggestItemDesc">
                <span className="ItemType">
                  {`${Object.keys(tag.bookmarks)?.length} bookmarks`}
                </span>{" "}
                &mdash;{" "}
                <span className="ItemYear">
                  {new Date(tag.timestamp)?.toLocaleDateString()}
                </span>
              </p>
            </div>
          </li>
        ))}

        {itemsToShow < content.length && (
          <button
            type="button"
            className="AutoSuggestShowMoreButton"
            onClick={() => setItemsToShow(content.length)}
          >
            <MaterialIcon icon="arrow_forward" /> Show more…
          </button>
        )}
      </ul>
    </div>
  );
}

const loadingPlaceholder = (
  <li className="AutoSuggestItem wrapper">
    <div className="AutoSuggestItemLinkTarget">
      <h4 className="AutoSuggestItemTitle">
        <Skeleton />
      </h4>

      <p className="AutoSuggestItemDesc">
        <span className="ItemType">
          <Skeleton />
        </span>

        <span className="ItemYear">
          <Skeleton />
        </span>
      </p>
    </div>
  </li>
);
