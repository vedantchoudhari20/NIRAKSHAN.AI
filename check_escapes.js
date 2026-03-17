const fs = require('fs');
const content = fs.readFileSync('c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html', 'utf8');
const counts = (content.match(/\\"/g) || []).length;
console.log('Total occurrences of \\":', counts);
const matches = content.match(/src=\\"[^"]+\\"/g);
if (matches) {
    console.log('Examples of escaped src:');
    matches.slice(0, 10).forEach(m => console.log(m));
}
