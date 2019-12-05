# API Binary Proxy

Proxy to serve binaries such as images from an API that returns JSON

## Introduction

Currently a proof of concept with the plan to address performance issues and export a route that can be mounted in a parent application.


## Usage

```
const apiBinaryProxy = require('api-binary-proxy');

app.use('/files', apiBinaryProxy('http://localhost:3001/api/%1$s'));
```

Where `%1$s` will be replaced by `req.path`.

## TODO:

- Forward all headers by default
- Perhaps allow header forwarding configuration e.g. via middleware
- More configuration options on api url
- Allow 'payload' and 'mime' properties to be configurable
- Allow extensions such as '.jpg' to be appended to incoming api url.
- Improve error handling, possibly allowing a callback to be passed in for logging

## Developing

```
npm i
npm run dev
```