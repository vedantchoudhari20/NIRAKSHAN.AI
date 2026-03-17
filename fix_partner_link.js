const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

const target = /<a class="elementor-button elementor-button-link elementor-size-sm"[\s\n]+href="\.\/become-a-partner\/index\.html">/g;
const replacement = '<a class="elementor-button elementor-button-link elementor-size-sm"\n                                          href="./preschool-franchise/index.html">';

if (target.test(content)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(filePath, content);
    console.log('SUCCESS: Updated "Connect with us!" button link.');
} else {
    console.log('FAILED: Link target not found.');
    // Fallback search
    if (content.includes('Connect with us!')) {
         console.log('Found "Connect with us!" text but regex failed.');
    }
}
