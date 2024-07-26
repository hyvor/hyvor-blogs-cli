import chokidar from 'chokidar';
import fs from 'fs'
import { updateFile } from './file-updater.js'
import path from 'path';


function normalizePath(filePath) {
    // Normalize the path and replace backslashes with forward slashes
    return path.normalize(filePath).replace(/\\/g, '/').replace(/^\.\//, '');
}

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
    }).on('all', function(event, filePath) {

        let content;
        try {
            content = fs.readFileSync(filePath, 'utf8');
        } catch {
            // returns error on reading dir
            return;
        }
        const normalizedPath = normalizePath(filePath);
        updateFile({[normalizedPath]: content})

    });

}