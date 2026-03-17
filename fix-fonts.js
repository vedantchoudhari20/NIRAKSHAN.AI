const fs = require('fs');
const path = require('path');

const rootDir = process.argv[2] || process.cwd();

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });
    return arrayOfFiles;
}

const files = getAllFiles(rootDir);

const replacements = [
    // Fix font query strings to point to the local css.css file
    { search: /\.\.\/fonts\.googleapis\.com\/css\?[^"' )]*/g, replace: '../fonts.googleapis.com/css.css' },
    { search: /\.\/css\?[^"' )]*/g, replace: './css.css' },
];

files.forEach(file => {
    if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        replacements.forEach(r => {
            content = content.replace(r.search, r.replace);
        });

        if (content !== originalContent) {
            console.log(`Updated: ${file}`);
            fs.writeFileSync(file, content, 'utf8');
        }
    }
});
