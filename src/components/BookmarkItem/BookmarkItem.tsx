/******************
  BookmarkItem
*******************/

// deps
import React, { ReactElement } from "react";

// comps
import PillButton from "../PillButton/PillButton";
import { IBookmark } from "../../types/bookman";
import BookmarkForm from "../BookmarkForm/BookmarkForm";
import InputField from "../InputField/InputField";
import { log } from "../../utils";
import { useDispatch } from "react-redux";
import { updateBookmark } from "../../redux/actions";
import UpdateMask from "../UpdateMask/UpdateMask";

type TPropsFromBookmark = Partial<IBookmark>;

interface IOwnProps extends TPropsFromBookmark {
  onEditClick;
  onDeleteClick;
  descriptions?: boolean;
}

const BookmarkItem = ({
  id,
  timestamp,
  _key,
  createdBy,
  url,
  tags,
  tagKeys,
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

  const root = "BookmarkItem";
  const urlFilter = /https?\:\/\/(?:www\.)?/;

  return (
    <article className={root} id={id}>
      <a className={root + "LinkWrapper"} href={url} target="_blank">
        <header className={root + "Header"}>
          <h4 className={root + "Heading"}>
            {url.replace(urlFilter, "").split("/").slice(0, 1)}
          </h4>
        </header>

        {/******************
          URL
        ******************/}

        {descriptions ? (
          <span className={root + "Content"}>
            {url
              .replace(urlFilter, "")
              .split("/")
              .pop()
              .split("-")
              .map(w => w.charAt(0).toUpperCase() + w.substring(1))
              .join(" ")}
          </span>
        ) : (
          <span className={root + "Content"}>{url.replace(urlFilter, "")}</span>
        )}
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
              {tags.map((tag, i) => (
                <li key={i}>
                  <PillButton {...tag} label={tag.value} />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <footer className={root + "Footer"}>
        <div className={root + "TimeStamp"}>
          <time>{new Date(timestamp).toLocaleDateString()}</time>
        </div>

        <div className={root + "Controls"}>
          {/* <h6 className={root + "ControlsHeading"}>Controls</h6> */}

          <ul className={root + "ControlsContainer"}>
            <li className={`${root}ControlsItem ${root}ControlsItem__edit`}>
              <a
                href="#"
                onClick={() =>
                  // this will open the modal
                  // and populate it w/ a form
                  onEditClick({
                    content: (
                      <UpdateMask
                        {...{
                          _key,
                          id,
                          timestamp,
                          createdBy,
                          url,
                          tags,
                          tagKeys,
                        }}
                      />
                    ),
                  })
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

                  onDeleteClick(_key, tagKeys);
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

export default BookmarkItem;
