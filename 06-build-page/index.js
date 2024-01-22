const fs = require('fs');
const path = require('path');
const { Transform, pipeline } = require('stream');

const DIST = path.join('06-build-page', 'project-dist');
const TEMPLATE = path.join('06-build-page', 'template.html');
const COMPONENT = path.join('06-build-page', 'components');
const STYLES = path.join('06-build-page', 'styles');

const SRC = path.join('06-build-page', 'assets');
const DEST = path.join('06-build-page', 'project-dist', 'assets');

async function copyDirectory(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const assets = await fs.promises.readdir(src);
  for (let asset of assets) {
    let stat = await fs.promises.stat(path.join(src, asset));
    if (stat.isDirectory()) {
      await copyDirectory(path.join(src, asset), path.join(dest, asset));
    } else {
      await fs.promises.copyFile(path.join(src, asset), path.join(dest, asset));
    }
  }
}

async function readDir(dirPath) {
  return await fs.promises.readdir(dirPath);
}

async function readFile(filePath) {
  return await fs.promises.readFile(filePath, { encoding: 'utf8' });
}

(async () => {
  await copyDirectory(SRC, DEST);
  const dict = {};

  const files = await readDir(COMPONENT);

  for (let file of files) {
    dict[file.replace('.html', '')] = await readFile(
      path.join(COMPONENT, file),
    );
  }

  await fs.promises.mkdir(DIST, { recursive: true });

  const readTemplate = fs.createReadStream(TEMPLATE);
  const transformTemplate = new Transform({
    transform(chunk, enc, callback) {
      let string = chunk.toString('utf8');
      for (let key in dict) {
        string = string.replace(`{{${key}}}`, dict[key]);
      }

      callback(null, string);
    },
  });
  const writeIndexHtml = fs.createWriteStream(path.join(DIST, 'index.html'));
  const writeStylesCss = fs.createWriteStream(path.join(DIST, 'style.css'));

  pipeline(readTemplate, transformTemplate, writeIndexHtml, (err) =>
    console.log(err),
  );

  const styleFiles = await readDir(STYLES);

  for (let styleFile of styleFiles) {
    const readStyles = fs.createReadStream(path.join(STYLES, styleFile));
    readStyles.pipe(writeStylesCss);
  }
})();
