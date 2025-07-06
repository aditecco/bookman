/******************
  BookmarkCard
 *******************/

// deps
import React, { ReactElement } from "react";

// comps
import PillButton from "../PillButton/PillButton";
import { BookmarkType } from "../../types/bookman";
import { slugToDesc } from "../../utils";
import { URL_FILTER } from "../../constants";

type TPropsFromBookmark = Partial<BookmarkType>;

interface IOwnProps extends TPropsFromBookmark {
  onEditClick;
  onDeleteClick;
  descriptions?: boolean;
}

const BookmarkCard = ({
  id,
  url,
  Author: author,
  Tags: tags,
  Title: title,
  createdAt,
  onEditClick,
  onDeleteClick,
  descriptions,
}: IOwnProps): ReactElement => {
  /* ---------------------------------
  temporary, quick & dirty solution
  --------------------------------- */

  let translateRight = 0;
  // let translateLeft = 0;
  const increment = 60;

  const moreTags = e => {
    e.preventDefault();

    const t = [
      ...e.target.closest("div").nextElementSibling.querySelectorAll("li"),
    ];

    translateRight += increment;

    for (const el of t) {
      el.style.transition = `transform .3s ease`;
      el.style.transform = `translateX(0)`;
      el.style.transform = `translateX(-${translateRight.toString()}px)`;
    }

    // console.log(e.target);
    // console.log(translateRight);
  };

  const lessTags = e => {
    e.preventDefault();

    const t = [
      ...e.target
        .closest("div")
        .nextElementSibling.nextElementSibling.querySelectorAll("li"),
    ];

    for (const el of t) {
      el.style.transition = `transform .3s ease`;
      el.style.transform = `translateX(0)`;
    }

    translateRight = 0;

    // console.log(e.target);
    // console.log(translateLeft);
  };

  const root = "BookmarkCard";

  return (
    <article className={root} id={id}>
      <a className={root + "LinkWrapper"} href={url} target="_blank">
        <header className={root + "Header"}>
          <h4 className={root + "Heading"}>
            {url?.replace?.(URL_FILTER, "")?.split("/")?.slice(0, 1)}
          </h4>

          {/******************
            URL
          ******************/}

          {descriptions ? (
            <h3 className={root + "ContentDescription"}>{slugToDesc(url)}</h3>
          ) : (
            <h3 className={root + "ContentUrl"}>
              {url?.replace?.(URL_FILTER, "")}
            </h3>
          )}
        </header>
      </a>

      <section className={root + "Body"}>
        {/* <h6 className={root + "BodyHeading"}>Tags</h6> */}

        {/******************
          TAGS
        ******************/}
        {tags && (
          <>
            {
              // TODO …
              tags.length > 2 && (
                <>
                  <div
                    className={`${root}TagContainerCurtain ${root}TagContainerCurtain--left`}
                  >
                    <a href="#" onClick={lessTags}>
                      <i className="material-icons">chevron_left</i>
                    </a>
                  </div>
                  <div className={root + "TagContainerCurtain"}>
                    <a href="#" onClick={moreTags}>
                      <i className="material-icons">chevron_right</i>
                    </a>
                  </div>
                </>
              )
            }

            <ul className={root + "TagContainer"}>
              {tags.map?.((tag, i) => (
                <li key={i}>
                  <PillButton {...tag} label={tag.Name} />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <footer className={root + "Footer"}>
        <div className={root + "TimeStamp"}>
          <time>{new Date(createdAt).toLocaleDateString()}</time>
        </div>

        <div className={root + "Controls"}>
          {/* <h6 className={root + "ControlsHeading"}>Controls</h6> */}

          <ul className={root + "ControlsContainer"}>
            <li className={`${root}ControlsItem ${root}ControlsItem__edit`}>
              <a
                href="#"
                onClick={
                  () => {}
                  // this will open the modal
                  // and populate it w/ a form
                  // onEditClick({
                  //   content: (
                  //     <UpdateMask
                  //       {...{
                  //         _key,
                  //         id,
                  //         timestamp,
                  //         createdBy,
                  //         url,
                  //         tags,
                  //         tagKeys,
                  //       }}
                  //     />
                  //   ),
                  // })
                }
              >
                edit
              </a>
            </li>
            <li className={`${root}ControlsItem ${root}ControlsItem__delete`}>
              {/* TODO should be a button */}
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();

                  // onDeleteClick(_key, tagKeys);
                }}
              >
                delete
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </article>
  );
};

export default BookmarkCard;
