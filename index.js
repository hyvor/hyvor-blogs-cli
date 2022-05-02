#! /usr/bin/env node

import setup from './lib/setup.js';
import async from 'async'
import watch from "./lib/watch.js";
import server from "./lib/server.js";

import 'dotenv/config';
import chalk from "chalk";

if (!process.env.SUBDOMAIN) {
    console.log(chalk.red("Subdomain not set"));
    process.exit();
}


setup(() => {

    async.parallel([
        watch,
        server
    ])

});