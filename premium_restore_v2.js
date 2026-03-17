const fs = require('fs');
const path = require('path');

const deployDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy';

// Unique content for specific pages
const specificContent = {
    'little-explorers': {
        title: "Little Explorers (Playgroup)",
        color: "#00b894",
        desc: "At Nurturing Roots, our Little Explorers curriculum ensures kids have the right exposure towards life skills, developing a habit of sharing and caring, and getting comfortable in a social preschool environment."
    },
    'curious-cubs': {
        title: "Curious Cubs (Nursery)",
        color: "#6c5ce7",
        desc: "The Curious Cubs (Nursery) program is designed to nurture a child's natural curiosity and encourage independent thinking. Through structured play and sensory-rich activities, we build a strong foundation for future learning."
    },
    'rising-star-1': {
        title: "Rising Star 1 (LKG)",
        color: "#0984e3",
        desc: "Our Rising Star 1 (LKG) curriculum focuses on literacy, numeracy, and social-emotional growth. We introduce foundational concepts in a fun, engaging way that prepares children for school success."
    },
    'rising-star-2': {
        title: "Rising Star 2 (UKG)",
        color: "#fdcb6e",
        desc: "The Rising Star 2 (UKG) program prepares children for the transition to primary school. We emphasize advanced literacy, logical reasoning, and complex problem-solving skills in a nurturing environment."
    },
    'our-mission': {
        title: "Our Vision & Mission",
        color: "#ff7675",
        content: `
            <div style="text-align: center; max-width: 900px; margin: 0 auto; padding: 40px 20px;">
                <div style="background: #fff5f5; padding: 40px; border-radius: 30px; border: 2px solid #ff7675; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(255,118,117,0.1);">
                    <h2 style="color: #ff7675; font-size: 2.5rem; margin-top: 0;">Our Vision</h2>
                    <p style="font-size: 1.3rem; line-height: 1.8; color: #444;">
                        To be a leading early childhood education provider that nurtures confident, compassionate, and creative individuals who are ready to face the world with resilience and joy.
                    </p>
                </div>
                <div style="background: #f0fff4; padding: 40px; border-radius: 30px; border: 2px solid #55efc4; box-shadow: 0 10px 30px rgba(85,239,196,0.1);">
                    <h2 style="color: #00b894; font-size: 2.5rem; margin-top: 0;">Our Mission</h2>
                    <p style="font-size: 1.3rem; line-height: 1.8; color: #444;">
                        Our mission is to provide high-quality early childhood education that fosters a love for learning and prepares children for success in school and life. 
                        We aim to nurture children's physical, social, emotional, and cognitive development through a perfect blend of play-based and structured activities.
                    </p>
                </div>
            </div>
        `
    }
};

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

