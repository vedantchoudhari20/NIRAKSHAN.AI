const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Fix accidental double dots from previous replacement
content = content.replace(/src="\.\/\.\/images\//g, 'src="./images/');

// Ensure all image paths are correct
// Search for any escaped quotes that might be left
content = content.replace(/src=\\"([^"]+)\\"/g, 'src="$1"');

// Ensure all "images/" paths have "./" prefix for consistency if it's missing, but avoid triple "./././"
// Actually let's just normalize:
content = content.replace(/src="\.\/images\//g, 'src="./images/'); // already fine
content = content.replace(/src="images\//g, 'src="./images/'); // add ./ if missing

// Just clean up double dots specifically
content = content.replace(/src="\.\/\.\//g, 'src="./');

fs.writeFileSync(filePath, content);
console.log('Normalized image paths in deploy/index.html');
