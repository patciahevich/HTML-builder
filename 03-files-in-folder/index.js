const fs = require('fs')

fs.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true}, (err, files) => {
  if (err) throw err
  files.forEach((file) => console.log(file.name))
})

// fs.readdir( path, options, callback )