import { process } from "process";

export const parseArgs = () => {
    process.argv.forEach((value, index) => {
        console.log(`${index}:${value}`)
    })
};

parseArgs();