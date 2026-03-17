const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Fix escaped src quotes
content = content.replace(/src=\\"([^"]+)\\"/g, 'src="./$1"');

// Fix escaped alt quotes (if any)
content = content.replace(/alt=\\"([^"]+)\\"/g, 'alt="$1"');

// General fix for any literal \" in HTML attributes
content = content.replace(/=\\"([^"]+)\\"/g, '="$1"');

fs.writeFileSync(filePath, content);
console.log('Fixed escaped quotes in deploy/index.html');
