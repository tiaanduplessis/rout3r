
<div align="center">
  <img src="header.png" alt="rout3r logo">
</div>

[![package version](https://img.shields.io/npm/v/rout3r.svg?style=flat-square)](https://npmjs.org/package/rout3r)
[![package downloads](https://img.shields.io/npm/dm/rout3r.svg?style=flat-square)](https://npmjs.org/package/rout3r)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/rout3r.svg?style=flat-square)](https://npmjs.org/package/rout3r)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Greenkeeper badge](https://badges.greenkeeper.io/tiaanduplessis/rout3r.svg)](https://greenkeeper.io/)

> Just route the things

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About](#about)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## About

- Uses [Context API]() and [wayfarer](https://www.npmjs.com/package/wayfarer) for fast routing.
- Tiny footprint (Less than 1 kB gzipped)
- Configurable via [history](https://www.npmjs.com/package/history)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm install rout3r
$ # OR
$ yarn add rout3r
```

## Usage

```js
import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "rout3r";

const PageOne = () => (
  <h2>
    Page 1 <Link href="/tiaan?hello=person">go to</Link>
  </h2>
);
const PageTwo = props => (
  <h2>
    Page 2 {props.params.ahhhhh} {JSON.stringify(props.searchParams)}
  </h2>
);

const PageThree = props => <h2>Page 3</h2>;

const PageFour = props => <h2>Page 4</h2>;

function App() {
  return (
    <Router defaultPath="/404">
      <PageOne path="/" />
      <PageThree path="/foo" />
      <PageFour path="/foo/bar" />
      <PageTwo path="/:ahhhhh" />
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


```

## Contribute

1. Fork it and create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -am "Add some feature"`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request

## License

MIT
    