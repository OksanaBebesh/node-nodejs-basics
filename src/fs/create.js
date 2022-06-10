import { writeFile, access } from 'fs/promises';
// import { getPath } from './checkPath.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const create = async () => {
    // const src = getPath('fresh.txt');
    const src = __dirname + '/files/fresh.txt';
    const string = "I am fresh and young";
    try {
        await writeFile(src, string, { flag: 'wx' })
        console.log(`"${string}" wrote to fresh.txt`)
    } catch (err) {
        throw new Error(err);
    }
};

create();