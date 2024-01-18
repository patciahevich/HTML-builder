const fs = require('fs');

fs.readFile('./01-read-file/text.txt', 'utf-8', (error, data) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(data)
});

