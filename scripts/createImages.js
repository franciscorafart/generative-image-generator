const cluster = require('cluster');
const { createGIF, createPNG } = require('../lib/ImageFactory.js');
const totalCPUs = require('os').cpus().length;
const { v4: uuid4 } = require('uuid');
const { exit } = require('process');
const { numFilesInFolder } = require('../utils/io.js');
const { EXPORT_PATH } = require('../constants/main.js');
const fs = require('fs');

// Supported image projects
const imageProjects = ['pngs', 'gifs'];

async function main() {
  try {
    const myArgs = process.argv.slice(2);
    const type = myArgs[0];
    const universe = Number(myArgs[1]) || 1; // Number of Images to create

    if (!imageProjects.includes(type)) {
      throw `Specify the image project in your first argument. Ex. ${imageProjects.toString()}`;
    }

    if (!fs.existsSync(`${EXPORT_PATH}${type}`)) {
      fs.mkdirSync(`${EXPORT_PATH}${type}`, { recursive: true });
    }

    if (cluster.isMaster) {
      console.log('The number of CPUs is', totalCPUs);

      // Fork workers.
      for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        const numFiles = numFilesInFolder(`${EXPORT_PATH}${type}/`);
        console.log(`worker ${worker.process.pid} died.`, numFiles, 'files.');

        // NOTE: Number of files will be a multiple of total CPUs
        if (numFiles <= universe) {
          console.log("Let's fork another worker!");
          cluster.fork();
        }
      });
    } else {
      // Cluster
      const uid = uuid4();
      console.log(`Worker ${process.pid} started.`, 'Current GIF', uid);
      if (type === 'pngs') {
        await createPNG('pngs');
      } else {
        await createGIF(type, uid);
      }
      exit(0);
    }
  } catch (err) {
    console.error(err);
  }
}

main();
