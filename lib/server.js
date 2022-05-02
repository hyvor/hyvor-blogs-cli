import http from 'http';
import got from 'got';
import configFile from './config-file.js';
import config from './config.js';
import chalk from "chalk";

const hostname = '127.0.0.1';
const port = 8855;

const httpServer = http.createServer(async (req, res) => {

    const path = new URL(req.url, 'http://127.0.0.1').pathname;

    const query = new URLSearchParams({
        path,
        host: req.headers.host
    }).toString()

    try {

        const obj = await got.get(config.cliApiPath('/delivery') + "?" + query).json()

        if (obj.type === 'file') {

            res.statusCode = obj.status;
            res.setHeader('Content-Type', obj.mime_type);
            res.end( Buffer.from(obj.content, 'base64') )

        } else if (obj.type === 'redirect') {
        
            res.writeHead(obj.status, {'Location': obj.to});
            res.end();

        }

        return;

    } catch (e) {
        console.log(chalk.red("Error fetching " + req.url));
        res.end(e.response.body);
    }

});

export default function server() {

    httpServer.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

}