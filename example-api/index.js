const express = require('express')
const config = require('config');
const app = express()
const port = config.get('exampleApiPort');

const handleFileLoad = (req, res, file) => {
    
    const response = {
        test: 'example'
    };
    res.json(response);
}

const handleIncomingRequest = (req, res) => {
    setTimeout(() => handleFileLoad(req, res, {}), 300)
}

app.get('*', handleIncomingRequest)

app.listen(port, () => console.log(`Example API listening on port ${port}!`))
