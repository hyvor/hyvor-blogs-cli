/**
 * Handles initial set up
 */

import config from "./config.js";
import fs from 'fs';
import ora from "ora";
import chalk from "chalk";

export default async function init() {

    if (fs.readdirSync('.').length !== 0) {
        console.log(chalk.red("Current directory is not empty"));
        return;
    }

    const spinner = ora(`Generating default files`).start();

    createFolders();
    createDefaultFiles();

    spinner.succeed();

}

function createFolders() {

    config.folders.forEach(folder => {

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }

    })

}

function createDefaultFiles() {

    config.defaultFiles.forEach(file => {

        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, config.defaultFileContents[file] || '')
        }

    })

}