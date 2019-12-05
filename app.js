const express = require('express')
const config = require('config');
const app = express()
const port = config.get('port');
const apiUrl = config.get('apiUrl');
const apiBinaryProxy = require('.');

app.get('/', apiBinaryProxy(apiUrl))

app.listen(port, () => console.log(`API Binary Proxy listening on port ${port}!`))
