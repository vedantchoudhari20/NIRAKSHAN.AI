const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    // Check if we should serve from the deploy folder (launch ready)
    let baseDir = fs.existsSync(path.join(__dirname, 'deploy')) ? path.join(__dirname, 'deploy') : __dirname;

    let filePath = req.url === '/' ? '/index.html' : req.url;

    // If we are not in deploy mode, use the old redirect logic
    if (baseDir === __dirname && filePath === '/index.html') {
        filePath = '/thenurturingroots.com/index.html';
    }

    // Handle URLs with query strings (like /fonts/css?family=...)
    filePath = filePath.split('?')[0];

    let fullPath = path.join(baseDir, filePath);

    const extname = String(path.extname(fullPath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(fullPath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('File not found: ' + filePath);
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Main page is at http://localhost:${PORT}/thenurturingroots.com/index.html`);
});
