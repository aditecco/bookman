
/******************
  BookmarkItem
*******************/

// deps
import React from 'react';


// comps
import PillButton from './PillButton';


const BookmarkItem = props => {
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

  // tmp!
  var current = 0;

  const moreTags = (e) => {
    const t = [...e.target.closest('div').nextElementSibling.querySelectorAll('li')];
    const increment = 60;

    current += increment;

    for (const el of t) {
      el.style.transition = `transform .3s ease`;
      el.style.transform = `translateX(-${current.toString()}px)`;
    }

    console.log(e.target);
    console.log(current);
  }

  const lessTags = (e) => {
    // the opposite
  }

  const
    root = 'BookmarkItem',
    urlFilter = /https?\:\/\/(?:www\.)?/;


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
          <h4 className={root + "Heading"}>
            {
              url
                .replace(urlFilter, '')
                .split('/')
                .slice(0, 1)
            }
          </h4>
        </header>

        <span className={root + "Content"}>
          {url.replace(urlFilter, '')}
        </span>
      </a>

      <section className={root + "Body"}>
        {/* <h6 className={root + "BodyHeading"}>Tags</h6> */}

        {
          typeof tags !== 'object' ?

          <PillButton
            label={tags}
            href={null}
            onClick={null}
          />
          :
          <>
            {
              (tags.length > 2) &&
              <>
                <div className = {`${root}TagContainerCurtain ${root}TagContainerCurtain--left`}>
                  <a href="#" onClick={lessTags}>
                    Less
                  </a>
                </div>
                <div className={root + "TagContainerCurtain"}>
                  <a href="#" onClick={moreTags}>
                    More
                  </a>
                </div>
              </>
            }


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
          </>
        }
      </section>

      <footer className={root + "Footer"}>
        <div className={root + "TimeStamp"}>
          <time>{timeStamp}</time>
        </div>

        <div className={root + "Controls"}>
          {/* <h6 className={root + "ControlsHeading"}>Controls</h6> */}

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
        </div>
      </footer>
    </article>
  );
}

export default BookmarkItem;
