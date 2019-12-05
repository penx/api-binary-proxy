# API Binary Proxy

Proxy to serve binaries such as images from an API that returns base64 encoded files inside a JSON structure.

## Introduction

Currently a proof of concept with the plan to address performance issues and export a route that can be mounted in a parent application.


## API

`apiBinaryProxy(apiUrl, propertyNames, assumeMimeType)`

Returns a route handler that can be used by Express.

- `apiUrl`: The API url uses sprintf format (see below)
- `propertyNames`: An object of the shape `{payload, extension, mime, filename}`, containing property names that are expected in the upstream API. Each property will default to the property name if not supplied (i.e. payload defaults to "payload"):
    - `payload`: the base64 encoded file 
    - `extension`: the file extension, this could be with or without an initial `.`
    - `mime`: the mime type of the file if available 
    - `filename`: the full filename if available 

Where config is:

```json
{}
```

## Usage

### With Express

```js
const express = require('express')
const apiBinaryProxy = require('api-binary-proxy');

const app = express();

app.use('/files', apiBinaryProxy('http://localhost:3001/api/%1$s', {payload: 'image'}, 'image/jpeg'));

```

In the example above, `%1$s` will be replaced by any path after '/files' (`req.path`).

### Sprintf

The API url uses sprintf format, for more information see [the sprintf-js readme](https://github.com/alexei/sprintf.js#readme). This is to enable further configuration options to be added in future and to support alternative uses such as:

- http://localhost:3001/api/%1$s/binary
- http://localhost:3001/api/binaries/%1$s?format=jpeg


## TODO:

- Forward all query string params
- Forward all headers by default.
- Perhaps allow header forwarding configuration e.g. via middleware.
- More configuration options on api url.
- Allow extensions such as '.jpg' to be appended to incoming api url.
- Improve error handling, possibly allowing a callback to be passed in for logging.

## Developing

```
npm i
npm run dev
```

Then browse to:

- http://localhost:3000/files/1
- http://localhost:3000/files/2
- http://localhost:3000/files/3
- http://localhost:3000/files/4