const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Images to V3 (New Logo)
content = content.replace(/src="\.\/images\/indian_girl_logo_v3\.png"/g, 'src="./images/indian_girl_logo_v3.png"');
content = content.replace(/src="\.\/images\/indian_boy_logo_v3\.png"/g, 'src="./images/indian_boy_logo_v3.png"');
content = content.replace(/src="\.\/images\/indian_girl_clock_logo_v3\.png"/g, 'src="./images/indian_girl_clock_logo_v3.png"');

// Ensure they have the classes
['indian_girl_logo_v3.png', 'indian_boy_logo_v3.png', 'indian_girl_clock_logo_v3.png'].forEach(img => {
    const regex = new RegExp(`src="\\.\\/images\\/${img}"([^>]*)class="([^"]*)"`, 'g');
    if (!content.match(regex)) {
        // Fallback replacement if class is separate
        const simpleRegex = new RegExp(`src="\\.\\/images\\/${img}"`, 'g');
        content = content.replace(simpleRegex, `src="./images/${img}" class="blob-animated"`);
    }
});

// 2. Animate Enrichment Section Icons & Triangles
const enrichmentIDs = ['7b93e57', 'f6c8108', 'ab75c56', '36fc39c', 'dc21192', 'ec06b4e', '83e2968', 'ef57dcf', '5e5afe0', '8ae51b8'];
enrichmentIDs.forEach(id => {
    if (content.includes(`elementor-element-${id}`)) {
        const regex = new RegExp(`class="([^"]*elementor-element-${id}[^"]*)"`, 'g');
        content = content.replace(regex, (match, classes) => {
            if (!classes.includes('floating-anim')) {
                return `class="${classes} floating-anim entrance-anim"`;
            }
            return match;
        });
    }
});

// 3. Bulleproof Carousel Visibility
const finalStyles = `
<style id="nurturing-custom-animations">
  @keyframes blob-drift {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1) translateY(0); }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.03) translateY(-10px); }
  }
  
  @keyframes entrance-fade-up {
    from { opacity: 0; transform: translateY(50px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-15px) rotate(2deg); }
  }
  
  .entrance-anim {
    animation: entrance-fade-up 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }
  
  .floating-anim {
    animation: float-gentle 5s ease-in-out infinite;
  }
  
  .blob-animated {
    mask-image: url('./images/blob_mask.png');
    -webkit-mask-image: url('./images/blob_mask.png');
    mask-size: 100% 100%;
    -webkit-mask-size: 100% 100%;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    transition: all 0.5s ease;
    animation: blob-drift 10s ease-in-out infinite;
    cursor: pointer;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    display: block !important;
    width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
  }
  
  .blob-animated:hover {
    transform: scale(1.05);
    filter: brightness(1.05);
  }
  
  /* FORCE CAROUSEL VISIBILITY - MULTIPLE FIXES */
  .elementor-element-e9aaaa9, 
  .elementor-element-82d3b59, 
  [data-id="e9aaaa9"], 
  [data-id="82d3b59"] {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    height: auto !important;
    min-height: 600px !important;
    overflow: visible !important;
    z-index: 999 !important;
    background: transparent !important;
  }
  
  .n-gallery-3d {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    min-height: 550px !important;
    width: 100% !important;
  }
  
  .n-viewport {
    display: block !important;
    visibility: visible !important;
  }
  
  .n-card {
    display: block !important;
    visibility: visible !important;
  }
  
  .n-card img {
    display: block !important;
    width: 100% !important;
    height: auto !important;
  }
</style>
`;

content = content.replace(/<style id="nurturing-custom-animations">[\s\S]*?<\/style>/, finalStyles);

// Remove specific desktop hidden classes if they still exist
content = content.replace(/elementor-hidden-desktop/g, (match, offset) => {
    // Check if it's near our carousel IDs
    const chunk = content.substring(offset - 100, offset + 100);
    if (chunk.includes('e9aaaa9') || chunk.includes('82d3b59') || chunk.includes('e28f9b0')) {
        return '';
    }
    return match;
});

fs.writeFileSync(filePath, content);
console.log('Final UI Polish applied: V3 Logo, Entrance Animations, and Deep Visibility Fix.');
