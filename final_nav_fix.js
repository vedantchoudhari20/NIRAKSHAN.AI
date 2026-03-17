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

const navFixStyle = `
  <style id="nav-dropdown-final-fix">
    /* Force dropdown visibility and high z-index */
    .elementor-nav-menu li.menu-item-has-children:hover > ul.sub-menu,
    .elementor-nav-menu li.menu-item-has-children.focus > ul.sub-menu {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: absolute !important;
      z-index: 999999 !important;
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

    /* Fix potential rotation issues */
    .sub-menu, .menu-item, .elementor-item, .elementor-sub-item {
      transform: none !important;
      rotate: none !important;
    }

    /* Specific sub-menu styling for visibility */
    .elementor-nav-menu ul.sub-menu {
      background-color: #ffffff !important;
      box-shadow: 0px 10px 30px rgba(0,0,0,0.1) !important;
      min-width: 220px !important;
      border-radius: 8px !important;
      padding: 15px 0 !important;
      margin: 0 !important;
    }

    .elementor-nav-menu ul.sub-menu li a {
      color: #333333 !important;
      font-size: 15px !important;
      line-height: 1.5 !important;
      padding: 10px 20px !important;
      display: block !important;
    }

    .elementor-nav-menu ul.sub-menu li a:hover {
      background-color: #f8f9fa !important;
      color: #6c5ce7 !important;
    }

    /* Fix arrow orientation */
    .ast-header-navigation-arrow, .dropdown-menu-toggle {
      transform: none !important;
      display: inline-block !important;
      margin-left: 8px !important;
    }
  </style>
`;

walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('index.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Remove old fixes if they exist to avoid clutter
        content = content.replace(/<style id="nav-dropdown-visibility-fix">[\s\S]*?<\/style>/g, '');
        content = content.replace(/<style id="nav-menu-fix">[\s\S]*?<\/style>/g, '');
        
        if (content.indexOf('</head>') !== -1 && content.indexOf('id="nav-dropdown-final-fix"') === -1) {
            content = content.replace('</head>', navFixStyle + '\n</head>');
            fs.writeFileSync(filePath, content);
            console.log('Final Fix Applied: ' + filePath);
        }
    }
});
