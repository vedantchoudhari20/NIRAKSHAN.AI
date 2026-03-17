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
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const allFiles = getAllFiles(deployDir);

allFiles.forEach(filePath => {
    const ext = path.extname(filePath);
    if (ext === '.html' || ext === '.css' || ext === '.js') {
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        // Calculate relative path to deploy root
        const relativeToRoot = path.relative(path.dirname(filePath), deployDir).replace(/\\/g, '/') || '.';
        const imagesPath = relativeToRoot + '/images';
        const rootPath = relativeToRoot;

        // 1. Replace absolute Nurturing Roots URLs with relative paths
        // Handle wp-content/uploads/ pattern
        const uploadPattern = /https?:\/\/thenurturingroots\.com\/wp-content\/uploads\/(?:\d{4}\/\d{2}\/)?/g;
        if (uploadPattern.test(content)) {
            content = content.replace(uploadPattern, imagesPath + '/');
            changed = true;
        }

        // Handle other site URLs
        const sitePattern = /https?:\/\/thenurturingroots\.com\//g;
        if (sitePattern.test(content)) {
            // If it's an internal page link, localized already in improve-links.js? 
            // Let's be safe.
            // Actually, improve-links.js handled many.
            content = content.replace(sitePattern, rootPath + '/');
            changed = true;
        }

        // 2. Fix url("../../../../../images/...") to have correct number of parents
        // We already know it should be 4 levels for elementor css
        if (filePath.includes('elementor') && filePath.includes('.css')) {
            const parentFixPattern = /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/images\//g;
            if (parentFixPattern.test(content)) {
                content = content.replace(parentFixPattern, imagesPath + '/');
                changed = true;
            }
        }

        // 3. Remove version queries like ?ver=123
        const verPattern = /\?ver=[a-zA-Z0-9.%-]+/g;
        if (verPattern.test(content)) {
            content = content.replace(verPattern, '');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    }
});
