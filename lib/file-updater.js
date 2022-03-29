import fs from 'fs'
import ora from 'ora'
import got from 'got'
import config from './config.js';
import configFile from './config-file.js';

export async function updateFile(files, reset = false) {

    for (let i in files) {
        // base64 encode data
        files[i] = Buffer.from(files[i]).toString('base64')
    }

    const uuid = configFile.get('uuid');

    const num = Object.keys(files).length
    const s = num === 1 ? "" : "s";

    const message = num === 1 ? Object.keys(files)[0] : (num + " file" + s)

    const spinner = ora(`Syncing ${message}.`).start();

    try {
        await got.patch(config.cliApiPath(`/dev/${uuid}/files`), 
        {
            json: {
                files,
                reset
            },
        })

        spinner.succeed();
    } catch (e) {
        spinner.fail();
    }

}

export async function updateAllFiles() {

    let folds = config.folders.concat(['.'])

    let paths = {}
    
    folds.forEach(folder => {
        const files = fs.readdirSync(folder);   
        files.forEach(file => {
            const path = `${folder}/${file}`;

            if (
                fs.lstatSync(path).isDirectory() ||
                file.match(/^\./)
            ) 
                return;

            // ./config.yaml to /config.yaml
            const cleanPath = path.replace(/^\./, '')

            paths[cleanPath] = fs.readFileSync(path);
        });
    })

    await updateFile(paths, true)

}