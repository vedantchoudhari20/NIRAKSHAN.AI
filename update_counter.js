const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Update Happy Children counter (800 -> 1800)
const target = /data-to-value="800"/g;
if (target.test(content)) {
    content = content.replace(target, 'data-to-value="1800"');
    fs.writeFileSync(filePath, content);
    console.log('SUCCESS: Updated Happy Children counter to 1800.');
} else {
    console.error('FAILED: Could not find "data-to-value=\\"800\\"" in file.');
}
