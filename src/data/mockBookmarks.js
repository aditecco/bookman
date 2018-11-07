
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
    href: 'https://launchpad.net/deja-dup',
    description: 'Déjà Dup in Launchpad',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Déjà'
  },
  {
    href: 'https://github.com/gnunn1/tilix',
    description: 'GitHub - gnunn1/tilix: A tiling terminal emulator for Linux using GTK+ 3',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://hyper.is/#installation',
    description: 'Hyper™',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Hyper'
  },
  {
    href: 'https://gnunn1.github.io/tilix-web/manual/vteconfig/',
    description: 'Tilix: VTE Configuration',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Tilix'
  },
  {
    href: 'https://www.slant.co/tags/linux',
    description: 'Linux Product Recommendations - Slant',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Linux'
  },
  {
    href: 'https://www.slant.co/topics/1900/~total-commander-alternatives-for-linux-and-osx',
    description: '11 Best Total Commander alternatives for Linux and OSX as of 2018 - Slant',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Best'
  },
  {
    href: 'https://www.slant.co/topics/2002/~backup-programs-for-linux',
    description: '11 Best backup programs for Linux as of 2018 - Slant',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Best'
  },
  {
    href: 'https://www.inkdrop.info/',
    description: 'Note-taking App with Robust Markdown Editor - Inkdrop',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Note'
  },
  {
    href: 'https://github.com/gnunn1/tilix',
    description: 'GitHub - gnunn1/tilix: A tiling terminal emulator for Linux using GTK+ 3',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://packages.ubuntu.com/bionic/tilix',
    description: 'Ubuntu – Details of package tilix in bionic',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Ubuntu'
  },
  {
    href: 'https://dev.to/fenetikm/saving-time-with-a-preset-tmux-setup-3j04?utm_source=additional_box&utm_medium=internal&utm_campaign=regular&booster_org=',
    description: 'Saving time with a preset Tmux setup - DEV Community 👩‍💻👨‍💻',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Saving'
  },
  {
    href: 'https://cerebroapp.com/',
    description: 'Cerebro App – open-source productivity booster with a brain',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Cerebro'
  },
  {
    href: 'https://github.com/KELiON/cerebro',
    description: 'GitHub - KELiON/cerebro: Open-source productivity booster with a brain',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/lubien/awesome-cerebro',
    description: 'GitHub - lubien/awesome-cerebro: Curated list of Cerebro plugins and resources',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://www.jetbrains.com/research/devecosystem-2018/ | The State of Developer Ecosystem 2018 - Infographic',
    description: 'JetBrains',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'JetBrains'
  },
  {
    href: 'https://gnunn1.github.io/tilix-web/#packages',
    description: 'Tilix: A tiling terminal emulator',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Tilix'
  },
  {
    href: 'https://packages.ubuntu.com/bionic/tilix',
    description: 'Ubuntu – Details of package tilix in bionic',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Ubuntu'
  },
  {
    href: 'https://thelocehiliosan.github.io/yadm/docs/overview',
    description: 'Overview - yadm',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Overview'
  },
  {
    href: 'https://github.com/clvv/fasd',
    description: 'GitHub - clvv/fasd: Command-line productivity booster, offers quick access to files and directories, inspired by autojump, z and v.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/gokcehan/lf',
    description: 'GitHub - gokcehan/lf: Terminal file manager',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/jbernard/pwgen',
    description: 'GitHub - jbernard/pwgen: Generate pronounceable passwords',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://linux.die.net/man/1/pwgen',
    description: 'pwgen(1): make pronounceable passwords - Linux man page',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'pwgen'
  },
  {
    href: 'https://github.com/andreafrancia/trash-cli',
    description: 'GitHub - andreafrancia/trash-cli: Command line interface to the freedesktop.org trashcan.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/sindresorhus/opn-cli',
    description: 'GitHub - sindresorhus/opn-cli: A better node-open. Opens stuff like websites, files, executables. Cross-platform.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/cbednarski/hostess',
    description: 'GitHub - cbednarski/hostess: An idempotent command-line utility for managing your /etc/hosts file.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/thlorenz/doctoc',
    description: 'GitHub - thlorenz/doctoc: 📜 Generates table of contents for markdown files inside local git repository. Links are compatible with anchors generated by github or other sites.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/sgentle/caniuse-cmd',
    description: 'GitHub - sgentle/caniuse-cmd: Caniuse command line tool',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/python-gitlab/python-gitlab',
    description: 'GitHub - python-gitlab/python-gitlab: Python wrapper for the GitLab API',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://devdocs.egoist.rocks/',
    description: 'DevDocs Desktop',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'DevDocs'
  },
  {
    href: 'https://www.getpostman.com/pricing | Postman',
    description: 'Plans & Pricing',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Plans'
  },
  {
    href: 'https://ulauncher.io/',
    description: 'Ulauncher — Application launcher for Linux 🐧',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Ulauncher'
  },
  {
    href: 'https://github.com/Ulauncher/Ulauncher/issues',
    description: 'Issues · Ulauncher/Ulauncher · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Issues'
  },
  {
    href: 'https://www.slant.co/tags/linux',
    description: 'Linux Product Recommendations - Slant',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Linux'
  },
  {
    href: 'https://gnometerminator.blogspot.com/p/introduction.html | Introduction',
    description: 'Terminator',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Terminator'
  },
  {
    href: 'https://github.com/brpaz/my-linux-setup',
    description: 'GitHub - brpaz/my-linux-setup: List of applications and tools installed on my Linux Machine',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://fabiocolacio.github.io/Marker/',
    description: 'https://fabiocolacio.github.io/Marker/',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: ''
  },
  {
    href: 'https://github.com/gleitz/howdoi',
    description: 'GitHub - gleitz/howdoi: instant coding answers via the command line',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://www.producthunt.com/topics/linux',
    description: 'Linux topic on Product Hunt',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Linux'
  },
  {
    href: 'https://www.stickermule.com/products/unixstickers-pro-pack',
    description: 'Unixstickers - Pro pack - Sticker Mule',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Unixstickers'
  },
  {
    href: 'https://getstream.io/winds/?ref=producthunt',
    description: 'Free Open Source Podcast and RSS App built by GetStream.io',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Free'
  },
  {
    href: 'https://hyper.is/',
    description: 'Hyper™',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Hyper™'
  },
  {
    href: 'https://caret.io/?ref=producthunt',
    description: 'Caret - Markdown Editor for Mac / Windows / Linux',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Caretx'
  },
  {
    href: 'https://moeditor.js.org/',
    description: 'Moeditor — Your all-purpose markdown editor',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Moeditor'
  },
  {
    href: 'https://fromscratch.rocks/',
    description: 'FromScratch - auto saving scratchpad',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'FromScratch'
  },
  {
    href: 'https://github.com/saf-dmitry/taskpaper-mode',
    description: 'GitHub - saf-dmitry/taskpaper-mode: Emacs TaskPaper Mode',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://melpa.org/#/getting-started',
    description: 'Getting Started - MELPA',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Getting'
  },
  {
    href: 'https://github.com/melpa/melpa',
    description: 'GitHub - melpa/melpa: Recipes and build machinery for the biggest Emacs package repo',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://elementaryos.stackexchange.com/questions/871/how-to-install-fish-shell',
    description: 'pantheon terminal - How to install Fish shell - elementary OS Stack Exchange',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'pantheon'
  },
  {
    href: 'https://github.com/fish-shell/fish-shell/issues/669',
    description: 'chsh does not recognize fish as a shell · Issue #669 · fish-shell/fish-shell · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'chsh'
  },
  {
    href: 'https://forum.snapcraft.io/t/where-is-a-snap-stored-and-how-can-i-change-that/3194',
    description: 'Where is a snap stored and how can I change that? - other - snapcraft.io',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Where'
  },
  {
    href: 'https://github.com/sergeche/emmet-sublime#tab-key-handler',
    description: 'GitHub - sergeche/emmet-sublime: Emmet for Sublime Text',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/P233/Syntax-highlighting-for-Sass',
    description: 'GitHub - P233/Syntax-highlighting-for-Sass: A Sublime Text 3 package for highlighting both Sass and SCSS syntax.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://github.com/borela/naomi',
    description: 'GitHub - borela/naomi: Sublime Text enhanced syntax highlighting for JavaScript ES6/ES7/ES2015/ES2016/ES2017+, Babel, FlowType, React JSX, Styled Components, HTML5, SCSS3, PHP 7, phpDoc, PHPUnit, MQL4. Basic: Git config files.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://stackoverflow.com/questions/572549/difference-between-git-add-a-and-git-add',
    description: 'git add - Difference between "git add -A" and "git add ." - Stack Overflow',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'git'
  },
  {
    href: 'https://stackoverflow.com/questions/2419249/how-can-i-stage-and-commit-all-files-including-newly-added-files-using-a-singl',
    description: 'git - How can I stage and commit all files, including newly added files, using a single command? - Stack Overflow',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'git'
  },
  {
    href: 'https://docs.gitlab.com/ee/ssh/README.html | GitLab and SSH keys',
    description: 'GitLab',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitLab'
  },
  {
    href: 'https://stackoverflow.com/questions/33101962/how-to-create-a-new-gitlab-repo-from-my-existing-local-git-repo-using-cli',
    description: 'How to create a new gitlab repo from my existing local git repo, using CLI? - Stack Overflow',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'How to'
  },
  {
    href: 'https://docs.gitlab.com/ee/gitlab-basics/create-project.html | How to create a project in GitLab',
    description: 'GitLab',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitLab'
  },
  {
    href: 'https://www.reddit.com/r/commandline/comments/6t1nem/linuxbrew_the_homebrew_package_manager_for_linux/',
    description: 'Linuxbrew - The Homebrew package manager for Linux : commandline',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Linuxbrew'
  },
  {
    href: 'https://news.ycombinator.com/item?id=13515962 | Finding an Alternative to Mac OS X – Part 2',
    description: 'Hacker News',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Hacker News'
  },
  {
    href: 'https://github.com/pichillilorenzo/JavaScriptEnhancements/wiki/Installation',
    description: 'Installation · pichillilorenzo/JavaScriptEnhancements Wiki · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Installation'
  },
  {
    href: 'https://news.ycombinator.com/item?id=9346464 | Linuxbrew – A fork of Homebrew for Linux',
    description: 'Hacker News',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Hacker News'
  },
  {
    href: 'https://github.com/Linuxbrew/brew/issues',
    description: 'Issues · Linuxbrew/brew · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Issues'
  },
  {
    href: 'https://css-tricks.com/turn-sublime-text-3-into-a-javascript-ide/ | Turn Sublime Text 3 into a JavaScript IDE',
    description: 'CSS-Tricks',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'CSS-Tricks'
  },
  {
    href: 'https://css-tricks.com/sublime-text-front-end-developers/ | Sublime Text for Front End Developers',
    description: 'CSS-Tricks',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'CSS-Tricks'
  },
  {
    href: 'https://bitwarden.com/ | Open Source Password Management Solutions',
    description: 'Bitwarden',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Bitwarden'
  },
  {
    href: 'https://elementaryos.stackexchange.com/questions/7889/use-macos-style-modifier-keys?noredirect=1&lq=1',
    description: 'keyboard - Use macOS-style modifier keys - elementary OS Stack Exchange',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'keyboard'
  },
  {
    href: 'https://www.quattroruote.it/listino/',
    description: 'Listino Prezzi Automobili - Quattroruote.it',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Listino'
  },
  {
    href: 'https://www.drivek.it/volkswagen/golf/1-0-tsi-63kw-trendline-bmt-1000115846/',
    description: 'Volkswagen Nuova Golf 1.0 TSI 63kW Trendline BMT',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Volkswagen'
  },
  {
    href: 'https://www.google.com/search?hl=en&q=duplicato%20patente#cns=1',
    description: 'duplicato patente - Google Search',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'duplicato'
  },
  {
    href: 'https://duckduckgo.com/?q=firefox+elementary+ugly+font+rendering&t=canonical&ia=web',
    description: 'DuckDuckGo — Privacy, simplified.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'DuckDuckGo'
  },
  {
    href: 'https://superuser.com/questions/1034372/atrocious-font-rendering-in-firefox-on-linux',
    description: 'Atrocious font rendering in Firefox on Linux - Super User',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Atrocious'
  },
  {
    href: 'https://unsplash.com/search/photos/abstract | Best 100+ Abstract Pictures [HD]',
    description: 'Download Free Images on Unsplash',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Download'
  },
  {
    href: 'https://duckduckgo.com/?q=changing+libreoffice+ui+on+linux&t=canonical&ia=web',
    description: 'DuckDuckGo — Privacy, simplified.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'DuckDuckGo'
  },
  {
    href: 'https://www.debugpoint.com/2016/08/quick-tip-change-the-default-libreoffice-look-and-feel/',
    description: '[Quick Tip] Change the default LibreOffice Look and Feel',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Change'
  },
  {
    href: 'https://duckduckgo.com/?q=elementary+dark+theme&t=canonical&ia=web',
    description: 'DuckDuckGo — Privacy, simplified.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'DuckDuckGo'
  },
  {
    href: 'https://github.com/elementary-tweaks/elementary-tweaks',
    description: 'GitHub - elementary-tweaks/elementary-tweaks: elementary OS customization tool',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://duckduckgo.com/?q=disappearing+partition+on+linux&t=canonical&ia=web',
    description: 'DuckDuckGo — Privacy, simplified.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'DuckDuckGo'
  },
  {
    href: 'https://storybook.js.org/',
    description: 'Storybook - UI dev environment you\'ll love to use',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Storybook'
  },
  {
    href: 'https://www.google.com/search?hl=en&q=linux%20enable%20external%20dvd%20drive',
    description: 'linux enable external dvd drive - Google Search',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'linux'
  },
  {
    href: 'https://askubuntu.com/questions/783472/ubuntu-16-04-lts-not-recognising-external-dvd-drive',
    description: 'usb - Ubuntu 16.04 LTS not recognising external DVD drive - Ask Ubuntu',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'usb'
  },
  {
    href: 'https://www.google.com/search?hl=en&q=linux%20mount%20Initio%20Corporation%20INIC%2D1511L%20PATA%20Bridge',
    description: 'linux mount Initio Corporation INIC-1511L PATA Bridge - Google Search',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'linux'
  },
  {
    href: 'https://www.google.com/search?hl=en&q=linuxbrew%20upgrade%20building%20only%20from%20source',
    description: 'linuxbrew upgrade building only from source - Google Search',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'linuxbrew'
  },
  {
    href: 'https://news.ycombinator.com/item?id=9346464 | Linuxbrew – A fork of Homebrew for Linux',
    description: 'Hacker News',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Hacker News'
  },
  {
    href: 'https://www.google.com/search?hl=en&ei=h1KcW-O-M4Wma7jHsBg&q=linuxbrew+Bottle+installation+failed%3A+building+from+source&oq=linuxbrew+Bottle+installation+failed%3A+building+from+source&gs_l=psy-ab.3..0i22i30k1.1378.1378.0.1553.1.1.0.0.0.0.82.82.1.1.0....0...1c..64.psy-ab..0.1.81....0.ZkbegU_hIkM',
    description: 'linuxbrew Bottle installation failed: building from source - Google Search',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'linuxbrew'
  },
  {
    href: 'https://github.com/Linuxbrew/brew/issues/480',
    description: 'Brew has lost the ability to install/upgrade packages from bottles or source · Issue #480 · Linuxbrew/brew · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Brew'
  },
  {
    href: 'https://github.com/Linuxbrew/brew/wiki/troubleshooting',
    description: 'Troubleshooting · Linuxbrew/brew Wiki · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Troubleshooting'
  },
  {
    href: 'https://www.google.com/search?hl=en&q=customizing%20elementary%20os',
    description: 'customizing elementary os - Google Search',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'customizing'
  },
  {
    href: 'https://itsfoss.com/things-to-do-after-installing-elementary-os-loki/ | 11 Things To Do After Installing Elementary OS 0.4 Loki',
    description: 'It\'s FOSS',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'FOSS'
  },
  {
    href: 'https://gist.github.com/miere/7cfea42203c80450b3f633b25b41199a',
    description: 'Elementary OS Loki - Customization · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Elementary'
  },
  {
    href: 'https://www.addictivetips.com/ubuntu-linux-tips/customize-the-pantheon-desktop/',
    description: 'How To Customize The Pantheon Desktop',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'How To'
  },
  {
    href: 'https://elementaryos.stackexchange.com/questions/8055/how-to-customize-wingpanel-in-elementary-os-0-4-loki',
    description: 'system - How to customize wingpanel in elementary OS 0.4 Loki? - elementary OS Stack Exchange',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'system'
  },
  {
    href: 'https://www.youtube.com/watch?v=ihxwpOAnRjU',
    description: 'Install Numix theme + Icon Pack for Elementary Os Loki (v0.4) - YouTube',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Install'
  },
  {
    href: 'https://elementaryos.stackexchange.com/',
    description: 'elementary OS Stack Exchange',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'elementary'
  },
  {
    href: 'https://duckduckgo.com/?q=searching+a+package+on+apt-get&t=canonical&ia=qa',
    description: 'searching a package on apt-get at DuckDuckGo',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'searching'
  },
  {
    href: 'https://unix.stackexchange.com/',
    description: '(5) Unix & Linux Stack Exchange',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Unix'
  },
  {
    href: 'https://www.google.com/search?hl=en&q=linux%20dev%20environment',
    description: 'linux dev environment - Google Search',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'linux'
  },
  {
    href: 'https://code.tutsplus.com/tutorials/a-linux-developers-setup--cms-22138',
    description: 'A Linux Developer’s Setup',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Linux'
  },
  {
    href: 'https://github.com/creationix/nvm',
    description: 'GitHub - creationix/nvm: Node Version Manager - Simple bash script to manage multiple active node.js versions',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://wiki.gnome.org/',
    description: 'Home - GNOME Wiki!',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Home'
  },
  {
    href: 'https://dev.to/brpaz/my-linux-development-environment-of-2018-ch7',
    description: 'My Linux Development Environment of 2018',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Linux'
  },
  {
    href: 'https://snapcraft.io/sublime-text',
    description: 'Sublime Text - Linux software in the Snap Store',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Sublime Text'
  },
  {
    href: 'https://github.com/bevry/cson',
    description: 'GitHub - bevry/cson: CoffeeScript-Object-Notation. Same as JSON but for CoffeeScript objects.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://launchpad.net/caffeine',
    description: 'Caffeine in Launchpad',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Caffeine'
  },
  {
    href: 'https://github.com/hluk/CopyQ',
    description: 'GitHub - hluk/CopyQ: Clipboard manager with advanced features',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'GitHub'
  },
  {
    href: 'https://getmailspring.com/',
    description: 'Mailspring - The best free email app',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Mailspring'
  },
  {
    href: 'https://cerebroapp.com/',
    description: 'Cerebro App – open-source productivity booster with a brain',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Cerebro'
  },
  {
    href: 'https://boostnote.io/ | Boostnote',
    description: 'Boost Happiness, Productivity, and Creativity.',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Boost'
  },
  {
    href: 'https://duckduckgo.com/?q=pbcopy+for+linux&t=canonical&ia=qa',
    description: 'pbcopy for linux at DuckDuckGo',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'pbcopy'
  },
  {
    href: 'https://github.com/Linuxbrew/brew/wiki/troubleshooting',
    description: 'Troubleshooting · Linuxbrew/brew Wiki · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Troubleshooting'
  },
  {
    href: 'https://github.com/mattpker/pm2-slack/issues/18',
    description: 'Warning fsevents@1.1.2: The platform "linux" is incompatible with this module · Issue #18 · mattpker/pm2-slack · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Warning'
  },
  {
    href: 'https://stackoverflow.com/questions/18709422/where-are-the-default-packages-in-sublime-text-3-on-ubuntu',
    description: 'sublimetext3 - Where are the default packages in Sublime Text 3 on Ubuntu? - Stack Overflow',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'sublimetext3'
  },
  {
    href: 'https://addons.mozilla.org/en-US/firefox/addon/onetab/?src=search',
    description: 'OneTab – Add-ons for Firefox',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'OneTab'
  },
  {
    href: 'https://www.ctrl.blog/entry/bitwarden-3m-update',
    description: 'Update: 3 months with Bitwarden - Ctrl blog',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Update'
  },
  {
    href: 'https://askubuntu.com/questions/831923/how-to-create-desktop-shortcut-for-firefox-or-other-applications',
    description: '14.04 - How to create desktop shortcut for Firefox or other applications? - Ask Ubuntu',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'How to'
  },
  {
    href: 'https://help.ubuntu.com/community/Repositories/CommandLine',
    description: 'Repositories/CommandLine - Community Help Wiki',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Repositories'
  },
  {
    href: 'https://bitwarden.com/ | Open Source Password Management Solutions',
    description: 'Bitwarden',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Bitwarden'
  },
  {
    href: 'https://github.com/autokey/autokey/wiki/Beginners-Guide',
    description: 'Beginners Guide · autokey/autokey Wiki · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Beginners'
  },
  {
    href: 'https://docs.snapcraft.io/configuration-in-snaps/510',
    description: 'Configuration in snaps - Documentation for snaps: Universal Linux packages',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Configuration'
  },
  {
    href: 'https://www.google.com/search?q=create+desktop+launcher+for+snap+packages',
    description: 'create desktop launcher for snap packages - Cerca con Google',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'create'
  },
  {
    href: 'https://github.com/autokey/autokey/wiki/Installing#debian-and-derivatives',
    description: 'Installing · autokey/autokey Wiki · GitHub',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Installing'
  },
  {
    href: 'https://forum.snapcraft.io/t/sudo-snap-install-or-just-snap-install/3909',
    description: '"sudo snap install" or just "snap install"? - snapd - snapcraft.io',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: '"sudo'
  },
  {
    href: 'https://forum.snapcraft.io/t/desktop-snaps-do-not-appear-in-the-dash-menu-on-gnome-in-17-10-final-beta/2340/11',
    description: 'Desktop snaps do not appear in the dash/menu on gnome in 17.10 final beta - snapd - snapcraft.io',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Desktop'
  },
  {
    href: 'https://forum.snapcraft.io/t/how-to-install-a-snap-application-in-multiple-versions-from-multiple-channels/2692/3',
    description: 'How to install a snap application in multiple versions from multiple channels? - snapcraft - snapcraft.io',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'How to'
  },
  {
    href: 'https://www.sublimetext.com/docs/3/linux_repositories.html#apt',
    description: 'Linux Package Manager Repositories – Sublime Text 3 Documentation',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Linux'
  },
  {
    href: 'https://askubuntu.com/questions/999046/install-snaps-without-root',
    description: 'ubuntu one - install snaps without root? - Ask Ubuntu',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'ubuntu'
  },
  {
    href: 'https://www.lifewire.com/learn-how-linux-4102755',
    description: 'Linux How-To Guides - Lifewire',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Linux'
  },
  {
    href: 'https://www.google.com/search?ei=y1bLW6qAEcqblwTmq4eoCQ&q=apt-get+install+location&oq=apt-get+install+location&gs_l=psy-ab.3..0i7i30k1l3j0i5i30k1j0i8i30k1l5.5715.8810.0.9035.8.6.2.0.0.0.94.479.6.6.0....0...1c.1.64.psy-ab..0.8.494...0i7i5i30k1j0i8i7i30k1j0i13k1j0i13i5i30k1j0i8i13i30k1.0.lnCfb68EhFw',
    description: 'apt-get install location - Cerca con Google',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'apt-get'
  },
  {
    href: 'https://www.google.com/search?q=installing+CLI+apps+via+snap+vs+apt',
    description: 'installing CLI apps via snap vs apt - Cerca con Google',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'installing'
  },
  {
    href: 'https://linuxconfig.org/how-to-create-desktop-shortcut-launcher-on-ubuntu-18-04-bionic-beaver-linux',
    description: 'How to create desktop shortcut launcher on Ubuntu 18.04 Bionic Beaver Linux - LinuxConfig.org',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'How to'
  },
  {
    href: 'https://addons.mozilla.org/en-US/firefox/addon/arc-dark-theme-we/?src=search',
    description: 'Arc Dark Theme – Get this Theme for 🦊 Firefox (en-US)',
    extended: '',
    meta: '',
    hash: '',
    time: '',
    shared: '',
    toread: '',
    tags: 'Arc'
  }
];

export default mockBookmarks;
