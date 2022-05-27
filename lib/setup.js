/**
 * Handles initial set up
 */

import config from "./config.js";
import fs from 'fs';

export default async function setup() {

    createFolders();
    createDefaultFiles();

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