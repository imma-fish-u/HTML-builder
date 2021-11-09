const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'project-dist'),
  indexPath = path.join(__dirname, 'project-dist/index.html'),
  templatePath = path.join(__dirname, 'template.html'),
  dirComponentsPath = path.join(__dirname, 'components'),
  dirAssetsPath = path.join(__dirname, 'assets'),
  dirAssetsPathCopy = path.join(__dirname, 'project-dist/assets'),
  cssDirPath = path.join(__dirname, 'styles');

function createDirectory(p, subfolder) {

  fs.mkdir(path.join(p), {recursive: true}, (err) => {
    if (err) {
      return console.error(err);
    }
    
    let pathfile = path.join(dirAssetsPath, subfolder);
    fs.readdir(pathfile, { withFileTypes : true }, (err, files) => {
      if (err) {
        return console.error(err);
      }
      
      files.forEach(file => {
        let filePath = path.join(pathfile, file.name);
        let filePathCopy = path.join(dirAssetsPathCopy, subfolder, file.name);
  
        if (!file.isFile()) {
          createDirectory(filePathCopy, path.join(subfolder, file.name));
        }
    
        fs.copyFile(filePath, filePathCopy, () => {});
      });
    });
  });
}

async function mergeStyles() {
  fs.readdir(cssDirPath,  (err, files) => {
    if (err) {
      return console.log(err);
    }

    let bundlePath = path.join(dirPath, 'style.css');
    fs.unlink(bundlePath, () => {});
    
    files.forEach(file => {
      if (path.extname(file) != '.css') return;

      let cssFilePath = path.join(cssDirPath, file);
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
}

createDirectory(dirPath, '');
createDirectory(dirAssetsPathCopy, '');
mergeStyles();

let newHTML = '';
 
fs.readFile(templatePath, (err, data) => {
  if (data) {
    let codeSample = data.toString();
    let components = codeSample.match(/{{.+}}/g);
    for (let component of components) {
      let filename = component.slice(2,-2);
      let dirname = path.join(dirComponentsPath,`${filename}.html`);
      fs.readFile(dirname, (err, code) => {
        if (err) {
          return console.error(err);
        }
        newHTML = codeSample.replace(component, code.toString());
        codeSample = newHTML;

        fs.writeFile(indexPath, newHTML, (err) => {
          if (err) {
            return console.error(err);
          }
        });
      });
    }
  }
});
