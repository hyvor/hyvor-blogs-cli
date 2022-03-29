import chokidar from 'chokidar';
import fs from 'fs'
import { updateFile } from './file-updater.js'
import path from 'path';

/**
 * Watches file changes and syncs with production
 */

export default async function watch() {
        
    chokidar.watch('.', {
        ignored: /(^|[\/\\])\../,
        followSymlinks: false,
        // only one folder level
        depth: 1,
        ignoreInitial: true
    }).on('all', function(event, path) {

        let content;
        try {
            content = fs.readFileSync(path, 'utf8');
        } catch {
            // returns error on reading dir
            return;
        }

        updateFile({[path]: content})

    });

}