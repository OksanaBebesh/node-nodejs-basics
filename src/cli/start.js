import { argv, stdin, stdout, chdir, cwd  } from "process";
import * as os from 'os';
import * as readline from 'readline';
import { dirname } from "path";
import {fileURLToPath} from "url";
import {parseArgs} from "./args.js";
import {list} from "../fs/list.js";
import {create} from "../fs/create.js";
import {rename} from "../fs/rename.js";
import {compress} from "../zip/compress.js";
import {compressByBrotli} from "../zip/compressByBrotli.js";
import {decompressByBrotli} from "../zip/decompressByBrotli.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let currentDir = cwd();
let userName = '';

export const startFileManager = async () => {

    userName = cutUserName(argv.slice(2))
    console.log(`Welcome to the File Manager, ${(userName)}!`)
    startInput()
}

const generateInput = () => {
    const rl = readline.createInterface({
        input:stdin,
        output:stdout,
        prompt: `You are currently in ${cwd()}>`
    });
    return rl;
}

const startInput = async () => {

    let rl = generateInput()

    rl.prompt();

    rl.on('line', (line) => {

        let command = line.trim().split(' ')

        switch (command[0]) {
            case 'up':
                let newDir = getUpCurrentDir()
                chdir(newDir)
                rl.setPrompt(cwd()+'>')
            break;

            case 'ls':
                list(cwd())
                rl.setPrompt(cwd()+'>')
            break;

            case 'add':
                try {
                    create(cwd()+'/'+command[1])
                    console.log(`File create: ${cwd()+'/'+command[1]}`)
                }
                catch (err) {new Error(err)}

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

            case 'compress':
                compressByBrotli(command[1], command[2])
            break;

            case 'decompress':
                decompressByBrotli(command[1], command[2])
            break;

            case 'os':
                let argument = command[1].substring(2)
                switch(argument){
                    case 'homedir':
                        console.log('Get home directory:\n')
                        let tempDir = os.tmpdir()
                        console.log(tempDir)
                        break;
                    case 'username':
                        break;

                    case 'EOL':
                        console.log(os.EOL)
                        break;

                    case 'cpus':
                        printInfoToConsole(getCPUModelClockRateInfo())
                        break;
                }
        }
        rl.setPrompt(cwd()+'>')
        rl.prompt();

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
    return currentDir
}

const getCPUModelClockRateInfo = () => {
    let cpus = os.cpus();
    let info = [`Amount of CPUS: ${cpus.length}`]
    cpus.forEach(cpu => {
        info.push( cpu.model + ' '+ cpu.speed + '\n' )
    })
    return info
}

const printInfoToConsole = (info) => {
    info.forEach(line => {
        console.log(line)
    })
}

startFileManager()