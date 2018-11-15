
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
        className={root + "-link-wrapper"}
        href={url}
        target='_blank'
      >
        <header className={root + "-header"}>
          <h4 className={root + "-header-heading"}>{url}</h4>
        </header>

      </a>

      <section className={root + "-body"}>
        <h6 className={root + "-body-heading"}>Tags</h6>

        {
          typeof tags !== 'object' ?

          <PillButton
            label={tags}
            href={null}
            onClick={null}
          />
          :
          <ul className={root + "-tag-container"}>
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

      <section className={root + "-controls"}>
        <h6 className={root + "-controls-heading"}>Controls</h6>

        <ul className={root + "-controls-container"}>
          <li className={`${root}-controls-item ${root}-controls-item__edit`}>
            <a
              href="#"
              onClick={onEditClick}
            >
              edit
            </a>
          </li>
          <li className={`${root}-controls-item ${root}-controls-item__delete`}>
            <a
              href="#"
              onClick={handleDelete}
            >
              delete
            </a>
          </li>
        </ul>
      </section>

      <footer className={root + "-footer"}>
        {timeStamp}
      </footer>
    </article>
  );
}

export default BookmarkItem;
