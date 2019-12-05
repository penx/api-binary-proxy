const express = require('express')
const config = require('config');
const fs = require('fs');
const path = require('path');
const app = express()
const port = config.get('exampleApiPort');

const handleFileLoad = (req, res, buffer) => {
    
    res.json({
        mime: 'image/jpeg',
        payload: new Buffer(buffer).toString('base64'),
        filename: 'cat1.jpg',
        metadata: {
            example: 'meta data'
        }
    });
}

const handleIncomingRequest = (req, res) => {
    fs.readFile(path.join(__dirname, './cat1.jpg'), (err, buffer) => {
        handleFileLoad(req, res, buffer);
    });
}

app.get('*', handleIncomingRequest)

app.listen(port, () => console.log(`Example API listening on port ${port}!`))
