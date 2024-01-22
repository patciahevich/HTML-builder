const fs = require('fs');
const path = require('path');

const SRC = path.join('04-copy-directory', 'files');
const DEST = path.join('04-copy-directory', 'files-copy');

(async function copyDirectory(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });

  const oldFiles = await fs.promises.readdir(dest);
  for (let file of oldFiles) {
    await fs.promises.unlink(path.join(dest, file))
  }

  const assets = await fs.promises.readdir(src);
  for (let asset of assets) {
    let stat = await fs.promises.stat(path.join(src, asset));
    if (stat.isDirectory()) {
      await copyDirectory(path.join(src, asset), path.join(dest, asset));
    } else {
      await fs.promises.copyFile(path.join(src, asset), path.join(dest, asset));
    }
  }
})(SRC, DEST);
