const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');
let filePath, fileName, extname, size;

fs.readdir(dirPath, { withFileTypes : true }, (err, files) => {
  if (err) {
    return console.error(err);
  }

  files.forEach(file => {
    //path.basename(file)
    if (file.isFile()) {
      filePath = path.join(dirPath, file.name);
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        fileName = file.name.replace(/\..+/, '');
        extname = path.extname(file.name).slice(1); 
        size = stats.size / 1024;
        console.log(`${fileName} - ${extname} - ${size}kb`);
      });  
    }
  });
});
