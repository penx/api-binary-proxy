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

- Forward headers
- More configuration options on api url

## Developing

```
npm i
npm run dev
```