import fs from 'fs'

/**
 * Reads config JSON file
 */

const fileName = './.hb.cli.json';

const configFile = {

    getAll() {
        let data = {}
        try {
            data = JSON.parse(fs.readFileSync(fileName));
        } catch (e) {

        }

        return data
    },

    get(key) {
        return configFile.getAll()[key] || null;
    },

    update(key, value) {
        const data = configFile.getAll()

        data[key] = value;

        configFile.write(data)
    },

    write(data) {
        fs.writeFile(fileName, JSON.stringify(data), err => {
            if (err) {
                console.error(err)
                return
            }
        })
    }

}

export default configFile;