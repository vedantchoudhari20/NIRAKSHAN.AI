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
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

const htmlFiles = getAllFiles(deployDir);
htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Force Eager Loading for all images to ensure they show up immediately
    content = content.replace(/loading="lazy"/g, 'loading="eager"');

    // 2. Remove all "elementor-invisible" classes directly from HTML
    content = content.replace(/\belementor-invisible\b/g, '');

    // 3. Inject a script that specifically targets and fixes the blocky dividers and helps the chatbot
    const injection = `
    <!-- Final visual polish script -->
    <script>
    (function() {
        function cleanup() {
            // Fix dividers
            document.querySelectorAll('.elementor-divider').forEach(d => {
                d.style.height = 'auto';
                d.style.minHeight = '0';
                d.style.background = 'none';
            });
            document.querySelectorAll('.elementor-divider-separator').forEach(s => {
                s.style.display = 'block';
                s.style.height = '1px';
                s.style.borderTop = '1.5px dashed #ccc';
                s.style.background = 'none';
                s.style.width = '100px';
                s.style.margin = '20px auto';
            });
            
            // Fix images that might be hidden by masks or motion effects
            document.querySelectorAll('img').forEach(img => {
                img.style.opacity = '1';
                img.style.visibility = 'visible';
                img.style.webkitMaskImage = 'none';
                img.style.maskImage = 'none';
                if(img.parentElement.classList.contains('elementor-widget-container')) {
                    img.parentElement.style.opacity = '1';
                    img.parentElement.style.visibility = 'visible';
                }
            });
        }
        window.addEventListener('load', cleanup);
        setTimeout(cleanup, 100);
        setTimeout(cleanup, 1000);
        setTimeout(cleanup, 3000);
    })();
    </script>
    `;

    if (content.includes('</body>') && !content.includes('<!-- Final visual polish script -->')) {
        content = content.replace('</body>', injection + '</body>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Final Polish Applied to all pages.');
