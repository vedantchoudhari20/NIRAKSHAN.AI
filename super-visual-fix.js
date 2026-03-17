const fs = require('fs');
const path = require('path');

const deployDir = path.join(__dirname, 'deploy');

// 1. Update custom-widgets.css
const cssPath = path.join(deployDir, 'wp-content', 'custom-widgets.css');
let css = fs.readFileSync(cssPath, 'utf8');

const additionalStyles = `
/* Chatbot Intro Bubble */
#chatbot-intro {
    position: absolute;
    bottom: 75px;
    right: 0;
    background: white;
    padding: 12px 20px;
    border-radius: 20px 20px 5px 20px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    width: 200px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    display: none;
    animation: bounceIn 0.5s ease-out;
    border: 2px solid #8b4e9d;
    z-index: 10000;
}

#chatbot-intro:after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 20px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
}

@keyframes bounceIn {
    0% { transform: scale(0.5); opacity: 0; }
    70% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
}

/* Minimalist Divider Fix */
.elementor-divider-separator {
    display: block !important;
    border-top: 2px solid #8b4e9d !important; /* Use brand purple */
    height: 1px !important;
    background: none !important;
    opacity: 0.3 !important;
    width: 100px !important;
    margin: 10px auto !important;
}

/* Fix for curvy dividers that become blocks */
.elementor-widget-divider--separator-type-pattern .elementor-divider-separator {
    background: none !important;
    mask: none !important;
    -webkit-mask: none !important;
    border-top: 2px dashed #8b4e9d !important;
    width: 100% !important;
    opacity: 0.4;
}

/* Ensure images are visible even if masks fail */
.elementor-widget-image img {
    -webkit-mask-image: none !important; /* Temporarily disable mask to ensure image shows up */
    mask-image: none !important;
    opacity: 1 !important;
    visibility: visible !important;
}

/* Force show columns */
.elementor-column, .elementor-widget {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
}
`;

if (!css.includes('#chatbot-intro')) {
    css += additionalStyles;
    fs.writeFileSync(cssPath, css, 'utf8');
}

// 2. Update custom-widgets.js
const jsPath = path.join(deployDir, 'wp-content', 'custom-widgets.js');
let js = fs.readFileSync(jsPath, 'utf8');

const introHtmlInjection = `
    // Add Intro Bubble to DOM
    const widget = document.getElementById('chatbot-widget');
    if (widget && !document.getElementById('chatbot-intro')) {
        const intro = document.createElement('div');
        intro.id = 'chatbot-intro';
        intro.innerHTML = 'Hi! I am AI.Parenting. Need help with admissions? <span style="color:#8b4e9d; cursor:pointer" onclick="toggleChat()">Chat now</span>';
        widget.appendChild(intro);
        
        // Show after 3 seconds
        setTimeout(() => {
            if (!document.getElementById('chatbot-window').classList.contains('open')) {
                intro.style.display = 'block';
            }
        }, 3000);
    }
`;

if (!js.includes('chatbot-intro')) {
    // Inject at the end of DOMContentLoaded or just at the end of file
    js += `\ndocument.addEventListener('DOMContentLoaded', () => { ${introHtmlInjection} });`;
    // Also hide intro when chat opens
    js = js.replace('document.getElementById(\'chatbot-window\').classList.toggle(\'open\');',
        'document.getElementById(\'chatbot-window\').classList.toggle(\'open\');\n    const intro = document.getElementById(\'chatbot-intro\'); if(intro) intro.style.display = \'none\';');
    fs.writeFileSync(jsPath, js, 'utf8');
}

// 3. Update HTML files for the divider and chatbot
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

const htmlFiles = getAllFiles(deployDir);
htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Remove the data-settings that might be hiding elements (motion effects)
    if (content.includes('data-settings')) {
        // We keep the attribute but "force" override in CSS is better. 
        // But some JS might still hide them.
    }

    // Fix Dividers in HTML (Remove the inline SVGs which are broken)
    const dividerInlineStylePattern = /<div class="elementor-divider" style="[^"]*--divider-pattern-url:[^"]*">/g;
    if (dividerInlineStylePattern.test(content)) {
        content = content.replace(dividerInlineStylePattern, '<div class="elementor-divider">');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log('Super Visual Fix applied.');
