const fs = require('fs');

fs.mkdir('./04-copy-directory/files-copy', (err) => {
  if (err) throw err;
  fs.readdir('./04-copy-directory/files', {withFileTypes: true}, (err, files) => {
    if (err) throw err
    files.forEach((file) => {
      fs.copyFile(`${file.path}/${file.name}`, `./04-copy-directory/files-copy/new-${file.name}`, err => {
        if (err) throw err
      });
    })
  })

  console.log('Files copied successfully')
})

