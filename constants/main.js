const { GIFS_IDENTIFIER } = require('./gifs.js');
const { PNGS_IDENTIFIER } = require('./pngs.js');

const ASSETS_PATH = './assets/';
const EXPORT_PATH = './exports/';
const TEMP_PATH = './exports/temp/';

const CONSTANTS_BY_ID = {
  gifs: GIFS_IDENTIFIER,
  pngs: PNGS_IDENTIFIER,
};

module.exports = {
  ASSETS_PATH,
  EXPORT_PATH,
  TEMP_PATH,
  CONSTANTS_BY_ID,
};
