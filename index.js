const fetch = require('node-fetch');

const apiBinaryProxy = (apiUrl) => {
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

    return handleIncomingRequest;
}


module.exports = apiBinaryProxy