
/******************
  Bookmark
*******************/

// js
import React from 'react';

function Bookmark(props) {
  const {
    id,
    url,
    tag,
    timeStamp
  } = props;

  return (
    <article
      className='postItem'
      id={id}
    >
      <a
        className="postWrapper"
        href={url}
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
      </a>
    </article>
  );
}

export default Bookmark;
