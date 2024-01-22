const fs = require('fs');
const path = require('path');

const PATH = path.join('03-files-in-folder', 'secret-folder');

fs.readdir(PATH, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fs.stat(path.join(`${file.path}`, `${file.name}`), (err, stat) => {
      if (err) throw err;
      if (!file.isDirectory()) {
        console.log(
          `${file.name.replace(/\.[^/.]+$/, '')} - ${path.extname(
            `${file.name}`,
          )} - ${stat.size} bytes`,
        );
      }
    });
  });
});
