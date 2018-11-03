
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
    timeStamp
  } = props;

  return (
    <a
      className="postWrapper"
      href={url}
      target='_blank'
    >
      <article
        className='postItem'
        id={id}
      >
        <header className="bookmark-header">
          <h4>{url}</h4>
        </header>

        <div className="bookmark-body">
          {tag}
        </div>

        <footer className="bookmark-footer">
          {timeStamp}
        </footer>
      </article>
    </a>
  );
}

export default BookmarkItem;
