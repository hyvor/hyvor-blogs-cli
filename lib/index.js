#! /usr/bin/env node

import init from './init.js';
import watch from "./watch.js";

import 'dotenv/config';
import chalk from "chalk";
import {updateAllFiles} from "./file-updater.js";

if (process.argv[2] === 'init') {
    await init();
    process.exit();
}

if (!process.env.SUBDOMAIN) {
    console.log(chalk.red("Subdomain not set"));
    process.exit();
}

await updateAllFiles();
await watch();