const fs = require('fs');
const path = 'deploy/blog/index.html';
let content = fs.readFileSync(path, 'utf8');

// Match the entire <article> block for post-853 (Pandemic Post)
const pattern = /<article\s+class="elementor-post elementor-grid-item post-853[^>]*>[\s\S]*?<\/article>/;

if (pattern.test(content)) {
    content = content.replace(pattern, '');
    fs.writeFileSync(path, content);
    console.log('Successfully removed the pandemic blog post.');
} else {
    console.log('Could not find the pandemic blog post with ID post-853.');
}
