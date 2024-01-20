const fs = require('fs');
const path = require('path');

const PATH = path.join('01-read-file', 'text.txt');
const stream = fs.createReadStream(PATH, {
  encoding: 'utf-8',
});

stream.on('data', (data) => {
  console.log(data);
});
