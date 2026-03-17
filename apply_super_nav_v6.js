const fs = require('fs');
const path = require('path');

const deployDir = path.join('c:', 'Users', 'Vedant', 'Downloads', 'thenurturingroots.com', 'deploy');

function getAllHtmlFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllHtmlFiles(fullPath, files);
        } else if (item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    return files;
}

const htmlFiles = getAllHtmlFiles(deployDir);

const globalNavStylesFull = `
  <style id="global-nav-final-v6">
    /* Aggressive Hierarchy & Fly-out Fix */
    
    /* 1. Header & Layering */
    .elementor-location-header {
      position: relative !important;
      z-index: 10000 !important;
      background: #ffffff;
    }

    /* 2. Containment Bypass - Mandatory for fly-outs */
    .elementor-location-header section,
    .elementor-location-header .elementor-container,
    .elementor-location-header .elementor-column,
    .elementor-location-header .elementor-widget-wrap,
    .elementor-location-header .elementor-widget,
    .elementor-location-header .elementor-widget-nav-menu,
    nav.elementor-nav-menu--main {
      overflow: visible !important;
      contain: none !important; /* Modern browsers containment fix */
    }

    /* 3. Dropdown Styling (Level 1) */
    .elementor-nav-menu ul.sub-menu {
      background-color: #ffffff !important;
      box-shadow: 0px 8px 30px rgba(0,0,0,0.12) !important;
      min-width: 260px !important;
      border-radius: 14px !important;
      padding: 10px 0 !important;
      border: 1px solid rgba(0,0,0,0.05) !important;
      position: absolute !important;
      display: none;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, transform 0.2s ease !important;
      transform: translateY(10px);
      z-index: 99999 !important;
    }

    .elementor-nav-menu li:hover > ul.sub-menu {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0);
    }

    /* 4. Fly-out Styling (Level 2+) */
    .elementor-nav-menu ul.sub-menu li {
      position: relative !important;
    }

    /* Target the sub-menu that is a child of another sub-menu */
    .elementor-nav-menu ul.sub-menu ul.sub-menu {
      top: 0 !important;
      left: 100% !important; /* Move Right */
      margin-left: 2px !important;
      margin-top: -12px !important;
      box-shadow: 10px 10px 40px rgba(0,0,0,0.15) !important;
    }

    /* 5. Item Interaction */
    .elementor-nav-menu ul.sub-menu li a {
      padding: 12px 24px !important;
      font-size: 15.5px !important;
      font-weight: 500 !important;
      color: #333333 !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      transition: all 0.2s ease !important;
      border-radius: 0 !important;
    }

    .elementor-nav-menu ul.sub-menu li:hover > a {
      background-color: #f0f7ff !important;
      color: #0170b9 !important;
      padding-left: 28px !important;
    }

    /* 6. Hierarchy Indicators */
    /* Add a right arrow for items with children in sub-menus */
    .elementor-nav-menu ul.sub-menu .menu-item-has-children > a::after {
      content: "\\f105"; /* Angle Right */
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      font-size: 11px;
      margin-left: auto;
      opacity: 0.6;
    }

    /* Hide the default caret down icon inside sub-menus */
    .elementor-nav-menu ul.sub-menu .ast-header-navigation-arrow,
    .elementor-nav-menu ul.sub-menu .dropdown-menu-toggle {
      display: none !important;
    }

    /* 7. Ensure consistency of Daycare item */
    /* If the sub-menu flies right, Daycare will be perfectly visible beneath "Preschool Program" */
  </style>
`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Cleanup old fixes
    content = content.replace(/<style id="global-nav-flyout-fix">[\s\S]*?<\/style>/g, '');
    content = content.replace(/<style id="global-nav-final-v6">[\s\S]*?<\/style>/g, '');

    // Also cleanup the one from previous turn if it was different
    content = content.replace(/<style id="global-nav-fix">[\s\S]*?<\/style>/g, '');

    // Insert new styles before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', globalNavStylesFull + '\n</head>');
        fs.writeFileSync(file, content);
    }
});

console.log(`Successfully applied Super-Hierarchy Fix to ${htmlFiles.length} files.`);
