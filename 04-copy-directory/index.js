const fs = require('fs');
const path = require('path');

const SRC = path.join('04-copy-directory', 'files');
const DEST = path.join('04-copy-directory', 'files-copy');


fs.mkdir(DEST, { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(DEST, { withFileTypes: true}, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.unlink(path.join(DEST, file.name), () => {})})
  });
  fs.readdir(SRC, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.copyFile(path.join(SRC, file.name), path.join(DEST, file.name), () => {})
    });
  });
});
