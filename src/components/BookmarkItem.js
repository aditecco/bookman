
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
              (tags.length > 1) && < div className = {
                `${root}TagContainerCurtain ${root}TagContainerCurtain--left`
              }
            /> }
            < div className = { root + "TagContainerCurtain" }
            />
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