const files = getAllHtmlFiles(deployDir);

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    const slug = path.basename(path.dirname(file));

    // 1. Remove WhatsApp Plugin
    html = html.replace(/<link[^>]*whatsapp[^>]*>/g, '');
    html = html.replace(/<script[^>]*whatsapp[^>]*>[\s\S]*?<\/script>/g, '');
    html = html.replace(/<script[^>]*njt-whatsapp[^>]*>[\s\S]*?<\/script>/g, '');
    html = html.replace(/<div[^>]*whatsapp[^>]*>[\s\S]*?<\/div>/g, ''); // Common wrapper
    html = html.replace(/var njt_wa = [\s\S]*?};/g, ''); // Global JS config for whatsapp

    // 2. Strip srcset and sizes
    html = html.replace(/\b(srcset|sizes)="[^"]*"/g, '');

    // 3. Fix Duplicate Body Tags
    while (html.match(/<\/body>\s*<\/body>/)) {
        html = html.replace(/<\/body>\s*<\/body>/g, '</body>');
    }

    // 4. Force Visibility & fix Animations
    // Remove elementor-invisible class
    html = html.replace(/\belementor-invisible\b/g, '');

    // 5. Inject Premium Styling for Custom Sections
    if (specificContent[slug]) {
        const item = specificContent[slug];

        // Define the premium content block
        let premiumBlock = '';
        if (item.content) {
            premiumBlock = item.content;
        } else {
            premiumBlock = `
                <div style="text-align: center; max-width: 850px; margin: 0 auto; padding: 60px 20px; font-family: 'Outfit', sans-serif;">
                    <div style="display: inline-block; padding: 5px 20px; background: ${item.color}22; color: ${item.color}; border-radius: 50px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                        Curriculum Details
                    </div>
                    <h2 style="color: ${item.color}; font-size: 3.5rem; margin-bottom: 30px; font-weight: 800;">${item.title}</h2>
                    <div style="background: #fff; padding: 50px; border-radius: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); border: 2px solid ${item.color}33;">
                        <p style="font-size: 1.5rem; line-height: 2; color: #444; font-weight: 400;">
                            ${item.desc}
                        </p>
                    </div>
                    <div style="margin-top: 40px; display: flex; justify-content: center; gap: 20px;">
                        <div style="background: #fff; padding: 20px; border-radius: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                            <span style="display: block; font-size: 0.9rem; color: #999; text-transform: uppercase;">Age Category</span>
                            <span style="font-size: 1.2rem; font-weight: 700; color: #333;">${slug === 'little-explorers' ? '1.5 - 2.5 Years' : slug === 'curious-cubs' ? '2.5 - 3.5 Years' : slug === 'rising-star-1' ? '3.5 - 4.5 Years' : '4.5 - 5.5 Years'}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Identify the content area to replace.
        // We look for the main section we created earlier or a placeholder.
        const startMarker = '<section class="elementor-section elementor-top-section elementor-element custom-content-section"';
        const endMarker = '</section>';

        if (html.includes(startMarker)) {
            const parts = html.split(startMarker);
            const afterStart = parts[1];
            const endIdx = afterStart.indexOf(endMarker);
            const originalSection = startMarker + afterStart.substring(0, endIdx + 10);

            // Re-construct the section with premium block
            const newSection = `
                <section class="elementor-section elementor-top-section elementor-element" style="background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%); padding: 100px 0;">
                    <div class="elementor-container elementor-column-gap-default">
                        <div class="elementor-column elementor-col-100">
                            <div class="elementor-widget-wrap">
                                ${premiumBlock}
                            </div>
                        </div>
                    </div>
                </section>
            `;
            html = html.replace(originalSection, newSection);
        }

        // SPECIAL: If it's the Vision/Mission page, we MUST fix the title distorted from "Our Team"
        if (slug === 'our-mission') {
            html = html.replace(/<h1[^>]*>Our Team<\/h1>/gi, '<h1 class="elementor-heading-title elementor-size-default">Vision & Mission</h1>');
            html = html.replace(/<h3[^>]*>Our Team<\/h3>/gi, '<h3 class="elementor-heading-title elementor-size-default">Our Core Values</h3>');
        }
    }

    // 6. Fix Home Page Redirections
    // Ensure all links like href="./about-us/" are corrected if broken
    // Actually, fix_links.js should have done this, but let's be sure.
    html = html.replace(/href="\.\/([^"]+)\/"/g, (match, p1) => {
        return `href="../${p1}/index.html"`;
    });
    // On the main index.html (home), the links are different
    if (file.endsWith('deploy/index.html')) {
        html = html.replace(/href="\.\/([^"]+)\/"/g, 'href="$1/index.html"');
    }

    // 7. Inject a powerful visibility script at the end
    const customScript = `
    <!-- Comprehensive UI Fixer -->
    <script>
    (function() {
        function globalFix() {
            // Force visibility of all hidden sections
            document.querySelectorAll('.elementor-invisible, .elementor-motion-effects-layer').forEach(el => {
                el.classList.remove('elementor-invisible');
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.transform = 'none';
            });
            
            // Fix images with broken sizes or loading issues
            document.querySelectorAll('img').forEach(img => {
                img.style.opacity = '1';
                img.style.visibility = 'visible';
                if (img.src.includes('whatsapp_logo.svg') || img.src.includes('njt-whatsapp')) {
                    img.closest('div').style.display = 'none';
                }
            });

            // Remove any leftover WhatsApp popup elements
            document.querySelectorAll('[id*="whatsapp"], [class*="whatsapp"]').forEach(el => {
                if (!el.classList.contains('elementor-social-icon-whatsapp')) {
                    el.style.display = 'none';
                }
            });
            
            // Fix background images that might be missing
            document.querySelectorAll('.e-gallery-image').forEach(el => {
                const thumb = el.getAttribute('data-thumbnail');
                if (thumb) {
                    el.style.backgroundImage = 'url("' + thumb + '")';
                    el.style.backgroundSize = 'cover';
                    el.style.backgroundPosition = 'center';
                    el.style.height = el.getAttribute('data-height') + 'px';
                }
            });
        }
        
        window.addEventListener('DOMContentLoaded', globalFix);
        window.addEventListener('load', globalFix);
        setInterval(globalFix, 2000); // Periodic check for dynamic content
    })();
    </script>
    `;

    if (!html.includes('Comprehensive UI Fixer')) {
        html = html.replace('</body>', customScript + '</body>');
    }

    fs.writeFileSync(file, html, 'utf8');
});

console.log("Premium Restore Complete!");
