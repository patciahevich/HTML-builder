const fs = require('fs');
const path = require('path');

const BUNDLE = path.join('05-merge-styles', 'project-dist', 'bundle.css');

fs.open(BUNDLE, 'w', (err) => {
  if (err) throw err;

  fs.readdir(
    path.join('05-merge-styles', 'styles'),
    { withFileTypes: true },
    (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (path.extname(path.join(file.path, file.name)) === '.css') {
          fs.readFile(path.join(file.path, file.name), 'utf-8', (err, data) => {
            if (err) throw err;
            fs.appendFile(BUNDLE, data, () => {});
          });
        }
      });
    },
  );
});
