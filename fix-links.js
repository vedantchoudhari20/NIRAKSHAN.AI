const fs = require('fs');
const path = require('path');

const rootDir = process.argv[2] || process.cwd();

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

const files = getAllFiles(rootDir).filter(f => !f.includes('node_modules') && !f.includes('.git'));
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'otf', 'ttf', 'woff', 'woff2'];

files.forEach(file => {
    if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        const relativeToRoot = path.relative(path.dirname(file), rootDir);
        const imagesPath = path.join(relativeToRoot, 'images').replace(/\\/g, '/');

        // Robust remapping function
        function remapResource(match, prefix, sitePrefix, fullPath, filename, ext) {
            if (imageExtensions.includes(ext.toLowerCase())) {
                return `${imagesPath}/${filename}`;
            }
            return match;
        }

        // 1. Handle quoted strings (src, href, etc.)
        // Matches "wp-content/uploads/.../file.ext" or './wp-content/uploads/...'
        const quotedRegex = /(['"])(\.\/)?(thenurturingroots\.com\/)?wp-content\/uploads\/[^'"]*?\/([^'"\/]+\.([a-z0-9]+))\1/gi;
        content = content.replace(quotedRegex, (match, quote, p1, p2, filename, ext) => {
            if (imageExtensions.includes(ext.toLowerCase())) {
                return `${quote}${imagesPath}/${filename}${quote}`;
            }
            return match;
        });

        // 2. Handle srcset (unquoted links inside srcset)
        // Matcheswp-content/uploads/.../file.ext followed by space or comma
        const srcsetRegex = /(\.\/)?(thenurturingroots\.com\/)?wp-content\/uploads\/[^ \s,]+?\/([^ \s,\/]+\.([a-z0-9]+))(?=[ \s,])/gi;
        content = content.replace(srcsetRegex, (match, p1, p2, filename, ext) => {
            if (imageExtensions.includes(ext.toLowerCase())) {
                return `${imagesPath}/${filename}`;
            }
            return match;
        });

        // 3. Handle url(...) in CSS
        const cssUrlRegex = /url\(['"]?(\.\/)?(thenurturingroots\.com\/)?wp-content\/uploads\/[^'"]*?\/([^'"]\/]+\.([a-z0-9]+))['"]?\)/gi;
        content = content.replace(cssUrlRegex, (match, p1, p2, filename, ext) => {
            if (imageExtensions.includes(ext.toLowerCase())) {
                return `url("${imagesPath}/${filename}")`;
            }
            return match;
        });

        if (content !== originalContent) {
            console.log(`Updated: ${file}`);
            fs.writeFileSync(file, content, 'utf8');
        }
    }
});
