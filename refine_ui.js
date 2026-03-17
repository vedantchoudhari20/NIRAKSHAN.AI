const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Update CSS for better masking and visibility
const refinedStyles = `
<style id="nurturing-custom-animations">
  @keyframes blob-drift {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1) translateY(0); }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.02) translateY(-8px); }
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
    animation: blob-drift 10s ease-in-out infinite;
    cursor: pointer;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    background: #fff; /* Ensure background for mask */
    display: block !important;
    width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
  }
  
  .blob-animated:hover {
    transform: scale(1.08) rotate(1deg);
    filter: brightness(1.05) contrast(1.05);
  }
  
  /* Force Carousel Visibility and Stacking */
  .elementor-element-e9aaaa9 {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    z-index: 100 !important;
    position: relative !important;
    clear: both !important;
    min-height: 600px !important;
  }
  
  .n-gallery-3d {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    min-height: 550px !important;
  }
  
  /* Swiper fix if images missing */
  .swiper-slide img {
    opacity: 1 !important;
    visibility: visible !important;
  }
</style>
`;

content = content.replace(/<style id="nurturing-custom-animations">[\s\S]*?<\/style>/, refinedStyles);

// Ensure carousel-reinit script is more aggressive
const updatedReinit = `
<script id="carousel-reinit">
  (function() {
    function reinit() {
      console.log('Nurturing Roots UI Check...');
      if (typeof window.initNurturingGallery === 'function') {
        window.initNurturingGallery();
      }
      // Force display of carousel container if hidden by JS
      const gallery = document.querySelector('.n-gallery-3d');
      if (gallery) {
        gallery.style.display = 'flex';
        gallery.style.visibility = 'visible';
        gallery.style.opacity = '1';
        gallery.parentElement.style.display = 'block';
      }
    }
    window.addEventListener('load', reinit);
    document.addEventListener('DOMContentLoaded', reinit);
    setTimeout(reinit, 500);
    setTimeout(reinit, 2000);
    setInterval(reinit, 4000);
  })();
</script>
`;

content = content.replace(/<script id="carousel-reinit">[\s\S]*?<\/script>/, updatedReinit);

// Use v2 images (logo versions)
content = content.replace(/src="\.\/images\/indian_preschool_girl_raising_hands_v2\.png"/g, 'src="./images/indian_preschool_girl_raising_hands_v2.png"');
content = content.replace(/src="\.\/images\/indian_preschool_boy_playing_blocks_v2\.png"/g, 'src="./images/indian_boy_blocks_v2.png"');
content = content.replace(/src="\.\/images\/indian_girl_student_clock_v2\.png"/g, 'src="./images/indian_girl_student_clock_v2.png"');

fs.writeFileSync(filePath, content);
console.log('Refined Masking and Aggressive Carousel fix applied.');
