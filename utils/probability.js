const getRandomInt = (max) => Math.floor(Math.random() * max);

// Params
// breakpoints: { key: string, breakpoint: number}[]
// num: number
// NOTE: Assumes breakpoints is sorted by breakpoint
const findKeyForBreakpointRange = (breakpoints, num) => {
  for (let i = 0; i < breakpoints.length; i++) {
    const a = i === 0 ? 0 : breakpoints[i - 1].breakpoint;
    const b = breakpoints[i].breakpoint;
    if (num >= a && num < b) {
      return breakpoints[i].key;
    }
  }
  return null;
};

const _makeBreakpoints = (distribution) => {
  const breakpointsArray = [];
  let acc = 0;
  for (const [k, chance] of Object.entries(distribution)) {
    breakpointsArray.push({ key: k, breakpoint: chance + acc });
    acc += chance;
  }

  return breakpointsArray; // { key: string, breakpoint: number}[]
};

const makeRandomImageTypeGetter = (distribution) => {
  const breakpoints = _makeBreakpoints(distribution);

  return () => {
    const rand = Math.random();
    return findKeyForBreakpointRange(breakpoints, rand);
  };
};

const addNumList = (numList) => numList.reduce((acc, v) => acc + v, 0);
const universeFromDistributions = (distributions) =>
  addNumList(Object.entries(distributions).map(([_, v]) => v));

const distributionsAsOccurrences = (distributionsChances, universe) => {
  return Object.entries(distributionsChances).reduce(
    (acc, [k, chance]) => ({ ...acc, [k]: Math.round(chance * universe) }),
    {},
  );
};

// p(A and B) = p(A) * p(B)
// Probability of frame combination = Multiplication of probability of each frame
// Assumes number of fi
const probabilityOfGif = (traits, distributionsChance) => {
  const probability = Object.entries(traits).reduce((acc, [_, v]) => {
    const probabilityFrame = distributionsChance[v];
    return acc * probabilityFrame;
  }, 1);
  return probability;
};

const padNumZeros = (num, pad) => String(num).padStart(pad, '0');

const sortDirectionByProperty = (a, dir = 'asc', property = 'p') => {
  if (dir === 'desc') {
    a.sort((a, b) =>
      a[propert] < b[property] ? 1 : a[property] > b[property] ? -1 : 0,
    );
  } else if (dir === 'asc') {
    a.sort((a, b) =>
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0,
    );
  }
};

module.exports = {
  getRandomInt,
  makeRandomImageTypeGetter,
  probabilityOfGif,
  padNumZeros,
  sortDirectionByProperty,
  universeFromDistributions,
  distributionsAsOccurrences,
  findKeyForBreakpointRange,
};
