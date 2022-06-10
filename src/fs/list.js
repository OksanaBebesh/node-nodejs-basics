import { readdir } from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const errorMsg = "FS operation failed";
const dirPath = __dirname + '/files/'

export const list = async () => {

    try {
        readdir(dirPath, (err, files) => {
            files.forEach( (file) => {
                console.log(file)
            })
        })
    }
    catch (err) {
        throw new Error(errorMsg);
    }
};

list();