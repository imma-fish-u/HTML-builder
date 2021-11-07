const fs = require('fs');
const path = require('path');

const bundleDirPath = path.join(__dirname, 'project-dist'),
  bundlePath = path.join(bundleDirPath, 'bundle.css'),
  cssDirPath = path.join(__dirname, 'styles');

let cssFilePath;

fs.readdir(cssDirPath,  (err, files) => {
  if (err) {
    return console.log(err);
  }
  
  files.forEach(file => {
    if (path.extname(file) != '.css') return;

    cssFilePath = path.join(cssDirPath, file);
    fs.readFile(cssFilePath, (err, data) => {

      fs.appendFile(bundlePath, data.toString() + '\n', (err) => {
        if (err) {
          return console.error(err);
        }

        console.log(`${file} was copied`);
      });

    });
  });
});