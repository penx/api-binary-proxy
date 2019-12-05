const express = require('express')
const config = require('config');
const fs = require('fs');
const path = require('path');
const app = express()
const port = config.get('exampleApiPort');

const handleFileLoad = (req, res, buffer, filename) => {
    res.json({
        mime: 'image/jpeg',
        payload: new Buffer(buffer).toString('base64'),
        filename,
        metadata: {
            example: 'meta data'
        }
    });
}

const handleIncomingRequest = (req, res) => {
    const filename = `./cat${req.path.substring(1)}.jpg`;
    fs.readFile(path.join(__dirname, filename), (err, buffer) => {
        if (err) {
            res.send(err);
        } else {
            handleFileLoad(req, res, buffer, filename);
        }
    });
}

app.use('/api', handleIncomingRequest)

app.listen(port, () => console.log(`Example API listening on port ${port}!`))
