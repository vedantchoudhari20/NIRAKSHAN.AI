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
        let orgContent = content;

        const relativeToRoot = path.relative(path.dirname(filePath), deployDir).replace(/\\/g, '/') || '.';
        const imagesRelPath = (ext === '.css' ? '../images' : (relativeToRoot === '.' ? 'images' : relativeToRoot + '/images'));

        // 1. Fix wp-content/uploads paths (absolute or relative)
        // Regex to catch: /wp-content/uploads/2023/01/file.png or wp-content/uploads/file.png
        // but preserve the filename
        const wpPattern = /(?:\/|(?:"|'))?wp-content\/uploads\/(?:\d{4}\/\d{2}\/)?([^'"\)\s?]+)/g;
        content = content.replace(wpPattern, (match, filename) => {
            // Check if it's already inside a quote or url()
            let leader = '';
            if (match.startsWith('"') || match.startsWith("'")) leader = match[0];
            else if (match.startsWith('/')) leader = ''; // if it started with /, we don't need it for relative path

            return leader + imagesRelPath + '/' + filename;
        });

        // 2. Fix data URI separators (Curvy lines)
        if (ext === '.html') {
            content = content.replace(/url\(['"]data:image\/svg\+xml,[^'"]+['"]\)/g, (match) => {
                // Ensure double encoded quotes are fixed
                return match.replace(/&#039;/g, '%27').replace(/'(?=[^()]*\))/g, '%27');
            });

            // 3. Inject "Force Visible" script before </body>
            if (content.includes('</body>') && !content.includes('/* Force Visible Script */')) {
                const forceVisibleScript = `
    <!-- Force Visible Script -->
    <script>
    (function() {
        function forceVisible() {
            document.querySelectorAll('.elementor-invisible, .elementor-motion-effects-layer, .elementor-motion-effects-container').forEach(el => {
                el.classList.remove('elementor-invisible');
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.animation = 'none';
            });
            // Fix images that might be stuck
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                if (img.complete && img.naturalHeight === 0) {
                   console.log('Broken image detected:', img.src);
                }
            });
        }
        window.addEventListener('load', forceVisible);
        setTimeout(forceVisible, 500);
        setTimeout(forceVisible, 2000);
    })();
    </script>
`;
                content = content.replace('</body>', forceVisibleScript + '</body>');
            }
        }

        // 4. Fix Enquire Now text again (just in case)
        content = content.replace(/Enrol Now/g, 'Enquire Now');
        content = content.replace(/Enrol/g, 'Enquire');

        if (content !== orgContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Deep Fix applied to: ${filePath}`);
        }
    }
});
