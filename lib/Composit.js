const jimp = require('jimp');
const { padNumZeros } = require('../utils/probability.js');

const isPNG = (file) => file?.toLowerCase().includes('.png') || false;
const ensureAllPNGs = (files) => {
  const allPngs = files.every((img) => isPNG(img));
  if (!allPngs) {
    const failed = files.filter((f) => !isPNG(f));
    throw new Error('All images have to be PNG', failed.join(', '));
  }
};

const composeFrame = async (pathList, idx, frameTempPath) =>
  new Promise(async (resolve, reject) => {
    try {
      ensureAllPNGs(pathList);

      const t = await pathList.map(async (path) => await jimp.read(path));
      const imgs = await Promise.all(t);

      const base = imgs[imgs.length - 1];
      for (let i = imgs.length - 2; i >= 0; i--) {
        base.composite(imgs[i], 0, 0);
      }
      const idxStr = padNumZeros(idx, 2);

      base.write(`${frameTempPath}${idxStr}-frame.png`, () => {
        const response = {
          path: `${frameTempPath}${idxStr}-frame}.png`,
        };
        resolve(response);
      });
    } catch (err) {
      reject(err);
    }
  });

const composePNG = async (pathList, frameTempPath, fileName) =>
  new Promise(async (resolve, reject) => {
    try {
      ensureAllPNGs(pathList);

      const t = await pathList.map(async (path) => await jimp.read(path));
      let imgs = await Promise.all(t);
      imgs = imgs.map((img) =>
        img.resize(3000, 3000, function (err) {
          if (err) throw err;
        }),
      );

      const base = imgs[imgs.length - 1];
      for (let i = imgs.length - 2; i >= 0; i--) {
        base.composite(imgs[i], 0, 0);
      }

      base.write(`${frameTempPath}${fileName}`, () => {
        const response = {
          path: `${frameTempPath}${fileName}`,
        };
        resolve(response);
      });
    } catch (err) {
      reject(err);
    }
  });

module.exports = {
  composeFrame,
  composePNG,
};
