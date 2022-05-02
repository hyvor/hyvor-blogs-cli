/**
 * Handles initial set up
 */

import config from "./config.js";
import fs from 'fs';
import configFile from "./config-file.js";
import got from 'got'
import ora from "ora";
import { updateAllFiles } from "./file-updater.js";

export default async function setup(onFinish) {

    createFolders();
    createDefaultFiles();
    
    // await createUUID();
    await updateAllFiles();

    onFinish();

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
            fs.writeFileSync(file, '')
        }

    })

}

async function createUUID() {

    const uuid = configFile.get('uuid');

    if (!uuid) {

        const spinner = ora('Generating UUID').start();
    
        try {
            const response = await got.post(config.cliApiPath('/new')).json()
            configFile.update('uuid', response.uuid)

            spinner.succeed()
        } catch (e) {
            spinner.fail()
        }

    } else {
        ora("UUID Available").succeed();
    }

}