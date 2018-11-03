
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
    <a
      className="postWrapper"
      href={url}
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

export default Bookmark;
