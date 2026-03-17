const fs = require('fs');
const path = require('path');

const deployDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy';

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
            <div style="text-align: center; max-width: 950px; margin: 0 auto; padding: 60px 20px; font-family: 'Outfit', sans-serif;">
                <div style="display: inline-block; padding: 5px 23px; background: #ff767522; color: #ff7675; border-radius: 50px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px;">
                    Our Core Values
                </div>
                <h2 style="color: #ff7675; font-size: 3.5rem; margin-bottom: 50px; font-weight: 800;">Vision & Mission</h2>
                
                <div style="display: grid; grid-template-columns: 1fr; gap: 40px;">
                    <div style="background: #fff; padding: 50px; border-radius: 40px; box-shadow: 0 30px 60px rgba(255,118,117,0.15); border: 2px solid #ff767533; transition: transform 0.3s ease;">
                        <h3 style="color: #ff7675; font-size: 2.2rem; margin-top: 0; margin-bottom: 20px;">Our Vision</h3>
                        <p style="font-size: 1.4rem; line-height: 1.8; color: #444;">
                            To be a globally recognized early childhood education provider that nurtures confident, compassionate, and creative individuals who are equipped with the skills and mindset to thrive in an ever-evolving world.
                        </p>
                    </div>
                    
                    <div style="background: #fff; padding: 50px; border-radius: 40px; box-shadow: 0 30px 60px rgba(85,239,196,0.15); border: 2px solid #00b89433; transition: transform 0.3s ease;">
                        <h3 style="color: #00b894; font-size: 2.2rem; margin-top: 0; margin-bottom: 20px;">Our Mission</h3>
                        <p style="font-size: 1.4rem; line-height: 1.8; color: #444;">
                            Our mission is to provide an inclusive, stimulating, and safe learning environment that respects the unique potential of every child. We aim to foster holistic development through an innovative blend of play-based exploration and structured academic foundation.
                        </p>
                    </div>
                </div>
                
                <div style="margin-top: 60px; text-align: left; background: #f9f9ff; padding: 40px; border-radius: 30px;">
                    <h4 style="color: #6c5ce7; font-size: 1.8rem; margin-top: 0;">Our Approach</h4>
                    <ul style="font-size: 1.2rem; color: #555; line-height: 2;">
                        <li><strong>Child-Centric Learning:</strong> Putting the needs and interests of the child first.</li>
                        <li><strong>Holistic Growth:</strong> Focusing on cognitive, social, emotional, and physical health.</li>
                        <li><strong>Safe Haven:</strong> Providing a secure and nurturing "second home" for every student.</li>
                        <li><strong>Excellence:</strong> Maintaining the highest standards of preschool pedagogy.</li>
                    </ul>
                </div>
            </div>
        `
    }
};

function getAllHtmlFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        if (fs.statSync(file).isDirectory()) {
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

    if (specificContent[slug]) {
        const item = specificContent[slug];
        console.log(`Processing: ${slug}`);

        // 1. Update Title Tag
        html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${item.title} | The Nurturing Roots</title>`);

        // 2. Clear out existing content inside .elementor but keep ONE banner section if possible
        // Actually, it's safer to just replace everything inside .elementor for these specific pages to ensure no leaks.

        let premiumBlock = '';
        if (item.content) {
            premiumBlock = item.content;
        } else {
            premiumBlock = `
                <div style="text-align: center; max-width: 900px; margin: 0 auto; padding: 100px 20px; font-family: 'Outfit', sans-serif;">
                    <div style="display: inline-block; padding: 5px 23px; background: ${item.color}22; color: ${item.color}; border-radius: 50px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px;">
                        Preschool Program
                    </div>
                    <h2 style="color: ${item.color}; font-size: 4.5rem; margin-bottom: 40px; font-weight: 900; line-height: 1.1;">${item.title}</h2>
                    <div style="background: #fff; padding: 60px; border-radius: 50px; box-shadow: 0 40px 80px rgba(0,0,0,0.07); border: 2px solid ${item.color}22; position: relative; overflow: hidden;">
                        <div style="position: absolute; top:0; left:0; width:100%; height:10px; background:${item.color}; opacity: 0.5;"></div>
                        <p style="font-size: 1.7rem; line-height: 2; color: #333; font-weight: 400; position: relative; z-index: 1;">
                            ${item.desc}
                        </p>
                    </div>
                    <div style="margin-top: 50px; display: flex; justify-content: center; gap: 30px;">
                        <div style="background: #fff; padding: 25px 40px; border-radius: 25px; box-shadow: 0 10px 20px rgba(0,0,0,0.04); border-bottom: 5px solid ${item.color};">
                            <span style="display: block; font-size: 1rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Age Group</span>
                            <span style="font-size: 1.5rem; font-weight: 800; color: #222;">${slug === 'little-explorers' ? '1.5 - 2.5 Yrs' : slug === 'curious-cubs' ? '2.5 - 3.5 Yrs' : slug === 'rising-star-1' ? '3.5 - 4.5 Yrs' : '4.5 - 5.5 Yrs'}</span>
                        </div>
                        <div style="background: #fff; padding: 25px 40px; border-radius: 25px; box-shadow: 0 10px 20px rgba(0,0,0,0.04); border-bottom: 5px solid ${item.color};">
                            <span style="display: block; font-size: 1rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Focus</span>
                            <span style="font-size: 1.5rem; font-weight: 800; color: #222;">Holistic Development</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // AGGRESSIVE REPLACEMENT: 
        // Find the first <section inside class="elementor ..."> and replace everything after it.
        // Or just replace the entire div content.

        const elementorBaseRegex = /<div[^>]*class="elementor elementor-\d+"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/i;
        const match = html.match(elementorBaseRegex);

        if (match) {
            const elementorInner = match[1];
            // We want to keep the FIRST section (the banner/header section)
            const sections = elementorInner.split(/(?=<section)/i);
            if (sections.length > 0) {
                // Keep the first section, replace the rest
                const firstSection = sections[0].includes('<section') ? sections[0] + sections[1].substring(0, sections[1].indexOf('</section>') + 10) : sections[0];

                // Reconstruct
                const newContent = `
                    <section class="elementor-section elementor-top-section elementor-element" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); width: 100%;">
                        <div class="elementor-container elementor-column-gap-default">
                            <div class="elementor-column elementor-col-100">
                                <div class="elementor-widget-wrap">
                                    ${premiumBlock}
                                </div>
                            </div>
                        </div>
                    </section>
                 `;

                // Replace the inner content
                html = html.replace(match[0], `<div data-elementor-type="wp-page" class="elementor"><article class="post-item">${newContent}</article></div></div></article>`);
            }
        }
    }

    // Global cleanups
    html = html.replace(/\?ver=[^"]+/g, ''); // Clean version strings for better local loading
    html = html.replace(/loading="lazy"/g, 'loading="eager"');
    html = html.replace(/\belementor-invisible\b/g, '');

    fs.writeFileSync(file, html, 'utf8');
});

console.log("Deep Program Restore Complete!");
