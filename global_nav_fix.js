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
  <style id="nav-dropdown-visibility-fix">
    /* Force dropdown visibility on hover */
    .elementor-nav-menu li.menu-item-has-children:hover > ul.sub-menu,
    .elementor-nav-menu li.menu-item-has-children.focus > ul.sub-menu {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      transform: none !important;
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      min-width: 200px !important;
      background: white !important;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
      padding: 10px 0 !important;
    }

    /* Ensure sub-menu links are visible */
    .elementor-nav-menu ul.sub-menu li a {
      display: block !important;
      padding: 10px 20px !important;
      color: #333 !important;
      text-decoration: none !important;
    }

    .elementor-nav-menu ul.sub-menu li a:hover {
      background: #f5f5f5 !important;
      color: #6c5ce7 !important;
    }

    /* Fix for section overflow that might hide dropdowns */
    .elementor-location-header, .elementor-section.elementor-top-section {
      overflow: visible !important;
    }

    /* Fix potential rotation issues ("roted") */
    .elementor-item, .elementor-sub-item, .sub-menu {
      transform: none !important;
    }

    /* Ensure the mobile toggle doesn't interfere if not needed */
    @media (min-width: 1025px) {
       .elementor-menu-toggle { display: none !important; }
       .elementor-nav-menu--main { display: block !important; }
    }
  </style>
`;

walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('index.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.indexOf('</head>') !== -1 && content.indexOf('id="nav-dropdown-visibility-fix"') === -1) {
            content = content.replace('</head>', navFixStyle + '\n</head>');
            
            // Also fix the href="#" for top-level items with children to ensure hover works correctly
            // This prevents the page from navigating when clicking the parent on touch devices
            // but we'll do it carefully.
            
            fs.writeFileSync(filePath, content);
            console.log('Fixed: ' + filePath);
        }
    }
});
