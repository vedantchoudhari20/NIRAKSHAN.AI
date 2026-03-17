const fs = require('fs');
const path = require('path');

const deployDir = path.join('c:', 'Users', 'Vedant', 'Downloads', 'thenurturingroots.com', 'deploy');

function getAllHtmlFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllHtmlFiles(fullPath, files);
        } else if (item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    return files;
}

const htmlFiles = getAllHtmlFiles(deployDir);

// Define patterns to match the "ThePromoted by" block
// We'll target the text editor widget containing the link
const patterns = [
    // Matches the specific implementation found in index.html
    /<div\s+class="elementor-element[^>]*?data-widget_type="text-editor\.default"[^>]*?>\s*<div class="elementor-widget-container">\s*<p>\s*ThePromoted by\s*<a href="[^"]*?creativedigilabs\.com\/">CreativeDigiLabs<\/a>\s*<\/p>\s*<\/div>\s*<\/div>/g,
    // A slightly looser pattern just in case
    /<p>\s*ThePromoted by\s*<a href="[^"]*?creativedigilabs\.com\/">CreativeDigiLabs<\/a>\s*<\/p>/g
];

let filesProcessed = 0;
let occurrencesRemoved = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalLength = content.length;

    patterns.forEach(pattern => {
        content = content.replace(pattern, '');
    });

    if (content.length !== originalLength) {
        fs.writeFileSync(file, content);
        filesProcessed++;
        // Count matches by checking how many times it was replaced (approximate)
        // For simplicity, we just increment filesProcessed
    }
});

console.log(`Successfully processed ${htmlFiles.length} files.`);
console.log(`Removed "ThePromoted by CreativeDigiLabs" from ${filesProcessed} files.`);
