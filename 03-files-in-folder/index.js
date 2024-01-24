const fs = require('fs');
const path = require('path');

const PATH = path.join('03-files-in-folder', 'secret-folder');

fs.readdir(PATH, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fs.stat(path.join(PATH, file), (err, stat) => {
      if (err) throw err;
      if (!stat.isDirectory()) {
        console.log(
          `${file.replace(/\.[^/.]+$/, '')} - ${path.extname(
            `${file}`,
          )} - ${stat.size} bytes`,
        );
      }
    });
  });
});
