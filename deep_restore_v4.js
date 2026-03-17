const fs = require('fs');
const path = require('path');

const deployDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy';

const specificContent = {
    'little-explorers': {
        title: "Little Explorers (Playgroup)",
        color: "#00b894",
        desc: "At Nurturing Roots, our Little Explorers curriculum ensures kids have the right exposure towards life skills, developing a habit of sharing and caring, and getting comfortable in a social preschool environment. We focus on sensory play, early socialization, and motor skill development in a safe, colorful setting."
    },
    'curious-cubs': {
        title: "Curious Cubs (Nursery)",
        color: "#6c5ce7",
        desc: "The Curious Cubs (Nursery) program is designed to nurture a child's natural curiosity and encourage independent thinking. Through structured play and sensory-rich activities, we build a strong foundation for future learning. Children begin to explore language, basic numbers, and creative arts."
    },
    'rising-star-1': {
        title: "Rising Star 1 (LKG)",
        color: "#0984e3",
        desc: "Our Rising Star 1 (LKG) curriculum focuses on literacy, numeracy, and social-emotional growth. We introduce foundational concepts in a fun, engaging way that prepares children for school success. We emphasize phonics, early writing, and collaborative group activities."
    },
    'rising-star-2': {
        title: "Rising Star 2 (UKG)",
        color: "#fdcb6e",
        desc: "The Rising Star 2 (UKG) program prepares children for the transition to primary school. We emphasize advanced literacy, logical reasoning, and complex problem-solving skills in a nurturing environment. Our graduates are confident, independent, and ready for formal schooling."
    },
    'our-mission': {
        title: "Our Vision & Mission",
        color: "#ff7675",
        content: `
            <div style="text-align: center; max-width: 950px; margin: 0 auto; padding: 60px 20px; font-family: 'Outfit', sans-serif;">
                <div style="display: inline-block; padding: 5px 23px; background: #ff767522; color: #ff7675; border-radius: 50px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px;">
                    Purpose & Values
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
                    <h4 style="color: #6c5ce7; font-size: 1.8rem; margin-top: 0;">Our Core Approach</h4>
                    <ul style="font-size: 1.2rem; color: #555; line-height: 2;">
                        <li><strong>Child-Centric Learning:</strong> Putting the needs and interests of the child first in every decision.</li>
                        <li><strong>Holistic Growth:</strong> Focusing on cognitive, social, emotional, and physical health.</li>
                        <li><strong>Safe Haven:</strong> Providing a secure and nurturing "second home" for every student.</li>
                        <li><strong>Excellence:</strong> Maintaining the highest standards of preschool pedagogy and care.</li>
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
    const slug = path.basename(path.dirname(file));
    if (!specificContent[slug]) return;

    let html = fs.readFileSync(file, 'utf8');
    const item = specificContent[slug];
    console.log(`Deep Cleaning: ${slug}`);

    // Update Title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${item.title} | The Nurturing Roots</title>`);

    let premiumBlock = '';
    if (item.content) {
        premiumBlock = item.content;
    } else {
        premiumBlock = `
            <div style="text-align: center; max-width: 900px; margin: 0 auto; padding: 100px 20px; font-family: 'Outfit', sans-serif;">
                <div style="display: inline-block; padding: 5px 23px; background: ${item.color}22; color: ${item.color}; border-radius: 50px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px;">
                    Premium Program
                </div>
                <h2 style="color: ${item.color}; font-size: 4.5rem; margin-bottom: 40px; font-weight: 900; line-height: 1.1;">${item.title}</h2>
                <div style="background: #fff; padding: 60px; border-radius: 50px; box-shadow: 0 40px 80px rgba(0,0,0,0.07); border: 2px solid ${item.color}22; position: relative; overflow: hidden;">
                    <div style="position: absolute; top:0; left:0; width:100%; height:10px; background:${item.color}; opacity: 0.5;"></div>
                    <p style="font-size: 1.7rem; line-height: 2; color: #333; font-weight: 400; position: relative; z-index: 1;">
                        ${item.desc}
                    </p>
                </div>
                <!-- Interactive Icons -->
                <div style="margin-top: 50px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="background: #fff; padding: 30px; border-radius: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border-top: 5px solid ${item.color};">
                        <div style="font-size: 2rem; margin-bottom: 10px;">👶</div>
                        <h4 style="margin: 0; color: #333; font-size: 1.3rem;">Small Batch Size</h4>
                    </div>
                    <div style="background: #fff; padding: 30px; border-radius: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border-top: 5px solid ${item.color};">
                        <div style="font-size: 2rem; margin-bottom: 10px;">🧪</div>
                        <h4 style="margin: 0; color: #333; font-size: 1.3rem;">Hands-on Learning</h4>
                    </div>
                    <div style="background: #fff; padding: 30px; border-radius: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border-top: 5px solid ${item.color};">
                        <div style="font-size: 2rem; margin-bottom: 10px;">🎨</div>
                        <h4 style="margin: 0; color: #333; font-size: 1.3rem;">Creative Arts</h4>
                    </div>
                </div>
            </div>
        `;
    }

    // Replace the entire entry-content div content
    // We target the class "entry-content clear"
    const contentRegex = /<div class="entry-content clear" itemprop="text">([\s\S]*?)<\/div>\s*<!-- .entry-content -->/i;
    const contentRegexFallback = /<div class="entry-content clear" itemprop="text">([\s\S]*?)<\/div>(?=\s*<\/article>)/i;

    let targetRegex = contentRegex;
    if (!targetRegex.test(html)) targetRegex = contentRegexFallback;

    if (targetRegex.test(html)) {
        console.log(`Found content block for ${slug}`);
        html = html.replace(targetRegex, `<div class="entry-content clear" itemprop="text">
            <div class="elementor">
                <section class="elementor-section elementor-top-section" style="background: #ffffff; width: 100%;">
                    <div class="elementor-container elementor-column-gap-default">
                        <div class="elementor-column elementor-col-100">
                            ${premiumBlock}
                        </div>
                    </div>
                </section>
            </div>
        </div><!-- .entry-content -->`);
    } else {
        console.log(`WARNING: Could not find content block for ${slug}`);
    }

    fs.writeFileSync(file, html, 'utf8');
});

console.log("Deep Program Restore Complete!");
