/******************
 mockBookmarks


 HOWTO
 =====

 - export a list of bookmarks (this example is based on OneTab)
 - use this regEx to target each line:
 ^https\:\/\/(.*)\s\|\s(.*)$
 - replace w/ this object:
 {
 href: 'https://$1',
 description: '$2',
 extended: '',
 meta: '',
 hash: '',
 time: '',
 shared: '',
 toread: '',
 tags: '$2'
 },

 *******************/

const mockBookmarks = [
  {
    id: 1546734572204,
    href: "https://facelessuser.github.io/MarkdownPreview/",
    tags: ["dev-tools", "markdown"],
    timeStamp: "06/01/2019, 01:29:32",
  },
  {
    id: 1546732367613,
    href: "https://support.apple.com/en-gb/HT204063",
    tags: ["how-to", "tech-support"],
    timeStamp: "06/01/2019, 00:52:47",
  },
  {
    id: 1546731606448,
    href: "https://support.apple.com/en-gb/HT201262",
    tags: ["how-to", "tech-support"],
    timeStamp: "06/01/2019, 00:40:06",
  },
  {
    id: 1546731587571,
    href: "https://support.apple.com/en-gb/HT201295",
    tags: ["how-to", "tech-support"],
    timeStamp: "06/01/2019, 00:39:47",
  },
  {
    id: 1546642584942,
    href: "https://www.howtographql.com/",
    tags: ["how-to", "front-end"],
    timeStamp: "04/01/2019, 23:56:24",
  },
];

export default mockBookmarks;
