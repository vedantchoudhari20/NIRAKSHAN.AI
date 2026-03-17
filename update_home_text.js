const fs = require('fs');
const path = 'deploy/index.html';
let content = fs.readFileSync(path, 'utf8');

// Using a very loose regex to catch the spans/whitespaces
const pattern = /Welcome to The Nurturing Roots!\s+The best\s+preschool in Nerul West &amp; East\.\s+Safest\s+daycare in Nerul for your Kid\./;
const replacement = 'Welcome to The Nurturing Roots! The best preschool for your child !';

if (pattern.test(content)) {
    content = content.replace(pattern, replacement);
    fs.writeFileSync(path, content);
    console.log('Successfully updated the welcome text on the home page.');
} else {
    // Try without encoded &
    const pattern2 = /Welcome to The Nurturing Roots!\s+The best\s+preschool in Nerul West & East\.\s+Safest\s+daycare in Nerul for your Kid\./;
    if (pattern2.test(content)) {
        content = content.replace(pattern2, replacement);
        fs.writeFileSync(path, content);
        console.log('Successfully updated (non-encoded &).');
    } else {
        console.log('Could not find the target text using regex.');
    }
}
