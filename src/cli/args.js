import { argv } from "process";
let arg = []
export const parseArgs = () => {
    argv.forEach((value, index) => {
      arg.push([value,index])
    })
    return arg
};

parseArgs();