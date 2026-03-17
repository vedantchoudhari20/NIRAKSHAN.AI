const fs = require('fs');
const path = require('path');

const srcDir = process.cwd();
const deployDir = path.join(srcDir, 'deploy');

// Ensure deploy dir exists
if (!fs.existsSync(deployDir)) fs.mkdirSync(deployDir);

function copyDirRecursive(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'deploy' || entry.name === 'node_modules' || entry.name === '.git') continue;
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('Copying files to deploy directory...');
copyDirRecursive(path.join(srcDir, 'images'), path.join(deployDir, 'images'));
copyDirRecursive(path.join(srcDir, 'thenurturingroots.com', 'wp-content'), path.join(deployDir, 'wp-content'));
copyDirRecursive(path.join(srcDir, 'thenurturingroots.com', 'wp-includes'), path.join(deployDir, 'wp-includes'));
if (fs.existsSync(path.join(srcDir, 'fonts.googleapis.com'))) copyDirRecursive(path.join(srcDir, 'fonts.googleapis.com'), path.join(deployDir, 'fonts.googleapis.com'));
if (fs.existsSync(path.join(srcDir, 'fonts.gstatic.com'))) copyDirRecursive(path.join(srcDir, 'fonts.gstatic.com'), path.join(deployDir, 'fonts.gstatic.com'));

fs.copyFileSync(path.join(srcDir, 'thenurturingroots.com', 'index.html'), path.join(deployDir, 'index.html'));

console.log('Fixing links in deploy directory...');

// Recursive file fixer for the deploy directory
function fixDeployLinks(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            fixDeployLinks(fullPath);
        } else if (entry.name.endsWith('.html') || entry.name.endsWith('.css') || entry.name.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            if (entry.name === 'index.html' && dir === deployDir) {
                // For root index.html, replace ../images/ with ./images/
                content = content.replace(/\.\.\/images\//g, './images/');
                // Also handle fonts
                content = content.replace(/\.\.\/fonts\.googleapis\.com\//g, './fonts.googleapis.com/');
                content = content.replace(/\.\.\/fonts\.gstatic\.com\//g, './fonts.gstatic.com/');
                content = content.replace(/\.\.\/www\.googletagmanager\.com\//g, './www.googletagmanager.com/');
            }

            // For CSS files deep in wp-content, the images are at ../../../../../images/
            // Many were already set to this by fix-links.js. 
            // Since wp-content structure is PRESERVED, those links should still work!
            // Example: wp-content/uploads/elementor/css/post25.css
            // Path to root images used to be ../../../../../images/ 
            // Now it is STILL ../../../../../images/ (wp-content -> uploads -> elementor -> css -> root -> images)
            // Wait, let's trace:
            // Old: thenurturingroots.com/wp-content/uploads/elementor/css/post25.css
            // New: wp-content/uploads/elementor/css/post25.css
            // Both are at the same depth relative to the root images folder.
            // So NO CHANGE is needed for deep files if they already point to the root images.

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

fixDeployLinks(deployDir);

console.log('Deploy folder ready at: ' + deployDir);
