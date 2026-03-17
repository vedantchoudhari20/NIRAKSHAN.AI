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

        const relativeToRoot = path.relative(path.dirname(filePath), deployDir).replace(/\\/g, '/') || '.';
        const imagesPath = relativeToRoot + '/images';

        // 1. Fix Enrol -> Enquire (Case insensitive but careful)
        // Only replace if it looks like the button text or label
        if (content.includes('Enrol')) {
            content = content.replace(/Enrol Now/g, 'Enquire Now');
            content = content.replace(/Enrol/g, 'Enquire');
            changed = true;
        }

        // 2. Fix Broken SVG Data URIs (single quotes inside url('...'))
        if (ext === '.html') {
            const dataUriPattern = /url\(['"]data:image\/svg\+xml,[^'"]+['"]\)/g;
            if (dataUriPattern.test(content)) {
                content = content.replace(dataUriPattern, (match) => {
                    // Replace &#039; or ' with %27 to avoid breaking the CSS url() wrap
                    return match.replace(/&#039;/g, '%27').replace(/'(?=[^()]*\))/g, '%27');
                });
                changed = true;
            }
        }

        // 3. Ensure all background images point to /images/
        // Look for any long wp-content/uploads paths that survived
        const uploadPattern = /https?:\/\/thenurturingroots\.com\/wp-content\/uploads\/(?:\d{4}\/\d{2}\/)?/g;
        if (uploadPattern.test(content)) {
            content = content.replace(uploadPattern, imagesPath + '/');
            changed = true;
        }

        // 4. Force visibility for sections that might be invisible due to motion effects
        if (ext === '.css' && filePath.includes('custom-widgets.css')) {
            const visibilityFix = `
/* Force all elements to be visible */
.elementor-element.elementor-invisible,
.elementor-motion-effects-layer,
.elementor-motion-effects-container {
    visibility: visible !important;
    opacity: 1 !important;
    animation: none !important;
    transform: none !important;
}
`;
            if (!content.includes('.elementor-motion-effects-layer')) {
                content += visibilityFix;
                changed = true;
            }
        }

        // 5. Fix common missing backgrounds in Elementor generated CSS
        if (ext === '.css' && !filePath.includes('custom-widgets.css')) {
            // If it uses background-image: url(...) ensure it points to ../images/
            // This was mostly done but let's be double sure.
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Final Fixes applied to: ${filePath}`);
        }
    }
});
