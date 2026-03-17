const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Final check on ././ usage
content = content.replace(/src="\.\/\.\/images\//g, 'src="./images/');
content = content.replace(/src="\.\/\.\/\.\/images\//g, 'src="./images/');

// Ensure the 3D gallery script is robust
// Force visibility on the 3D gallery containers
const cssInject = `
<style>
  .n-gallery-3d, .n-viewport, .n-card {
    visibility: visible !important;
    display: flex !important;
  }
  .n-viewport, .n-card {
    display: block !important;
  }
  .n-card img {
    opacity: 1 !important;
  }
</style>
`;

if (!content.includes('.n-gallery-3d, .n-viewport, .n-card {')) {
    content = content.replace('</head>', cssInject + '</head>');
}

fs.writeFileSync(filePath, content);
console.log('Final fixes applied to index.html');
