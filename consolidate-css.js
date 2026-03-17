const fs = require('fs');
const path = require('path');

const deployDir = path.join(__dirname, 'deploy');
const cssDir = path.join(deployDir, 'css');

if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir);
}

// 1. Find all CSS files in elementor uploads
const elementorCssDir = path.join(deployDir, 'wp-content', 'uploads', 'elementor', 'css');
if (fs.existsSync(elementorCssDir)) {
    const files = fs.readdirSync(elementorCssDir);
    files.forEach(file => {
        if (file.endsWith('.css')) {
            fs.copyFileSync(path.join(elementorCssDir, file), path.join(cssDir, file));
            console.log(`Copied CSS: ${file}`);
        }
    });
}

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

const allFiles = getAllFiles(deployDir);

allFiles.forEach(filePath => {
    const ext = path.extname(filePath);
    if (ext === '.html') {
        let content = fs.readFileSync(filePath, 'utf8');
        const relativeToRoot = path.relative(path.dirname(filePath), deployDir).replace(/\\/g, '/') || '.';
        const newCssPath = relativeToRoot + '/css';

        // Update all CSS links that point to elementor css or the broken 'images' path
        let changed = false;

        // Match any link that ends in post-*.css or global.css
        const cssLinkRegex = /href="[^"]*(post-\d+|global)\.css[^"]*"/g;
        content = content.replace(cssLinkRegex, (match) => {
            const fileName = match.match(/(post-\d+|global)\.css/)[0];
            changed = true;
            return `href="${newCssPath}/${fileName}"`;
        });

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated HTML: ${filePath}`);
        }
    } else if (ext === '.css') {
        // Update paths inside the copied CSS files in deploy/css
        if (filePath.startsWith(cssDir)) {
            let content = fs.readFileSync(filePath, 'utf8');
            let changed = false;

            // Paths to images should now be ../images/ because we are in /css/
            // Many currently have ../../../../images/ or https://...
            // Fix absolute first
            const sitePattern = /https?:\/\/thenurturingroots\.com\/wp-content\/uploads\/(?:\d{4}\/\d{2}\/)?/g;
            if (sitePattern.test(content)) {
                content = content.replace(sitePattern, '../images/');
                changed = true;
            }

            // Fix existing relative path overflows
            content = content.replace(/\.\.\/\.\.\/\.\.\/\.\.\/(?:\.\.\/)?images\//g, '../images/');
            changed = true;

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
});
