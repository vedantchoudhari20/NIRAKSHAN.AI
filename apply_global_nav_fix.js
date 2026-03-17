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

const globalNavStyles = `
  <style id="global-nav-flyout-fix">
    /* Deep fix for dropdown hierarchy and fly-out menus */
    
    /* Ensure all containers allow dropdowns to overflow */
    .elementor-location-header, 
    .elementor-section, 
    .elementor-container, 
    .elementor-column, 
    .elementor-widget-wrap,
    .elementor-widget-nav-menu {
      overflow: visible !important;
    }

    /* Base sub-menu transition and styling */
    .elementor-nav-menu ul.sub-menu {
      background-color: #ffffff !important;
      box-shadow: 0px 15px 50px rgba(0,0,0,0.18) !important;
      min-width: 250px !important;
      border-radius: 12px !important;
      padding: 10px 0 !important;
      border: 1px solid rgba(0,0,0,0.06) !important;
      transition: all 0.3s ease !important;
      display: none; /* Elementor handles block/none usually, but we ensure it */
      position: absolute !important;
      z-index: 99999 !important;
    }

    .elementor-nav-menu li:hover > ul.sub-menu {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
    }

    /* Level 1 positioning (Top Nav -> Dropdown) */
    .elementor-nav-menu > li > ul.sub-menu {
      top: 100% !important;
      left: 0 !important;
      margin-top: 0 !important;
    }

    /* Level 2+ positioning (Dropdown -> Fly-out Right) */
    .elementor-nav-menu ul.sub-menu li {
      position: relative !important;
    }

    .elementor-nav-menu ul.sub-menu ul.sub-menu {
      top: 0 !important;
      left: 100% !important; /* Fly out to the right */
      margin-left: 2px !important;
      margin-top: -10px !important; /* Align with top of parent li */
    }

    /* Handle boundary - if menu is too far right, fly left (optional but good) */
    /* For now, just focus on keeping it right as requested */

    /* Premium item styling */
    .elementor-nav-menu ul.sub-menu li a {
      padding: 14px 24px !important;
      font-size: 15px !important;
      font-weight: 500 !important;
      color: #444444 !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      transition: background 0.2s ease, color 0.2s ease !important;
    }

    .elementor-nav-menu ul.sub-menu li:hover > a {
      background-color: #f7faff !important;
      color: #0170b9 !important;
    }

    /* Chevron indicators for fly-outs */
    .elementor-nav-menu ul.sub-menu .menu-item-has-children > a::after {
      content: "\\f105"; /* FontAwesome Right Angle */
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      font-size: 12px;
      margin-left: 10px;
      opacity: 0.5;
    }

    /* Hide the default caret in fly-outs as it usually points down */
    .elementor-nav-menu ul.sub-menu .ast-header-navigation-arrow,
    .elementor-nav-menu ul.sub-menu .dropdown-menu-toggle {
      display: none !important;
    }

    /* Fix for Daycare visibility - ensure siblings aren't covered */
    .elementor-nav-menu ul.sub-menu li {
      z-index: 1;
    }
    .elementor-nav-menu ul.sub-menu li:hover {
      z-index: 10;
    }
  </style>
`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove old fixes if any
    content = content.replace(/<style id="global-nav-flyout-fix">[\s\S]*?<\/style>/g, '');

    // Insert new styles before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', globalNavStyles + '\n</head>');
        fs.writeFileSync(file, content);
    }
});

console.log(`Successfully updated ${htmlFiles.length} files with consistent fly-out navigation.`);
