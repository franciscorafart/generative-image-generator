# Multithreaded Generative PNG and GIF Generator
This is a multithreaded node js script that allows you to create generative png or gif from your source png files.

## Requirements

2. Install dependencies `$ yarn install`

1. Setup the following directory structure in your root
- assets/
    - gifs/ (Place here your original PNGs to combine into gifs)
    - pngs/ (Place here ypur source pngs by categories to create generative images)


4. Make sure your original PNGs and directory routes have consistent names

## Create PNGS
Run `$ yarn createImages [param1] [param2]`
param1: Type of generative image. `pngs` or `gifs`
param2: number of pngs/gifs. Since it runs in parallel the output can be slighly higher.


## Setup project directory
1. Setup export folders
- assets/
- exports/
    - gifs/
    - pngs/
    - temp/

2. Adapt the `pngs.js` or `gifs.js` file in the constants directory. Define `DISTRIBUTION`, `PNG_START_PATHS` according to your distributions an unique source pngs file names.

