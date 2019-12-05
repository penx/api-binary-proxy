const fetch = require('node-fetch');
const sprintf = require('sprintf-js').sprintf;
const path = require('path');
const mimeTypes = require('mime-types');

const apiBinaryProxy = ({apiUrl, propertyNames = {}, assumeMimeType, forwardHeaders = false, forwardQueryString = true}) => {
    const handleApiResponse = (req, res, 
        {
            [propertyNames.payload || "payload"]: payload,
            [propertyNames.extension || "extension"]: extension,
            [propertyNames.mime || "mime"]: mime,
            [propertyNames.filename || "filename"]: filename,
            ...rest
        }) => {
        let mimeType;
        if(mime) {
            mimeType = mime;
        } else if (extension) {
            mimeType = mimeTypes.lookup(extension);
        } else if (filename) {
            mimeType = mimeTypes.lookup(filename);
        } else {
            mimeType = assumeMimeType;
        }
        if(!mimeType) {
            // We don't know the mime type from the API response and current config says not to assume mime type so we 404
            res.sendStatus(404);
            return;
        }

        const metadata = { filename, extension, ...rest };
        if(payload) {
            let buffer = new Buffer(payload, 'base64');
            res.type(mimeType);
            res.append('X-ApiBinaryProxy-Metadata', JSON.stringify(metadata));
            res.send(buffer);
        } else {
            res.sendStatus(500); // TODO: confirm correct http status code, 404?
            res.json(metadata);
        }
    }
    
    const handleIncomingRequest = (req, res) => {

        const url = new URL(sprintf(apiUrl, req.path));
        if (forwardQueryString) {
            // Merge query string from apiUrl with req.query
            Object.keys(req.query).forEach(key => {
                url.searchParams.set(key, req.query[key]);
            });
        }

        const fetchOptions = {};

        if (forwardHeaders) {
            fetchOptions.headers = req.headers
        }

        fetch(url, fetchOptions).then(r => r.json())
            .then(json =>  handleApiResponse(req, res, json));
    }

    return handleIncomingRequest;
}


module.exports = apiBinaryProxy