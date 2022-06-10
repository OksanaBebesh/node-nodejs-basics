import { argv, stdin, stdout, chdir, cwd  } from "process";
import * as readline from 'readline';
import { dirname } from "path";
import {fileURLToPath} from "url";
import {parseArgs} from "./args.js";
import {list} from "../fs/list.js";
import {create} from "../fs/create.js";
import {rename} from "../fs/rename.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let currentDir = cwd();
let userName = '';

export const startFileManager = async () => {

    userName = cutUserName(argv.slice(2))
    console.log(`Welcome to the File Manager, ${(userName)}!`)
    startInput()
}

const startInput = async () => {

    const rl = readline.createInterface({
        input:stdin,
        output:stdout,
        prompt: `You are currently in ${cwd()}>`
    });

    rl.prompt();

    rl.on('line', (line) => {

        let command = line.trim().split(' ')

        console.log(command)
        switch (command[0]) {
            case 'up':
                let newDir = getUpCurrentDir()
                chdir(newDir)
                console.log('Command up to dir')
            break;

            case 'ls':
                list(cwd())
            break;

            case 'add':
                create(cwd()+command[1])
            break;

            case 'cat':
            break;

            case 'rn':
                rename(command[1], command[2])
            break;

            case 'cd':
                chdir(command[1])
            break;

            case 'cp':
            break;

            case 'mv':
            break;

            case 'rm':
            break;

        }
        rl.prompt()

    }).on('close',() => {
        console.log(`\nThank you for using File Manager, ${userName}!`)
        process.exit(0)
    });

}

const cutUserName = (userName) => {
    let userNameFull = userName[0].split('=');
    return userNameFull[1]
}

const getUpCurrentDir = () => {
    currentDir = cwd();
    currentDir = currentDir.substring(0,currentDir.lastIndexOf('/'))
    console.log(currentDir)
    return currentDir
}

startFileManager()