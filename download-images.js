const fs = require('fs');
const path = require('path');
const https = require('https');

const clientSrcDir = path.join(__dirname, 'client', 'src');
const assetsDir = path.join(__dirname, 'client', 'public', 'assets', 'images');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error('Status Code: ' + res.statusCode));
      }
    }).on('error', reject);
  });
};

const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });
  return arrayOfFiles;
};

const imageRegex = /https:\/\/framerusercontent\.com\/images\/([a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|svg))/g;

const run = async () => {
  const files = getAllFiles(clientSrcDir);
  const downloadedFiles = new Set();
  
  for (const file of files) {
    if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
      let content = fs.readFileSync(file, 'utf8');
      
      let currentMatch;
      while ((currentMatch = imageRegex.exec(content)) !== null) {
        const url = currentMatch[0];
        const filename = currentMatch[1];
        const filepath = path.join(assetsDir, filename);
        
        if (!downloadedFiles.has(filename)) {
          console.log('Downloading ' + filename);
          try {
            await downloadImage(url, filepath);
            downloadedFiles.add(filename);
          } catch (e) {
            console.error('Error: ' + e.message);
          }
        }
      }
      
      const newContent = content.replace(/https:\/\/framerusercontent\.com\/images\//g, '/assets/images/');
      if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + path.basename(file));
      }
    }
  }
};
run();
