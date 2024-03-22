const fs = require('fs');
const { makeRandomImageTypeGetter } = require('../utils/probability.js');
const { createFolder, eraseFilesAndFolder } = require('../utils/io.js');
const { PNG_START_PATHS } = require('../constants/gifs.js');
const { PNGS_START_PATHS } = require('../constants/pngs.js');

const {
  ASSETS_PATH,
  EXPORT_PATH,
  TEMP_PATH,
  CONSTANTS_BY_ID,
} = require('../constants/main.js');
const { composeFrame, composePNG } = require('./Composit.js');
const { makeGIFFromPath } = require('./GifMaker.js');

const reorderPathsList = (pathsList) => {
  const lists = pathsList.map((path) =>
    fs.readdirSync(path).map((file) => path + file),
  );
  const imagesLength = getImagesLength(lists);
  const reorderedList = [];

  // Combine different paths for GIF frame
  for (let i = 0; i < imagesLength; i++) {
    const newList = [];
    lists.forEach((list) => {
      const lastElement = list.pop();
      newList.push(lastElement);
    });
    reorderedList.push(newList);
  }

  return reorderedList.reverse();
};

const generateRandomPathList = (type, dist) => {
  // TODO: Optimize: getRandomCharacterId could be passed as a param instead of defining it on every call
  const constants = CONSTANTS_BY_ID[type];
  const getRandomCharacterId = makeRandomImageTypeGetter(
    dist || constants.distribution,
  );

  const randomPathList = [];
  const gifNameList = [];

  PNG_START_PATHS.forEach(({ id, path }) => {
    const randomCharacterId = getRandomCharacterId();
    randomPathList.push(`${ASSETS_PATH}${type}/${path}/${randomCharacterId}/`);
    gifNameList.push(`${id}-${randomCharacterId}`);
  });

  const gifName = `${gifNameList.join('+')}.gif`;
  const gifExportPath = `${EXPORT_PATH}${type}/`;
  const gifExport = `${gifExportPath}${gifName}`;

  // TODO: Try reading the exact file to avoid iterating through all the folder
  const gifExists = !!fs.readdirSync(gifExportPath).find((f) => f === gifName);

  // If GIF exists, call recursively
  if (gifExists) {
    return generateRandomPathList(type);
  }

  return [randomPathList, gifExport];
};

const createGIF = (type, uuid) =>
  new Promise(async (res, rej) => {
    const frameTempPath = `${TEMP_PATH}${uuid}/`;
    try {
      console.log('Generating random file sources');
      const [paths, gifName] = generateRandomPathList(type);
      const fileLists = reorderPathsList(paths);

      createFolder(frameTempPath);

      console.log('Composing frames');
      const composeFramesPromises = await composeAllFrames(
        fileLists,
        frameTempPath,
      );
      await Promise.all(composeFramesPromises);

      console.log('Making GIF');
      await makeGIFFromPath(frameTempPath, gifName, 1000, 1000);

      console.log('Erasing');
      await eraseFilesAndFolder(frameTempPath);

      res(`Done creating GIF ${uuid}`);
    } catch (err) {
      eraseFilesAndFolder(frameTempPath);
      rej(err);
    }
  });

const generateRandomPNGPathList = (type) => {
  const constants = CONSTANTS_BY_ID[type];
  const randomPathList = [];
  const pngNameList = [];

  // TODO: Move outside of the function
  PNGS_START_PATHS.forEach(({ id, path }) => {
    const getRandomCharacterId = makeRandomImageTypeGetter(
      constants.distribution[id],
    );

    const randomCharacterId = getRandomCharacterId();
    randomPathList.push(
      `${ASSETS_PATH}${type}/${path}/${randomCharacterId}.png`,
    );
    pngNameList.push(`${id}-${randomCharacterId}`);
  });

  const pngName = `${pngNameList.join('+')}.png`;
  const pngExportPath = `${EXPORT_PATH}${type}/`;
  const pngExport = `${pngExportPath}${pngName}`;
  const pngAlreadyCreated = !!fs
    .readdirSync(pngExportPath)
    .find((f) => f === pngName);

  // If PNG exists, call recursively
  if (pngAlreadyCreated) {
    return generateRandomPathList(type);
  }

  return [randomPathList, pngExport];
};

const createPNG = (type) =>
  new Promise(async (res, rej) => {
    const frameTempPath = `./`;

    try {
      console.log('Generating random file sources');
      const [paths, gifName] = generateRandomPNGPathList(type);
      // const fileList = paths.reverse();
      const fileList = paths;

      console.log('Composing png');
      await composePNG(fileList, frameTempPath, gifName);

      res(`Done creating PNG`);
    } catch (err) {
      eraseFilesAndFolder(`${TEMP_PATH}${type}/`);
      rej(err);
    }
  });

const composeAllFrames = async (fileLists, frameTempPath) => {
  const composePromises = await fileLists.map(
    async (fileList, idx) => await composeFrame(fileList, idx, frameTempPath),
  );
  return composePromises;
};

const getImagesLength = (lists) => {
  const lengthFirst = lists[0].length;
  const allSameLength = lists.every((l) => l.length === lengthFirst);

  if (!allSameLength) {
    throw new Error(
      'All directories have to have the same amount of images',
      lists,
    );
  }

  return lengthFirst;
};

module.exports = {
  createGIF,
  createPNG,
  generateRandomPathList,
  generateRandomPNGPathList,
};
