const fs = require('fs');
const path = require('path');

const deployDir = path.join(__dirname, 'deploy');

function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else if (name.endsWith('.html')) {
            files.push(name);
        }
    }
    return files;
}

const htmlFiles = getFiles(deployDir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove WhatsApp div
    content = content.replace(/<div id="wa"><\/div>/g, '');

    // 2. Remove WhatsApp scripts and configs
    // Remove blocks like <script id="nta-js-global-js-extra">...</script>
    content = content.replace(/<script id="nta-js-global-js-extra">[\s\S]*?<\/script>/g, '');
    content = content.replace(/<script src="[^"]*?wp-whatsapp[^"]*?"[\s\S]*?><\/script>/g, '');
    content = content.replace(/<script id="nta-js-popup-js-extra">[\s\S]*?<\/script>/g, '');
    content = content.replace(/<script id="nta-wa-libs-js-extra">[\s\S]*?<\/script>/g, ''); // just in case

    // 3. Remove CSS related to WhatsApp if it's explicitly linked
    content = content.replace(/<link rel="stylesheet" href="[^"]*?wp-whatsapp[^"]*?"[\s\S]*?>/g, '');

    fs.writeFileSync(file, content, 'utf8');
});

console.log('WhatsApp removed from all pages.');
