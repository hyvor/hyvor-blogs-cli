import fs from 'fs'
import ora from 'ora'
import got from 'got'
import config from './config.js'
import chalk from 'chalk'
import path from 'path';

export async function updateFile(files, reset = false) {

    for (let i in files) {
        // base64 encode data
        files[i] = Buffer.from(files[i]).toString('base64')
    }

    const num = Object.keys(files).length
    const s = num === 1 ? "" : "s";

    const message = num === 1 ? Object.keys(files)[0] : (num + " file" + s)

    const spinner = ora(`Syncing ${message}.`).start();

    try {
        await got.patch(config.cliApiPath('/files'),
        {
            json: {
                files,
                reset
            },
        })

        spinner.succeed();
    } catch (e) {
        spinner.fail();
        console.log(chalk.red("ERROR: " + JSON.parse(e.response.body).error));
    }

}

export async function updateAllFiles() {

    let folds = config.folders.concat(['.'])

    let paths = {}
    
    folds.forEach(folder => {
        const files = fs.readdirSync(folder);   
        files.forEach(file => {
            const filePath = path.join(folder, file);

            if (
                fs.lstatSync(filePath).isDirectory() ||
                file.match(/^\./)
            ) 
                return;

            // Get the relative path, normalize it, and remove leading './' 
            const cleanPath = path.relative('.', filePath).replace(/\\/g, '/').replace(/^\.\//, '');

            paths[cleanPath] = fs.readFileSync(filePath);
        });
    })

    await updateFile(paths, true)

}