const express = require('express')
const config = require('config');
const fetch = require('node-fetch');
const app = express()
const port = config.get('port');
const apiUrl = config.get('apiUrl');

const handleApiResponse = (req, res, apiResponse) => {
    let buffer = new Buffer(apiResponse.payload, 'base64');
    res.type(apiResponse.mime);
    res.send(buffer);
}

const handleIncomingRequest = (req, res) => {
    fetch(apiUrl)
        .then(r => r.json())
        .then(json =>  handleApiResponse(req, res, json));
}

app.get('/', handleIncomingRequest)

app.listen(port, () => console.log(`API Binary Proxy listening on port ${port}!`))
