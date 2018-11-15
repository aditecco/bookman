
/******************
  BookmarkItem
*******************/

// deps
import React from 'react';


// comps
import PillButton from './PillButton';


function BookmarkItem(props) {
  const {
    id,
    url,
    tags,
    timeStamp,
    onEditClick,
    onDeleteClick
  } = props;

  const handleDelete = (e) => {
    // console.log(id);
    onDeleteClick(id);
  }

  const root = 'BookmarkItem';


  return (
    <article
      className={root}
      id={id}
    >
      <a
        className={root + "LinkWrapper"}
        href={url}
        target='_blank'
      >
        <header className={root + "Header"}>
          <h4 className={root + "HeaderHeading"}>{url}</h4>
        </header>

      </a>

      <section className={root + "Body"}>
        <h6 className={root + "BodyHeading"}>Tags</h6>

        {
          typeof tags !== 'object' ?

          <PillButton
            label={tags}
            href={null}
            onClick={null}
          />
          :
          <ul className={root + "TagContainer"}>
            {tags.map(
              (tag, i) => {
                return (
                  <li>
                    <PillButton
                      label={tag}
                      href={null}
                    />
                  </li>
                )
              }
            )}
          </ul>
        }
      </section>

      <section className={root + "Controls"}>
        <h6 className={root + "ControlsHeading"}>Controls</h6>

        <ul className={root + "ControlsContainer"}>
          <li className={`${root}ControlsItem ${root}ControlsItem__edit`}>
            <a
              href="#"
              onClick={onEditClick}
            >
              edit
            </a>
          </li>
          <li className={`${root}ControlsItem ${root}ControlsItem__delete`}>
            <a
              href="#"
              onClick={handleDelete}
            >
              delete
            </a>
          </li>
        </ul>
      </section>

      <footer className={root + "Footer"}>
        {timeStamp}
      </footer>
    </article>
  );
}

export default BookmarkItem;
