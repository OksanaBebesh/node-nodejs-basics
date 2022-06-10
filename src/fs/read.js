import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const errorMsg = "FS operation failed";
const filePath = __dirname + '/files/fileToRead.txt'

export const read = async () => {

    try {
       const data = await readFile(filePath, { encoding: 'utf8'})
       console.log(data)
    }
    catch (err) {
        throw new Error(errorMsg);
    }
};

read();