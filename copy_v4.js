const fs = require('fs');
const src = "C:\\Users\\Vedant\\.gemini\\antigravity\\brain\\1d49d66d-a21e-4c1f-bf1e-32e2bee9bbad\\indian_girl_logo_v4_1772287161655.png";
const dest = "c:\\Users\\Vedant\\Downloads\\thenurturingroots.com\\deploy\\images\\indian_girl_logo_v4.png";
fs.copyFileSync(src, dest);
console.log('SUCCESS: Copied indian_girl_logo_v4 to images folder.');
