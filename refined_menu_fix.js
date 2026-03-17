const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDir = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy';
const newImagePath = './images/indian_girl_logo_refined.png';
const sourceImagePath = 'C:/Users/Vedant/.gemini/antigravity/brain/ca4fba3a-993a-4f44-934d-201b62082f32/nurturing_roots_happy_girl_v4_1772302690321.png';

// Copy the new image
try {
    fs.copyFileSync(sourceImagePath, path.join(targetDir, 'images/indian_girl_logo_refined.png'));
    console.log('New image copied to deploy/images/indian_girl_logo_refined.png');
} catch (e) {
    console.error('Error copying image:', e);
}

const refinedNavStyle = `
  <style id="nav-dropdown-refined-fix">
    /* Force dropdown visibility and high z-index */
    .elementor-nav-menu li.menu-item-has-children:hover > ul.sub-menu,
    .elementor-nav-menu li.menu-item-has-children.focus > ul.sub-menu {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: absolute !important;
      z-index: 999999 !important;
    }

    /* BRIDGE THE GAP: This invisible pseudo-element ensures the mouse remains "hovering" 
       even when crossing the small gap between the main item and the dropdown. */
    .elementor-nav-menu li.menu-item-has-children > ul.sub-menu::before {
      content: '' !important;
      position: absolute !important;
      top: -40px !important; /* Tall bridge to cover any gap */
      left: 0 !important;
      right: 0 !important;
      height: 45px !important;
      display: block !important;
      background: transparent !important;
      z-index: -1 !important;
      pointer-events: auto !important;
    }

    /* Ensure parent doesn't clip children */
    .elementor-location-header, 
    .elementor-section.elementor-top-section, 
    .elementor-container, 
    .elementor-column, 
    .elementor-widget-wrap,
    .elementor-widget-nav-menu,
    .elementor-widget-container,
    nav.elementor-nav-menu--main {
      overflow: visible !important;
    }

    /* Elevate the header */
    .elementor-location-header {
      position: relative !important;
      z-index: 1000 !important;
    }

    /* Fix potential rotation or transform issues that break positioning */
    .sub-menu, .menu-item, .elementor-item, .elementor-sub-item {
      transform: none !important;
      rotate: none !important;
    }

    /* Specific sub-menu styling for premium look and visibility */
    .elementor-nav-menu ul.sub-menu {
      background-color: #ffffff !important;
      box-shadow: 0px 10px 40px rgba(0,0,0,0.15) !important;
      min-width: 240px !important;
      border-radius: 12px !important;
      padding: 12px 0 !important;
      margin: 0 !important;
      border: 1px solid rgba(0,0,0,0.05) !important;
      top: 100% !important; /* Ensure it starts right at the bottom of the parent */
    }

    .elementor-nav-menu ul.sub-menu li {
      margin: 0 !important;
    }

    .elementor-nav-menu ul.sub-menu li a {
      color: #333333 !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      line-height: 1.6 !important;
      padding: 12px 24px !important;
      display: block !important;
      transition: all 0.2s ease !important;
      border-radius: 0 !important;
    }

    .elementor-nav-menu ul.sub-menu li a:hover {
      background-color: #f0f7ff !important;
      color: #0170b9 !important; /* Primary Brand Color */
      padding-left: 28px !important;
    }

    /* Fix arrow orientation and spacing */
    .ast-header-navigation-arrow, .dropdown-menu-toggle {
      transform: none !important;
      display: inline-block !important;
      margin-left: 10px !important;
      font-size: 10px !important;
      opacity: 0.7 !important;
    }
  </style>
`;

// Extract the menu block from index.html to ensure it's used everywhere
let masterMenuHtml = '';
try {
    const indexContent = fs.readFileSync(path.join(targetDir, 'index.html'), 'utf8');
    const menuStart = indexContent.indexOf('<ul id="menu-1-903010b"');
    const menuEnd = indexContent.indexOf('</ul>', menuStart) + 5;
    if (menuStart !== -1 && menuEnd !== -1) {
        masterMenuHtml = indexContent.substring(menuStart, menuEnd);
    }
} catch (e) {
    console.error('Error reading master menu:', e);
}

walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('index.html')) {
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Remove ANY previous nav fixes to start clean
        content = content.replace(/<style id="nav-dropdown-visibility-fix">[\s\S]*?<\/style>/g, '');
        content = content.replace(/<style id="nav-menu-fix">[\s\S]*?<\/style>/g, '');
        content = content.replace(/<style id="nav-dropdown-final-fix">[\s\S]*?<\/style>/g, '');
        content = content.replace(/<style id="nav-dropdown-refined-fix">[\s\S]*?<\/style>/g, '');

        // 2. Inject Refined Nav Style
        if (content.indexOf('</head>') !== -1) {
            content = content.replace('</head>', refinedNavStyle + '\n</head>');
        }

        // 3. Update the First Girl Image (specifically on index.html, but harmless on others)
        // Search for the specific img tag with indian_girl_logo_v4.png
        content = content.replace(/src="\.\/images\/indian_girl_logo_v4\.png"/g, `src="${newImagePath}"`);

        // 4. Ensure Menu Consistency (if master menu was found)
        if (masterMenuHtml) {
            const menuStart = content.indexOf('<ul id="menu-1-903010b"');
            const menuEnd = content.indexOf('</ul>', menuStart) + 5;
            if (menuStart !== -1 && menuEnd !== -1) {
                // Keep the existing container but replace the inner UL
                content = content.substring(0, menuStart) + masterMenuHtml + content.substring(menuEnd);
            }

            // Also update the mobile menu if it exists
            const mobileMenuStart = content.indexOf('<ul id="menu-2-903010b"');
            const mobileMenuEnd = content.indexOf('</ul>', mobileMenuStart) + 5;
            if (mobileMenuStart !== -1 && mobileMenuEnd !== -1) {
                // Mobile menu usually has different IDs, so we just replace the content 
                // but keep the ID if possible, or just swap carefully.
                // For simplicity, we assume they are identical in structure.
                let updatedMobileMenu = masterMenuHtml.replace('menu-1-903010b', 'menu-2-903010b');
                content = content.substring(0, mobileMenuStart) + updatedMobileMenu + content.substring(mobileMenuEnd);
            }
        }

        fs.writeFileSync(filePath, content);
        console.log('Refined Fix Applied: ' + filePath);
    }
});
