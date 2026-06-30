const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");
const { Transform } = require("stream");

//all below code is a pipeline of streams
//the pipe line is as follows readableStream -> gzipStream -> encryptStream -> writableStream
class EncryptStream extends Transform {
  constructor(key, vector) {
    super();
    this.key = key;
    this.vector = vector;
  }
  _transform(chunk, encoding, callback) {
    const cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.vector);
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]);
    this.push(encrypted); //push the encrypted data to the next stream
    callback(); //continue the pipeline and move to the next stream if not called it will throw an error of unhandled promise
    //unhandled promise means that the callback is not called
  }
}
const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);
const readableStream = fs.createReadStream("input.txt");
//new gzip object to compress the data

const gzipStream = zlib.createGzip();
const encryptStream = new EncryptStream(key, vector);
const writableStream = fs.createWriteStream("output.txt.gz");
//read - compress - encrypt - write

readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream);
console.log("Streaming->compressing->data");
