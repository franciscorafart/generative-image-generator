// IMPORTANTE:
//  The key of DISTRIBUTION must match the category directories in assets/pngs. For example: assets/pngs/eyes/
// At the same time, the key of the category must match the png file names, with their associated distribution. Ex. assets/pngs/eyes/eyes1#100.png
const DISTRIBUTION = {
  eyes: {
    'eyes1#100': 200 / 1000,
    'eyes2#10': 150 / 1000,
    'eyes3#100': 250 / 1000,
    'eyes4#100': 100 / 1000,
    'eyes5#100': 200 / 1000,
    'eyes6#100': 100 / 1000,
  },
  faces: {
    'face1#10': 100 / 1000,
    'face2#90': 459 / 1000,
    'face3#50': 200 / 1000,
    'face4#60': 241 / 1000,
  },
  head: {
    'head1#10': 160 / 1000,
    'head2#80': 240 / 1000,
    'head3#100': 120 / 1000,
    'head4#20': 110 / 1000,
    'head5#70': 190 / 1000,
    'head6#20': 80 / 1000,
    'head7#50': 39 / 1000,
    'head8#40': 61 / 1000,
  },
  pinky: {
    'pinky1#100': 1000 / 1000,
  },
};

const PNGS_START_PATHS = [
  { id: 'eyes', path: 'eyes' },
  { id: 'faces', path: 'faces' },
  { id: 'head', path: 'head' },
  { id: 'pinky', path: 'pinky' },
];

const PNGS_IDENTIFIER = {
  prefix: 'PNGS',
  pathPrefix: 'pngs',
  distribution: DISTRIBUTION,
};

module.exports = {
  DISTRIBUTION,
  PNGS_START_PATHS,
  PNGS_IDENTIFIER,
};
