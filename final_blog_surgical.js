const fs = require('fs');

const blogPath = 'deploy/blog/index.html';
let content = fs.readFileSync(blogPath, 'utf8');

// 1. Fix the column width constraint (50% to 100%)
content = content.replace(/elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-d6d38da/g,
    'elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-d6d38da');

// 2. Correct all blog image paths to the localized images folder
content = content.replace(/src="\.\.\/wp-content\/uploads\/2022\/12\/blog_art_craft\.png"/g, 'src="../images/blog_art_craft.png"');
content = content.replace(/src="\.\.\/wp-content\/uploads\/2022\/12\/blog_preschool_social\.png"/g, 'src="../images/blog_preschool_social.png"');

// Ensure the vertical image link is gone
content = content.replace(/WhatsApp-Image-2022-05-16-at-9.39.30-AM-3-225x300.jpeg/g, 'blog_art_craft.png');

// 3. Fix the Hero Title spacing/font
content = content.replace(/<h1 class="elementor-heading-title elementor-size-default">\s*Blog\s*<\/h1>/g,
    '<h1 class="elementor-heading-title elementor-size-default">Blog</h1>');

// 4. Force 3-column grid via internal style update (reinforce)
const gridStyleUpdate = `
<style id="blog-grid-force">
.elementor-element-1126a17 .elementor-posts-container.elementor-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    display: grid !important;
    width: 100% !important;
    max-width: 1200px !important;
    margin: 0 auto !important;
}
.elementor-element-d6d38da { width: 100% !important; max-width: 100% !important; flex: 0 0 100% !important; }
</style>
`;
content = content.replace('</head>', gridStyleUpdate + '\n</head>');

fs.writeFileSync(blogPath, content);
console.log('FINAL: Corrected column widths, fixed image paths, and enforced 3-column grid.');
