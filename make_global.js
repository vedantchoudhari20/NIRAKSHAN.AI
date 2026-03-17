const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Make initAll global
content = content.replace(/function initAll\(\) \{/g, 'window.initNurturingGallery = function () {');
content = content.replace(/initAll\(\);/g, 'window.initNurturingGallery();');

// Update the global fix call
content = content.replace(/if \(typeof initAll === 'function'\) initAll\(\);/g, "if (typeof window.initNurturingGallery === 'function') window.initNurturingGallery();");

fs.writeFileSync(filePath, content);
console.log('initAll made global as initNurturingGallery');
