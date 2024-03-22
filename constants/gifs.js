// For each attribute, there should be a corresponding directory in assets/gifs. For example: assets/gifs/attribute1/
// In this directory there should be a number of Type subdirectories, each containing the frames for the GIF for the given type. 
// For example: assets/gifs/attribute1/Type1/list-of-pngs-files-for-gif-animation

const DISTRIBUTION = {
  Type1: 1/ 100,
  Type2: 20 / 100,
  Type3: 6 / 100,
  Type4: 18 / 100,
  Type5: 17 / 100,
  Type6: 19 / 100,
  Type7: 9 / 100,
  Type8: 10 / 100,
};

const PURITIES = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN'];

const PNG_START_PATHS = [
  { id: 'attribute1', path: 'attribute1' }, // Ex. background
  { id: 'attribute2', path: 'attribute2' }, // Ex. body
  { id: 'attribute3', path: 'attribute3' }, // Ex. head
  { id: 'attribute4', path: 'attribute4' }, // Ex. eyes
];


const GIFS_IDENTIFIER = {
  prefix: 'GIFS',
  pathPrefix: 'gifs',
  distribution: DISTRIBUTION,
  description: '', // TODO: Define
  purities: PURITIES,
};

module.exports = {
  DISTRIBUTION,
  PURITIES,
  PNG_START_PATHS,
  GIFS_IDENTIFIER,
};
