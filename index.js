import setup from './lib/setup.js';
import async from 'async'
import watch from "./lib/watch.js";
import server from "./lib/server.js";


setup(() => {

    async.parallel([
        watch,
        server
    ])

});
