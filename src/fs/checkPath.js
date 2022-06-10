import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getPath = async (file) => {
    console.log('checkPath file')
    console.log(__filename)
    return __dirname + '/files/' + file;
}
