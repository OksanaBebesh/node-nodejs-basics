import { createGzip, createBrotliCompress } from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from  'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const compressByBrotli = async (readStreamDir,writeStreamDir) => {


  const readStream = createReadStream(readStreamDir)
  const writeStream = createWriteStream(writeStreamDir)
  const toBr = createBrotliCompress()
  const stream = readStream.pipe(toBr).pipe(writeStream)

  stream.on('finish', ()=> {
    console.log('Done compressing!')
  })

};

// compress();