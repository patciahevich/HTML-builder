const fs = require('fs');
const path = require('path');

const BUNDLE = path.join('05-merge-styles', 'project-dist', 'bundle.css');
const SRC = path.join('05-merge-styles', 'styles');

(async function mergeStyles(src, dest) {
  const writeStylesCss = fs.createWriteStream(dest);
  const styles = await fs.promises.readdir(src);

  for (let style of styles) {
    if (path.extname(style) === '.css') {
      const readStyle = await fs.createReadStream(path.join(src, style));
      await readStyle.pipe(writeStylesCss);
    }
  }
})(SRC, BUNDLE);
