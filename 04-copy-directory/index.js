const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files'),
  dirPathCopy = path.join(__dirname, 'files-copy');

let filePath, filePathCopy;

async function copyDirectory() {
  return new Promise((resolve) => {
    fs.mkdir(dirPathCopy, {recursive: true}, (err) => {
      if (err) {
        return console.error(err);
      }
      
      fs.readdir(dirPath,  (err, files) => {
        if (err) {
          return console.error(err);
        }
        
        files.forEach(file => {
          filePath = path.join(dirPath, file);
          filePathCopy = path.join(dirPathCopy, file);

          fs.copyFile(filePath, filePathCopy, (err) => {
            if (err) {
              return console.error(err);
            }
          
            console.log(`${filePath} was copied to ${filePathCopy}`);
            resolve();
          });
        }); 
      });
    });
  });
}


fs.access(dirPathCopy, (err) =>{
  if (err) {
    copyDirectory();
  } else {
    fs.rm(dirPathCopy, { recursive: true, force: true }, () => {
      copyDirectory();
    });
  }
});

