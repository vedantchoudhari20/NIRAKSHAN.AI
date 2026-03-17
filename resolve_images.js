const fs = require('fs');
const path = require('path');

const deployDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy';
const sourceImagesDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/images';
const deployImagesDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/images';

// Map of filename -> full path in source folders
const imageMap = new Map();
[sourceImagesDir, deployImagesDir].forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            imageMap.set(file.toLowerCase(), path.join(dir, file));
        });
    }
});

function getAllHtmlFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

const htmlFiles = getAllHtmlFiles(deployDir);

htmlFiles.forEach(htmlFile => {
    let content = fs.readFileSync(htmlFile, 'utf8');
    // Match src, href, or data-thumbnail followed by wp-content/uploads path
    const patterns = [
        /(src|href|data-thumbnail)="([^"]*wp-content\/uploads\/([^"]+\/)?([^"\/]+))"/g,
        /(src|href|data-thumbnail)="([^"]*images\/([^"\/]+))"/g
    ];

    patterns.forEach(regex => {
        let match;
        while ((match = regex.exec(content)) !== null) {
            const attr = match[1];
            const fullRelPath = match[2];
            // If it's the first pattern, fileName is in group 4. If second, group 3.
            const fileName = (match[4] || match[3] || '').split('?')[0].toLowerCase();

            if (fileName && imageMap.has(fileName)) {
                const pageDir = path.dirname(htmlFile);
                const expectedDest = path.resolve(pageDir, fullRelPath.split('?')[0]);

                const destDir = path.dirname(expectedDest);
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }

                if (!fs.existsSync(expectedDest)) {
                    fs.copyFileSync(imageMap.get(fileName), expectedDest);
                    console.log(`Resolved: ${fileName} -> ${expectedDest}`);
                }
            }
        }
    });
});

console.log("Improved Image Resolution Complete.");
