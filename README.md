<div align="center">
  <h1><img
    height="100"
    width="336"
    alt="finicky logo"
    src="https://raw.githubusercontent.com/johnste/finicky/gh-pages/finicky-logo.svg"
  />
  </h1>

  <strong>🇺🇦 Always open the right browser 🇺🇦</strong><br>
  [![GitHub start](https://badgen.net/github/stars/johnste/finicky?color=pink&icon=github)](https://GitHub.com/johnste/finicky/)
  [![GitHub release](https://badgen.net/github/release/johnste/finicky/stable?color=purple)](https://GitHub.com/johnste/finicky/releases/)

</div>

Finicky is a macOS application that allows you to set up rules that decide which browser is opened for every link or url. With Finicky as your default browser, you can tell it to open Facebook or Reddit in one browser, and Trello or LinkedIn in another.

- Decide what urls to open in what browser or app
- Edit urls before opening them
- Complete control over configuration using JavaScript

<div align="center">
<img src="https://raw.githubusercontent.com/johnste/finicky/gh-pages/Screenshot.png" alt="Finicky screenshot" width="75%"/>
</div>

## Table of Contents

<!-- To regenerate toc run `npx doctoc README.md --github` -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Example configuration](#example-configuration)
- [Documentation](#documentation)
- [Configuration tips](#configuration-tips)
- [Alternatives](#alternatives)
- [Building Finicky from source](#building-finicky-from-source)
- [Current status of Finicky development](#current-status-of-finicky-development)
- [Issues](#issues)
  - [Bugs](#bugs)
  - [Feature Requests](#feature-requests)
  - [Questions](#questions)
- [License](#license)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

1. Installation alternatives:

You have to build it from source currently.

## Example configuration

```js
// ~/.finicky.js
export default {
  defaultBrowser: "Google Chrome",
  rewrite: [
    {
      // Redirect all urls to use https
      match: ({ url }) => url.protocol === "http",
      url: { protocol: "https" }
    }
  ],
  handlers: [
    {
      // Open apple.com and example.com urls in Safari
      match: finicky.matchHostnames(["apple.com", "example.com"]),
      browser: "Safari"
    },
    {
      // Open any url that includes the string "workplace" in Firefox
      match: /workplace/,
      browser: "Firefox"
    },
    {
      // Open google.com and *.google.com urls in Google Chrome
      match: [
        "google.com/*", // match google.com urls
        "*.google.com/*", // match google.com subdomains
      ],
      browser: "Google Chrome"
    }
  ]
};
```

See the [documentation](#documentation) for all the features Finicky supports.

## Documentation

Finicky has extensive support for matching, rewriting and starting browsers or other application that handle urls. See the wiki for the [full configuration documentation](https://github.com/johnste/finicky/wiki/Configuration) explaining all available, APIs and options as well as detail information on how to match on urls.

## Alternatives

If you are looking for something that lets you pick the browser to activate in a graphical interface, check out [Browserosaurus](https://browserosaurus.com/) by Will Stone, an open source browser prompter for macOS. It works really well together with Finicky!

## Building Finicky from source

If you'd like to build Finicky from source:

```sh
./scripts/build.sh
```

## Current status of Finicky development

I am working on a new version of Finicky, rewritten in Go. 

## Issues

### Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**](https://github.com/johnste/finicky/issues?q=is%3aopen+is%3aissue+label%3abug)

### Feature Requests

[**See Feature Requests**](https://github.com/johnste/finicky/labels/feature%20request)

### Questions

Have any other questions or need help? Please feel free to reach out to me on [Bluesky](https://bsky.app/profile/mejkarsense.se)

## License

[MIT](https://raw.githubusercontent.com/johnste/finicky/master/LICENSE)
