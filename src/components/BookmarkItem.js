
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

  return (
    <article
      className='postItem'
      id={id}
    >
      <a
        className="linkWrapper"
        href={url}
        target='_blank'
      >
        <header className="bookmark-header">
          <h4>{url}</h4>
        </header>

        <section className="bookmark-body">
          <h6>Tags</h6>

          {
            typeof tags !== 'object' ?

            <PillButton
              label={tags}
              href={null}
              onClick={null}
            />
            :
            <ul className="tag-container">
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
      </a>

      <section className="bookmark-controls">
        <h6>Controls</h6>

        <ul className="bookmark-controls-container">
          <li className="bookmark-controls-item">
            <a
              href="#"
              className="bookmark-controls__edit"
              onClick={onEditClick}
            >
              edit
            </a>
          </li>
          <li className="bookmark-controls-item">
            <a
              href="#"
              className="bookmark-controls__delete"
              onClick={handleDelete}
            >
              delete
            </a>
          </li>
        </ul>
      </section>

      <footer className="bookmark-footer">
        {timeStamp}
      </footer>
    </article>
  );
}

export default BookmarkItem;
