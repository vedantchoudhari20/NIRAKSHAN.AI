const fs = require('fs');
const path = require('path');

const pages = [
    {
        slug: "about-us",
        title: "About Us",
        content: `
            <div style="text-align: center; max-width: 800px; margin: 0 auto; padding: 60px 20px; font-family: sans-serif;">
                <h2 style="color: #6c5ce7; margin-bottom: 25px; font-size: 2.5rem;">Welcome to The Nurturing Roots</h2>
                <p style="font-size: 1.2rem; line-height: 1.8; color: #555;">
                    The Nurturing Roots Preschool and Daycare specializes in giving children the best possible start in life. 
                    Our dedicated team of educators provides a safe, nurturing, and stimulating environment where young minds can grow and flourish.
                </p>
                <div style="margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left;">
                     <div style="background: #fdf2ff; padding: 20px; border-radius: 15px; border: 1px dashed #6c5ce7;">
                        <h4 style="color: #6c5ce7;">Our Philosophy</h4>
                        <p>We combine love and logic to nurture the holistic development of every child.</p>
                     </div>
                     <div style="background: #f2fbff; padding: 20px; border-radius: 15px; border: 1px dashed #74b9ff;">
                        <h4 style="color: #74b9ff;">Our Team</h4>
                        <p>Experienced mentors dedicated to early childhood excellence.</p>
                     </div>
                </div>
            </div>
        `
    },
    {
        slug: "our-mission",
        title: "Vision & Mission",
        content: `
            <div style="text-align: center; max-width: 800px; margin: 0 auto; padding: 60px 20px; font-family: sans-serif;">
                <h2 style="color: #ff7675; margin-bottom: 30px; font-size: 2.5rem;">Our Core Values</h2>
                <div style="margin-bottom: 50px; background: #fff5f5; padding: 30px; border-radius: 20px; border: 2px solid #ff7675;">
                    <h3 style="color: #ff7675; margin-top: 0;">Our Vision</h3>
                    <p style="font-size: 1.2rem; line-height: 1.8; color: #444;">
                        To be a leading early childhood education provider that nurtures confident, compassionate, and creative individuals who are ready to face the world.
                    </p>
                </div>
                <div style="background: #f0fff4; padding: 30px; border-radius: 20px; border: 2px solid #55efc4;">
                    <h3 style="color: #00b894; margin-top: 0;">Our Mission</h3>
                    <p style="font-size: 1.2rem; line-height: 1.8; color: #444;">
                        Our mission is to provide high-quality early childhood education that fosters a love for learning and prepares children for success in school and life. 
                        We aim to nurture children's physical, social, emotional, and cognitive development through play-based and structured activities.
                    </p>
                </div>
            </div>
        `
    },
    {
        slug: "faqs",
        title: "Frequently Asked Questions",
        content: `
            <div style="max-width: 800px; margin: 0 auto; padding: 60px 20px; font-family: sans-serif;">
                <h2 style="color: #6c5ce7; text-align: center; margin-bottom: 40px; font-size: 2.5rem;">Got Questions? We Have Answers!</h2>
                <div style="margin-bottom: 25px; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #6c5ce7;">
                    <h4 style="color: #6c5ce7; margin-top: 0;">Q: What are the school hours?</h4>
                    <p style="color: #555; margin-bottom: 0;">A: Our preschool operates from 9:00 AM to 12:30 PM, Monday to Friday. Daycare options are also available.</p>
                </div>
                <div style="margin-bottom: 25px; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #fab1a0;">
                    <h4 style="color: #e17055; margin-top: 0;">Q: What is the age criteria for admission?</h4>
                    <p style="color: #555; margin-bottom: 0;">A: We admit children from 1.5 years (Playgroup) to 5.5 years (UKG).</p>
                </div>
                <div style="margin-bottom: 25px; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #55efc4;">
                    <h4 style="color: #00b894; margin-top: 0;">Q: Do you offer transportation?</h4>
                    <p style="color: #555; margin-bottom: 0;">A: Yes, we provide a safe and reliable van service for pick-up and drop-off in surrounding areas.</p>
                </div>
                <div style="margin-bottom: 25px; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #74b9ff;">
                    <h4 style="color: #0984e3; margin-top: 0;">Q: What is the teacher-student ratio?</h4>
                    <p style="color: #555; margin-bottom: 0;">A: We maintain a healthy ratio of 1:10 to ensure personalized attention for every child.</p>
                </div>
            </div>
        `
    },
    {
        slug: "little-explorers",
        title: "Little Explorers",
        content: `
            <div style="text-align: center; max-width: 800px; margin: 0 auto; padding: 60px 20px; font-family: sans-serif;">
                <h2 style="color: #00b894; margin-bottom: 25px; font-size: 2.5rem;">Little Explorers (Playgroup)</h2>
                <div style="background: #f0fff4; padding: 30px; border-radius: 20px; margin-bottom: 30px;">
                    <p style="font-size: 1.2rem; line-height: 1.8; color: #444;">
                        At Nurturing Roots, our <b>Little Explorers</b> curriculum ensures kids have the right exposure towards life skills, 
                        developing a habit of sharing and caring, and getting comfortable in a social preschool environment.
                    </p>
                </div>
                <p style="font-size: 1.1rem; color: #666;">Age Group: 1.5 to 2.5 Years</p>
            </div>
        `
    },
    {
        slug: "rising-star-1",
        title: "Rising Star 1",
        content: `
            <div style="text-align: center; max-width: 800px; margin: 0 auto; padding: 60px 20px; font-family: sans-serif;">
                <h2 style="color: #0984e3; margin-bottom: 25px; font-size: 2.5rem;">Rising Star 1 (LKG)</h2>
                <div style="background: #f2fbff; padding: 30px; border-radius: 20px; margin-bottom: 30px;">
                    <p style="font-size: 1.2rem; line-height: 1.8; color: #444;">
                        Our <b>Rising Star 1</b> curriculum enhances understanding of concepts and observation skills. 
                        This program focuses on developing foundational literacy and numeracy skills through interactive play and discovery.
                    </p>
                </div>
                <p style="font-size: 1.1rem; color: #666;">Age Group: 3.5 to 4.5 Years</p>
            </div>
        `
    },
    {
        slug: "rising-star-2",
        title: "Rising Star 2",
        content: `
            <div style="text-align: center; max-width: 800px; margin: 0 auto; padding: 60px 20px; font-family: sans-serif;">
                <h2 style="color: #fdcb6e; margin-bottom: 25px; font-size: 2.5rem;">Rising Star 2 (UKG)</h2>
                <div style="background: #fff9eb; padding: 30px; border-radius: 20px; margin-bottom: 30px;">
                    <p style="font-size: 1.2rem; line-height: 1.8; color: #444;">
                        The <b>Rising Star 2</b> program is designed to bridge the gap between preschool and formal academic schooling. 
                        We focus on complex concepts, problem-solving, and independent learning to ensure a confident transition to primary school.
                    </p>
                </div>
                <p style="font-size: 1.1rem; color: #666;">Age Group: 4.5 to 5.5 Years</p>
            </div>
        `
    }
];

const templatePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/gallery/index.html';
const baseDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy';

if (!fs.existsSync(templatePath)) {
    console.error("Template not found:", templatePath);
    process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf8');

// We need to cut out the gallery widget and everything related to it.
// The gallery widget is between line 4146 and 4671 (roughly)
// We will replace the entire section containing the gallery.

pages.forEach((page) => {
    const dir = path.join(baseDir, page.slug);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let html = template;

    // 1. Update Title tag
    html = html.replace(/<title>Gallery/g, `<title>${page.title}`);

    // 2. Clear out the specific Gallery heading
    html = html.replace(/<h1[^>]*>[\s\S]*?Gallery[\s\S]*?<\/h1>/i,
        `<h1 class="elementor-heading-title elementor-size-default">${page.title}</h1>`);

    // 3. Robust Replacement of the Gallery section
    // We'll extract everything before the gallery section and after it.
    const startMarker = '<section class="elementor-section elementor-top-section elementor-element elementor-element-13f58ee';
    const endMarker = '</section>'; // We need the end of that specific section.

    // Since Elementor is nested, we'll search for the widget specifically and its immediate parents
    const widgetId = 'data-id="b8b6a2a"';
    if (html.includes(widgetId)) {
        const parts = html.split(widgetId);
        // Find the LAST opening <section before the widget
        const beforeWidget = parts[0];
        const lastSectionStart = beforeWidget.lastIndexOf('<section');
        const prefix = beforeWidget.substring(0, lastSectionStart);

        // Find the FIRST closing </section> after the widget
        const afterWidget = parts[1];
        const nextSectionEnd = afterWidget.indexOf('</section>');
        const suffix = afterWidget.substring(nextSectionEnd + 10);

        // Inject our content inside a clean section structure
        const middle = `
            <section class="elementor-section elementor-top-section elementor-element custom-content-section" style="background:#fff; padding: 50px 0;">
                <div class="elementor-container elementor-column-gap-default">
                    <div class="elementor-column elementor-col-100">
                        <div class="elementor-widget-wrap">
                            ${page.content}
                        </div>
                    </div>
                </div>
            </section>
        `;

        html = prefix + middle + suffix;
    }

    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`Successfully fixed page: ${page.slug}`);
});

console.log("All pages updated with respective content.");
