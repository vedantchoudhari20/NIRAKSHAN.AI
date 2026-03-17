const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace Images with logo versions (v2) and apply mask/animation styles
// Also find the containers for the 3 learning modules and add local animation class
content = content.replace(/src="\.\/images\/indian_preschool_girl_raising_hands\.png"/g, 'src="./images/indian_preschool_girl_raising_hands_v2.png" class="blob-animated"');
content = content.replace(/src="\.\/images\/indian_preschool_boy_playing_blocks\.png"/g, 'src="./images/indian_preschool_boy_playing_blocks_v2.png" class="blob-animated"');
content = content.replace(/src="\.\/images\/indian_girl_student_clock\.png"/g, 'src="./images/indian_girl_student_clock_v2.png" class="blob-animated"');

// 2. Add Animations and Blob Mask Styles to Head
const animationStyles = `
<style id="nurturing-custom-animations">
  @keyframes blob-drift {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1) translateY(0); }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.05) translateY(-10px); }
  }
  
  .blob-animated {
    mask-image: url('./images/blob_mask.png');
    -webkit-mask-image: url('./images/blob_mask.png');
    mask-size: contain;
    -webkit-mask-size: contain;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    transition: all 0.5s ease;
    animation: blob-drift 8s ease-in-out infinite;
    cursor: pointer;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  }
  
  .blob-animated:hover {
    transform: scale(1.1) rotate(2deg);
    filter: brightness(1.1);
  }
  
  /* Force Carousel Visibility */
  #post-25 .elementor-element-e9aaaa9, 
  #post-25 .elementor-element-e9aaaa9 * {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  
  #post-25 .n-gallery-3d {
    display: flex !important;
    min-height: 550px !important;
    overflow: visible !important;
  }
</style>
`;

if (!content.includes('id="nurturing-custom-animations"')) {
    content = content.replace('</head>', animationStyles + '</head>');
}

// 3. Improve Carousel Script Initialization
// Ensure initNurturingGallery is called even after Elementor might have re-rendered sections
const reinitScript = `
<script id="carousel-reinit">
  (function() {
    function reinit() {
      if (typeof window.initNurturingGallery === 'function') {
        window.initNurturingGallery();
      }
    }
    // Multiple triggers to catch any delayed loading
    window.addEventListener('load', reinit);
    document.addEventListener('DOMContentLoaded', reinit);
    setTimeout(reinit, 1000);
    setTimeout(reinit, 3000);
    setInterval(reinit, 5000); // Periodic insurance
  })();
</script>
`;

if (!content.includes('id="carousel-reinit"')) {
    content = content.replace('</body>', reinitScript + '</body>');
}

fs.writeFileSync(filePath, content);
console.log('Images, Mask, Animations, and Carousel fixes applied.');
