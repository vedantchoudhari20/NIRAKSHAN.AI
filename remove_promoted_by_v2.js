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

// Patterns to match the "ThePromoted by" block with various spacing and line breaks
const patterns = [
    // Matches the multiline block seen in many files
    /ThePromoted by\s*<a href="https:\/\/creativedigilabs\.com\/">CreativeDigiLabs<\/a>/gi,
    /ThePromoted by\s*<a href="https:\/\/creativedigilabs\.com\/"\s*>CreativeDigiLabs<\/a>/gi,
    /ThePromoted by\s*<a href="https:\/\/creativedigilabs\.com\/"\s*>\s*CreativeDigiLabs\s*<\/a\s*>/gi,
    // Catch cases with splitting line breaks within the anchor
    /ThePromoted by\s*<a[^>]*href="[^"]*creativedigilabs[^"]*"[^>]*>\s*CreativeDigiLabs\s*<\/a>/gi
];

let filesProcessed = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalLength = content.length;

    // First remove the text/link itself
    patterns.forEach(pattern => {
        content = content.replace(pattern, '');
    });

    // Cleanup potential empty <p> tags left over
    content = content.replace(/<p>\s*<\/p>/g, '');
    // Cleanup the text-editor div if it's now just empty
    content = content.replace(/<div class="elementor-element[^>]*?data-widget_type="text-editor\.default"[^>]*?>\s*<div class="elementor-widget-container">\s*<\/div>\s*<\/div>/g, '');

    if (content.length !== originalLength) {
        fs.writeFileSync(file, content);
        filesProcessed++;
    }
});

console.log(`Successfully processed ${htmlFiles.length} files.`);
console.log(`Deep removal of "ThePromoted by CreativeDigiLabs" complete in ${filesProcessed} files.`);
