import http from 'http';
import got from 'got';
import configFile from './config-file.js';
import config from './config.js';

const hostname = '127.0.0.1';
const port = 8855;

const httpServer = http.createServer(async (req, res) => {

    const url = req.url;

    const uuid = configFile.get('uuid')
    const query = new URLSearchParams({
        path: url,
        host: req.headers.host
    }).toString()

    try {

        const obj = await got.get(config.cliApiPath(`/dev/${uuid}/delivery?${query}`)).json()

        if (obj.type === 'file') {

            res.statusCode = obj.status;
            res.setHeader('Content-Type', obj.mime_type);
            res.end( Buffer.from(obj.content, 'base64') )

        } else {



        }

        return;

    } catch (e) {
        console.log("Error occurred");
    }

    res.end("Something went wrong");

});

export default function server() {

    httpServer.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

}