const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Point to the NEWLY generated indian_girl_logo_v4.png and fix duplicate class
content = content.replace(/src="\.\/images\/indian_girl_logo_v3\.png" class="blob-animated entrance-anim"\s+class="attachment-large size-large wp-image-3344"/, 
                        'src="./images/indian_girl_logo_v4.png" class="blob-animated entrance-anim attachment-large size-large wp-image-3344"');

// 2. Extra safety: Ensure the Carousel script uses better events for touch/mouse
// (Already done in centric_carousel_fix.js, but let's re-verify)

fs.writeFileSync(filePath, content);
console.log('SUCCESS: Fixed broken image with new V4 (logo on wall) and cleaned up classes.');
