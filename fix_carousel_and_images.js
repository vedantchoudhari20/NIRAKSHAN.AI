const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replace learning method images
content = content.replace(/src="\.\/images\/New-Project-10\.jpg"/g, 'src="./images/indian_preschool_girl_raising_hands.png"');
content = content.replace(/src="\.\/images\/New-Project-11\.jpg"/g, 'src="./images/indian_preschool_boy_playing_blocks.png"');
content = content.replace(/src="\.\/images\/New-Project-12\.jpg"/g, 'src="./images/indian_girl_student_clock.png"');

// Unhide carousel section
content = content.replace(/elementor-element-e9aaaa9 elementor-hidden-tablet elementor-hidden-mobile/g, 'elementor-element-e9aaaa9');

// Update globalFix initialization
content = content.replace(/window\.addEventListener\('DOMContentLoaded', globalFix\);/g, "window.addEventListener('DOMContentLoaded', () => { globalFix(); if (typeof initAll === 'function') initAll(); });");
content = content.replace(/window\.addEventListener\('load', globalFix\);/g, "window.addEventListener('load', () => { globalFix(); if (typeof initAll === 'function') initAll(); });");
content = content.replace(/setInterval\(globalFix, 2000\);/g, "setInterval(() => { globalFix(); if (typeof initAll === 'function') initAll(); }, 2000);");

fs.writeFileSync(filePath, content);
console.log('Images and carousel visibility fixed via script.');
