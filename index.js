#! /usr/bin/env node

import setup from './lib/setup.js';
import async from 'async'
import watch from "./lib/watch.js";
import server from "./lib/server.js";

import 'dotenv/config';
import chalk from "chalk";
import {updateAllFiles} from "./lib/file-updater.js";
import ora from "ora";

if (!process.env.SUBDOMAIN) {
    console.log(chalk.red("Subdomain not set"));
    process.exit();
}

if (process.argv[2] === 'init') {
    const spinner = ora(`Generating default files`).start();
    await setup();
    spinner.succeed();
    process.exit();
}

await updateAllFiles();

async.parallel([
    watch,
    server
]);