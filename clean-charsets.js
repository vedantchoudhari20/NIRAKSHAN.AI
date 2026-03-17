const fs = require('fs');
const path = require('path');

const deployDir = path.join(__dirname, 'deploy');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

const htmlFiles = getAllFiles(deployDir);

htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('@charset')) {
        // Remove @charset "UTF-8"; from anywhere in the HTML (usually inside style tags)
        const newContent = content.replace(/@charset\s+"[^"]*";/gi, '');
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Cleaned @charset in: ${filePath}`);
        }
    }
});
