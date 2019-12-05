const fetch = require('node-fetch');
const sprintf = require('sprintf-js').sprintf

const apiBinaryProxy = (apiUrl) => {
    const handleApiResponse = (req, res, {payload, mime, ...rest}) => {
        if(mime && payload) {
            let buffer = new Buffer(payload, 'base64');
            res.type(mime);
            res.append('X-ApiBinaryProxy-Metadata', JSON.stringify(rest));
            res.send(buffer);
        } else {
            res.json(rest);
        }
    }
    
    const handleIncomingRequest = (req, res) => {
        const url = sprintf(apiUrl, req.path);
        fetch(url)
            .then(r => r.json())
            .then(json =>  handleApiResponse(req, res, json));
    }

    return handleIncomingRequest;
}


module.exports = apiBinaryProxy