const fs = require('fs');
const path = require('path');

const imagesDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/images';
const indexFile = 'c:/Users/Vedant/Downloads/thenurturingroots.com/thenurturingroots.com/index.html';

const content = fs.readFileSync(indexFile, 'utf8');
const regex = /src=["']\.\.\/images\/([^"']+)["']/g;
let match;
let missing = [];

while ((match = regex.exec(content)) !== null) {
    const filename = match[1];
    if (!fs.existsSync(path.join(imagesDir, filename))) {
        missing.push(filename);
    }
}

console.log('Missing images in images folder:');
console.log(JSON.stringify([...new Set(missing)], null, 2));
