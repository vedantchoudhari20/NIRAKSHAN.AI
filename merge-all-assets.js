const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const deployImagesDir = path.join(baseDir, 'deploy', 'images');

if (!fs.existsSync(deployImagesDir)) {
    fs.mkdirSync(deployImagesDir, { recursive: true });
}

function copyImages(srcDir) {
    if (!fs.existsSync(srcDir)) return;
    const items = fs.readdirSync(srcDir);
    items.forEach(item => {
        const itemPath = path.join(srcDir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            if (item.toLowerCase() === 'deploy') return; // Skip deploy folder itself
            copyImages(itemPath);
        } else {
            const ext = path.extname(item).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.otf', '.ttf', '.woff', '.woff2'].includes(ext)) {
                // To avoid overwriting with potentially smaller/broken versions, we can check if it exists
                // but usually, taking all of them is safer.
                const destPath = path.join(deployImagesDir, item);
                if (!fs.existsSync(destPath)) {
                    fs.copyFileSync(itemPath, destPath);
                    console.log(`Copied: ${item} to deploy/images`);
                }
            }
        }
    });
}

// Search in all these potential source folders
const sourceFolders = [
    'gallery content',
    'images', // outside deploy
    'thenurturingroots.com',
    '_DataURI'
];

sourceFolders.forEach(folder => {
    copyImages(path.join(baseDir, folder));
});

console.log('Finished merging images into deploy/images');
