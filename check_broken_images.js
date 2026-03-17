const fs = require('fs');
const path = require('path');

const deployDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy';

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
let brokenImages = [];

htmlFiles.forEach(htmlFile => {
    const content = fs.readFileSync(htmlFile, 'utf8');
    const pageDir = path.dirname(htmlFile);

    // Check both src and data-thumbnail
    const patterns = [
        /src="([^"]+)"/g,
        /data-thumbnail="([^"]+)"/g,
        /url\(['"]?([^'"\)]+\.(jpg|jpeg|png|webp|svg|gif))['"]?\)/g
    ];

    patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            let imgPath = match[1];

            // Strip query string and hash
            imgPath = imgPath.split('?')[0].split('#')[0];

            // Skip data URIs and absolute URLs
            if (imgPath.startsWith('data:') || imgPath.startsWith('http')) continue;

            // Resolve relative path
            const absolutePath = path.resolve(pageDir, imgPath);

            if (!fs.existsSync(absolutePath)) {
                brokenImages.push({
                    page: path.relative(deployDir, htmlFile),
                    path: imgPath,
                    absolute: absolutePath
                });
            }
        }
    });
});

if (brokenImages.length > 0) {
    console.log(`Found ${brokenImages.length} broken image references:`);
    const uniqueBroken = [...new Set(brokenImages.map(bi => bi.absolute))];
    console.log(`Unique broken paths: ${uniqueBroken.length}`);

    // Group by page for easier reporting
    const grouped = brokenImages.reduce((acc, curr) => {
        if (!acc[curr.page]) acc[curr.page] = [];
        acc[curr.page].push(curr.path);
        return acc;
    }, {});

    Object.keys(grouped).forEach(page => {
        const uniqueOnPage = [...new Set(grouped[page])];
        console.log(`\nPage: ${page}`);
        uniqueOnPage.slice(0, 5).forEach(p => console.log(`  - ${p}`));
        if (uniqueOnPage.length > 5) console.log(`  ... and ${uniqueOnPage.length - 5} more`);
    });
} else {
    console.log("No broken image references found!");
}
