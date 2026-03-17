const fs = require('fs');
const path = require('path');

const blogPath = path.join('c:', 'Users', 'Vedant', 'Downloads', 'thenurturingroots.com', 'deploy', 'blog', 'index.html');
const aboutPath = path.join('c:', 'Users', 'Vedant', 'Downloads', 'thenurturingroots.com', 'deploy', 'about-us', 'index.html');

if (!fs.existsSync(blogPath) || !fs.existsSync(aboutPath)) {
    console.error('Paths not found');
    process.exit(1);
}

const blogContent = fs.readFileSync(blogPath, 'utf8');
const aboutContent = fs.readFileSync(aboutPath, 'utf8');

// 1. Extract the head from about-us
const aboutHeadMatch = aboutContent.match(/<head>([\s\S]*?)<\/head>/);
if (!aboutHeadMatch) {
    console.error('Could not find head in about-us');
    process.exit(1);
}
let newHead = aboutHeadMatch[1];

// 2. Adjust head for blog
newHead = newHead.replace(/<title>.*?<\/title>/, '<title>Blog – The Nurturing Roots</title>');
newHead = newHead.replace(/canonical" href=".*?"/, 'canonical" href="../blog/index.html"');
newHead = newHead.replace(/shortlink" href=".*?"/, 'shortlink" href="../?p=193"');

// 3. Add my animation CSS and script back to newHead
const animationBlock = `
<style id="blog-exhaustive-animations-v3">
@keyframes blogIn {
    0% {
        opacity: 0;
        transform: perspective(1000px) rotateX(-10deg) scale(0.9) translateY(20px);
        filter: blur(4px);
    }
    100% {
        opacity: 1;
        transform: perspective(1000px) rotateX(0deg) scale(1) translateY(0);
        filter: blur(0px);
    }
}

.blog-exhaustive-anim {
    opacity: 0 !important;
    transition: opacity 0.4s ease !important;
}

.blog-exhaustive-anim.appeared {
    opacity: 1 !important;
    animation: blogIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards !important;
}

/* Fix layout shift */
.elementor-posts-container.elementor-grid {
    display: flex !important;
    flex-wrap: wrap !important;
}

/* Hover effects */
.elementor-post:hover img {
    transform: scale(1.04) !important;
    box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important;
}

.elementor-post__thumbnail img {
    border-radius: 12px !important;
    transition: transform 0.4s ease, box-shadow 0.4s ease !important;
}
</style>

<script id="blog-anim-script-v3">
document.addEventListener('DOMContentLoaded', function() {
    function initAnims() {
        const images = document.querySelectorAll('.blog-exhaustive-anim');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appeared');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        images.forEach(img => {
            observer.observe(img);
            // Backup for already visible or broken observer
            setTimeout(() => img.classList.add('appeared'), 1500);
        });
    }
    initAnims();
    // Re-run after a bit to catch any late-loading Elementor dynamic content
    setTimeout(initAnims, 1000);
});
</script>
`;

newHead += animationBlock;

// 4. Extract the body class from blog (to keep page-specific classes if any)
const bodyClassMatch = blogContent.match(/<body[^>]*class="([^"]*)"/);
const bodyClass = bodyClassMatch ? bodyClassMatch[1] : '';

// 5. Build the final content
// We replace everything from start to </body>
// Wait, I'll keep the Body tag start but use the classes from about-us adjusted for blog.
const newBodyStart = `<body itemtype="https://schema.org/WebPage" itemscope="itemscope" class="archive paged page-template-default page page-id-193 wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.5.1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-193">`;

const bodyContentMatch = blogContent.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (!bodyContentMatch) {
    console.error('Could not find body in blog');
    process.exit(1);
}
const bodyContent = bodyContentMatch[1];

const finalOutput = `<!DOCTYPE html>
<html lang="en-US">
<head>
${newHead}
</head>
${newBodyStart}
${bodyContent}
</body>
</html>`;

fs.writeFileSync(blogPath, finalOutput);
console.log('Successfully restored head and layout for blog page.');
