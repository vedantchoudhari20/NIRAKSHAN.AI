const fs = require('fs');

const blogPath = 'deploy/blog/index.html';
if (!fs.existsSync(blogPath)) {
    console.error('Blog path not found');
    process.exit(1);
}

let content = fs.readFileSync(blogPath, 'utf8');

// 1. Inject Comprehensive Global Styles for Layout and Hero
const layoutStyles = `
<style id="blog-layout-refinement-v5">
/* Hero Section Fix */
.elementor-element-4ea2b63 {
    background-image: url("../images/blog_hero_banner.png") !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    min-height: 450px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
    z-index: 1;
}

.elementor-element-4ea2b63 .elementor-background-overlay {
    background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%) !important;
    opacity: 1 !important;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: -1;
}

.elementor-element-4ea2b63 .elementor-heading-title {
    color: #ffffff !important;
    font-size: 110px !important;
    font-family: "Kids Knowledge", "dolpino", sans-serif !important;
    text-shadow: 4px 4px 20px rgba(0,0,0,0.4) !important;
    margin: 0 !important;
    padding: 20px 0 !important;
    text-align: center !important;
    width: 100%;
}

@media (max-width: 768px) {
    .elementor-element-4ea2b63 { min-height: 280px !important; }
    .elementor-element-4ea2b63 .elementor-heading-title { font-size: 60px !important; }
}

/* Blog Grid Fix - Resolve Distortion */
.elementor-posts-container.elementor-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 40px 30px !important;
    padding: 60px 0 !important;
}

@media (max-width: 1024px) {
    .elementor-posts-container.elementor-grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}

@media (max-width: 767px) {
    .elementor-posts-container.elementor-grid {
        grid-template-columns: 1fr !important;
    }
}

/* Consistent Thumbnail Ratios */
.elementor-posts--skin-classic .elementor-post__thumbnail {
    padding-bottom: 66% !important; /* 3:2 Aspect Ratio */
    position: relative !important;
    overflow: hidden !important;
    border-radius: 15px !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
    background: #f5f5f5;
}

.elementor-posts--skin-classic .elementor-post__thumbnail img {
    position: absolute !important;
    top: 0; left: 0;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    transition: transform 0.5s ease-out !important;
}

.elementor-post:hover .elementor-post__thumbnail img {
    transform: scale(1.08) !important;
}

/* Post Content Styling */
.elementor-post__text {
    padding: 20px 10px !important;
}

.elementor-post__title a {
    color: #333 !important;
    font-size: 22px !important;
    font-weight: 700 !important;
    line-height: 1.3 !important;
    transition: color 0.3s !important;
}

.elementor-post__title a:hover {
    color: #ffba00 !important;
}

.elementor-post__excerpt p {
    font-size: 15px !important;
    color: #666 !important;
    line-height: 1.6 !important;
    margin-top: 10px !important;
}

/* Hide Unwanted Elements */
.elementor-post-date, 
.elementor-post__read-more,
.elementor-post-info__item--type-comments,
.elementor-post-avatar {
    display: none !important;
}
</style>
`;

// Remove previous layout styles to avoid duplicates
content = content.replace(/<style id="blog-layout-refinement-v5">[\s\S]*?<\/style>/g, '');
content = content.replace(/<style id="blog-exhaustive-animations-v3">[\s\S]*?<\/style>/g, '');

// Insert new styles before </head>
content = content.replace('</head>', layoutStyles + '\n</head>');

// 2. Surgical Image Replacements
// Change Article 4 image (the vertical craft one)
content = content.replace(/WhatsApp-Image-2022-05-16-at-9.39.30-AM-3-225x300.jpeg/g, 'blog_art_craft.png');

// Change Article 5 image
content = content.replace(/cute-indian-children-18221350-300x225.jpg/g, 'blog_preschool_social.png');

// 3. Fix Section Wrappers if they are broken
// Ensure the section with id 4ea2b63 exists and is wrapping the title
// In our previous view it was indeed there.

// 4. Cleanup any leftover "Read More" text links or buttons that might be hardcoded as divs
content = content.replace(/<div class="elementor-post__read-more">[\s\S]*?<\/div>/g, '');

fs.writeFileSync(blogPath, content);
console.log('Successfully refined blog layout, fixed hero section, and replaced images.');
