const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Learning Module Images (v3 with logo) and fix double classes
content = content.replace(/src="\.\/images\/indian_preschool_girl_raising_hands_v2\.png" class="blob-animated"/g, 'src="./images/indian_girl_logo_v3.png" class="blob-animated entrance-anim"');
content = content.replace(/src="\.\/images\/indian_boy_blocks_v2\.png" class="blob-animated"/g, 'src="./images/indian_boy_logo_v3.png" class="blob-animated entrance-anim"');
content = content.replace(/src="\.\/images\/indian_girl_student_clock_v2\.png" class="blob-animated"/g, 'src="./images/indian_girl_clock_logo_v3.png" class="blob-animated entrance-anim"');
// Clean up any double class artifacts if they exist
content = content.replace(/class="blob-animated" class="/g, 'class="blob-animated ');

// 2. Unhide ALL potential carousel sections
content = content.replace(/elementor-element-82d3b59 elementor-hidden-desktop/g, 'elementor-element-82d3b59');
content = content.replace(/elementor-element-e28f9b0 elementor-hidden-desktop/g, 'elementor-element-e28f9b0');

// 3. Add Animation Classes to Enrichment Icons
const enrichmentIDs = ['7b93e57', 'f6c8108', 'ab75c56', '36fc39c', 'dc21192', 'ec06b4e', '83e2968', 'ef57dcf', '5e5afe0', '8ae51b8'];
enrichmentIDs.forEach(id => {
    const regex = new RegExp(`class="elementor-element elementor-element-${id}`, 'g');
    content = content.replace(regex, `class="elementor-element elementor-element-${id} floating-anim`);
});

// 4. Update CSS for entrance and floating animations
const newStyles = `
<style id="nurturing-custom-animations">
  @keyframes blob-drift {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1) translateY(0); }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.02) translateY(-8px); }
  }
  
  @keyframes entrance-fade {
    from { opacity: 0; transform: translateY(30px) scale(0.9); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .entrance-anim {
    animation: entrance-fade 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  
  .floating-anim {
    animation: float 4s ease-in-out infinite;
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
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    animation: blob-drift 10s ease-in-out infinite, entrance-fade 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    cursor: pointer;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    background: #fff;
    display: block !important;
    width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
  }
  
  .blob-animated:hover {
    transform: scale(1.08) rotate(1deg);
    filter: brightness(1.05) contrast(1.05);
  }
  
  /* Force Carousel Visibility */
  .elementor-element-e9aaaa9, .elementor-element-82d3b59 {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    z-index: 100 !important;
    position: relative !important;
    min-height: 550px !important;
  }
  
  .n-gallery-3d {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    min-height: 550px !important;
  }
</style>
`;

content = content.replace(/<style id="nurturing-custom-animations">[\s\S]*?<\/style>/, newStyles);

fs.writeFileSync(filePath, content);
console.log('Images V3, Animations, and Visibility Fixes applied.');
