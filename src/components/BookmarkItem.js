
/******************
  BookmarkItem
*******************/

// js
import React from 'react';


function BookmarkItem(props) {
  const {
    id,
    url,
    tag,
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

        <div className="bookmark-body">
          {tag}
        </div>
      </a>

      <div className="bookmark-controls">
        <ul className="bookmark-controls container">
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
      </div>

      <footer className="bookmark-footer">
        {timeStamp}
      </footer>
    </article>
  );
}

export default BookmarkItem;
