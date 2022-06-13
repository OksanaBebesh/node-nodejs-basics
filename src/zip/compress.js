import { createGzip } from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from  'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const compress = async (readStreamDir,writeStreamDir) => {
  const readStream = createReadStream(readStreamDir)
  const writeStream = createWriteStream(writeStreamDir)
  const toGz = createGzip()
  readStream.pipe(toGz).pipe(writeStream)
    console.log('FileToCompress.txt archived!')
};

// compress();