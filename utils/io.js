const fs = require('fs');
const kp = require('keypress');
const { join } = require('path');

const keypress = async () => {
  kp(process.stdin);
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.on('keypress', (_, k) => {
      if (k.name === 'c') {
        process.stdin.setRawMode(false);
        resolve();
      }
      if (k.name === 'q') {
        process.exit();
      }
    }),
  );
};

const readAsyncDir = (path) =>
  new Promise((resolve, reject) => {
    fs.readdir(path, async (err, filesList) => {
      if (err) {
        reject(err);
      }

      resolve(filesList);
    });
  });

const createFolder = (path) => {
  fs.mkdir(path, () => {
    console.log('Created dir', path);
  });
};

const eraseFilesAndFolder = async (path) =>
  await new Promise((res, rej) => {
    try {
      fs.readdir(path, (err, files) => {
        if (err) throw err;
        const filesLength = files.length;

        for (const [idx, file] of files.entries()) {
          fs.unlink(join(path, file), (err) => {
            if (err) throw err;

            if (idx === filesLength - 1) {
              fs.rmdir(path, () => {
                console.log('Deleted', path);
                res();
              });
            }
          });
        }
      });
    } catch (err) {
      rej(err);
    }
  });

const numFilesInFolder = (path) => fs.readdirSync(path).length;

const writeToJSON = (data, dir) => {
  const fmtData = JSON.stringify(data);
  return fs.writeFileSync(`${dir}/image-ids.json`, fmtData);
};

const writeToJSONFile = (data, dir, filename) => {
  const fmtData = JSON.stringify(data);
  return fs.writeFileSync(`${dir}/${filename}.json`, fmtData);
};

module.exports = {
  createFolder,
  eraseFilesAndFolder,
  keypress,
  numFilesInFolder,
  readAsyncDir,
  writeToJSON,
  writeToJSONFile,
};
