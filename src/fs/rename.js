import { rename as renameFile } from 'fs/promises'
import {fileURLToPath} from "url";
import {dirname} from "path";

const errorMsg = "FS operation failed"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const source = __dirname + "/files/wrongFilename.txt"
const destination = __dirname + "/files/properFilename.md"


export const rename = async () => {
    try {
        await renameFile(source, destination)
        console.log(`File "${source}" was renamed to "${destination}"`)
    }
    catch (err) {
        throw new Error(errorMsg)
    }
};

rename();