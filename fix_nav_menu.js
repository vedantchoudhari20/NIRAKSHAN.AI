const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// The user is reporting that "About Us" and "Programs" dropdowns are not seen.
// We will add a CSS fix in the head to force them visible on hover and fix any potential rotation issues.

const navFixStyle = `
  <style id="nav-menu-fix">
    /* Force dropdown visibility on hover */
    .elementor-nav-menu li:hover > ul.sub-menu,
    .elementor-nav-menu li.focus > ul.sub-menu {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      transform: none !important; /* Fix potential "roted" (rotated) issue */
    }

    /* Ensure sub-menus are positioned correctly and not hidden by overflow */
    .elementor-nav-menu--dropdown {
       z-index: 9999 !important;
    }

    .elementor-section.elementor-top-section {
      overflow: visible !important; /* Allow dropdowns to spill out */
    }

    /* Fix potential rotation if "roted" meant rotated */
    .elementor-item, .elementor-sub-item {
      transform: none !important;
    }
    
    /* Ensure the chevron/arrow is not causing issues */
    .ast-header-navigation-arrow {
      display: inline-block !important;
      margin-left: 5px !important;
    }
  </style>
`;

// Insert the style before </head>
if (content.indexOf('</head>') !== -1) {
    content = content.replace('</head>', navFixStyle + '\n</head>');
    fs.writeFileSync(filePath, content);
    console.log('SUCCESS: Added Navigation Menu visibility fix to index.html');
} else {
    console.error('FAILED: Could not find </head> in index.html');
}
