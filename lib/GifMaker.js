const GIFEncoder = require('gifencoder');
const pngFileStream = require('png-file-stream');
const fs = require('fs');

// References:
// https://github.com/eugeneware/gifencoder#readme
// https://github.com/eugeneware/png-file-stream
const encodePath = (encoder, exportPath, path) =>
  new Promise((res, rej) => {
    try {
      const stream = pngFileStream(`${path}*.png`)
        .pipe(encoder.createWriteStream({ repeat: 0, delay: 50, quality: 10 }))
        .pipe(fs.createWriteStream(exportPath));

      stream.on('finish', () => {
        res();
      });
    } catch (err) {
      rej(err);
    }
  });

const makeGIFFromPath = (path, exportPath, w, h) =>
  new Promise(async (res, rej) => {
    try {
      const encoder = new GIFEncoder(w, h);

      await encodePath(encoder, exportPath, path);
      res();
    } catch (err) {
      rej(err);
    }
  });

module.exports = {
  makeGIFFromPath,
};
