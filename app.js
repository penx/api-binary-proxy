const express = require('express')
const config = require('config');

const apiBinaryProxy = require('.');

const app = express();
const port = config.get('port');
const apiUrl = config.get('apiUrl');

app.use('/files', apiBinaryProxy(apiUrl, {payload: 'image'}, 'image/jpeg'));

app.listen(port, () => console.log(`API Binary Proxy listening on port ${port}!`))
