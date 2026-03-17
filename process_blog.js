const fs = require('fs');
const path = require('path');

const blogPath = path.join('c:', 'Users', 'Vedant', 'Downloads', 'thenurturingroots.com', 'deploy', 'blog', 'index.html');
const imgDir = path.join('c:', 'Users', 'Vedant', 'Downloads', 'thenurturingroots.com', 'deploy', 'images');

const imageMap = [
    {
        old: '../wp-content/uploads/2023/05/Picture1-300x132.jpg',
        new: './images/blog_holiday.png'
    },
    {
        old: '../wp-content/uploads/2022/12/New-Project-57-300x200.jpg',
        new: './images/blog_nurturing.png'
    },
    {
        old: '../wp-content/uploads/2022/12/183124535_163530915773701_2292106913759825189_n-300x300.jpg',
        new: './images/blog_facility.png'
    }
];

// Helper to copy images
function copyImage(src, destName) {
    const dest = path.join(imgDir, destName);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${src} to ${dest}`);
    } else {
        console.error(`Source not found: ${src}`);
    }
}

// Actual source paths for generated images (need to be updated with correct IDs)
const sourceImages = [
    'C:/Users/Vedant/.gemini/antigravity/brain/ca4fba3a-993a-4f44-934d-201b62082f32/blog_holiday_time_1772303029304.png',
    'C:/Users/Vedant/.gemini/antigravity/brain/ca4fba3a-993a-4f44-934d-201b62082f32/blog_nurturing_child_1772303045544.png',
    'C:/Users/Vedant/.gemini/antigravity/brain/ca4fba3a-993a-4f44-934d-201b62082f32/blog_preschool_facility_1772303078206.png'
];

copyImage(sourceImages[0], 'blog_holiday.png');
copyImage(sourceImages[1], 'blog_nurturing.png');
copyImage(sourceImages[2], 'blog_facility.png');

let content = fs.readFileSync(blogPath, 'utf8');

// 1. Replace the first 3 images and add animation class
imageMap.forEach(img => {
    const escapedOld = img.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedOld, 'g');
    content = content.replace(regex, img.new);
});

// 2. Remove Read More buttons
content = content.replace(/<a[^>]*class="[^"]*elementor-post__read-more[^"]*"[^>]*>[\s\S]*?<\/a>/g, '');

// 3. Remove Dates
// <span class="elementor-post-date"> ... </span>
content = content.replace(/<span class="elementor-post-date">[\s\S]*?<\/span>/g, '');

// 4. Add animation class to all blog images
// Look for elementor-post__thumbnail images
content = content.replace(/(<div class="elementor-post__thumbnail">\s*<img[^>]*class="[^"]*)/g, '$1 blog-exhaustive-anim ');

// 5. Inject Animation CSS
const animationCSS = `
<style id="blog-exhaustive-animations">
@keyframes exhaustiveIn {
    0% {
        opacity: 0;
        transform: perspective(1000px) rotateX(-20deg) rotateY(20deg) scale(0.8) translateY(40px);
        filter: blur(10px);
    }
    60% {
        opacity: 1;
        transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) scale(1.05) translateY(-10px);
        filter: blur(0px);
    }
    100% {
        opacity: 1;
        transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0);
    }
}

.blog-exhaustive-anim {
    opacity: 0;
    transition: all 0.5s ease;
    cursor: pointer;
}

.blog-exhaustive-anim.elementor-posts--thumbnail-top img,
.elementor-post__thumbnail img {
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.elementor-post:hover .elementor-post__thumbnail img {
    transform: scale(1.05);
    box-shadow: 0 15px 45px rgba(0,0,0,0.15);
}

/* Intersection Observer will trigger this */
.blog-exhaustive-anim.appeared {
    animation: exhaustiveIn 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appeared');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.blog-exhaustive-anim').forEach(img => {
        observer.observe(img);
    });
});
</script>
`;

// Inject before </head>
content = content.replace('</head>', animationCSS + '</head>');

fs.writeFileSync(blogPath, content);
console.log('Successfully updated blog/index.html with images, removal of buttons/dates, and animations.');
