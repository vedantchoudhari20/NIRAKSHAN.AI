const fs = require('fs');
const path = require('path');

const blogPath = path.join('c:', 'Users', 'Vedant', 'Downloads', 'thenurturingroots.com', 'deploy', 'blog', 'index.html');

if (!fs.existsSync(blogPath)) {
    console.error('Blog path not found:', blogPath);
    process.exit(1);
}

let content = fs.readFileSync(blogPath, 'utf8');

// 1. Fix image paths (from ./images/ to ../images/)
content = content.replace(/src="\.\/images\/blog_/g, 'src="../images/blog_');

// 2. Remove duplicate/prev animation styles and scripts
content = content.replace(/<style id="blog-exhaustive-animations">[\s\S]*?<\/style>/g, '');
// Remove the specific script block I added
content = content.replace(/<script>[\s\S]*?document\.querySelectorAll\('\.blog-exhaustive-anim'\)[\s\S]*?<\/script>/g, '');

// 3. Fix duplicate classes
content = content.replace(/blog-exhaustive-anim\s+blog-exhaustive-anim/g, 'blog-exhaustive-anim');

// 4. Pure CSS fallback: If images don't appear in 3 seconds, show them anyway
// and use Intersection Observer for the entrance animation.
const improvedAnimation = `
<style id="blog-exhaustive-animations">
@keyframes exhaustiveIn {
    0% {
        opacity: 0;
        transform: perspective(1000px) rotateX(-15deg) rotateY(15deg) scale(0.85) translateY(30px);
        filter: blur(5px);
    }
    100% {
        opacity: 1;
        transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0);
        filter: blur(0px);
    }
}

.blog-exhaustive-anim {
    opacity: 0;
    transition: opacity 0.5s ease;
}

.blog-exhaustive-anim.appeared {
    animation: exhaustiveIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards !important;
}

/* Hover effects */
.elementor-post:hover .elementor-post__thumbnail img {
    transform: scale(1.03);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15) !important;
}

.elementor-post__thumbnail img {
    border-radius: 12px !important;
    transition: transform 0.4s ease, box-shadow 0.4s ease !important;
}
</style>

<script id="blog-anim-script">
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.blog-exhaustive-anim');
    
    // Intersection Observer for scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appeared');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => {
        observer.observe(img);
        // Safety: If image is already in viewport or observer fails, show after delay
        setTimeout(() => {
            img.classList.add('appeared');
        }, 2000);
    });
});
</script>
`;

// Inject before </head>
content = content.replace('</head>', improvedAnimation + '\n</head>');

fs.writeFileSync(blogPath, content);
console.log('Successfully fixed blog layout, paths, and animations.');
