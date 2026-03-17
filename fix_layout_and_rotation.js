const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Auto-rotation (setInterval)
content = content.replace(/setInterval\(\(\) => \{ if \(!isD\) \{ a -= \(360 \/ c\.length\); upd\(\); \} \}, 4500\);/g, '// setInterval disabled by user request');

// 2. Tighten Carousel radius and depth to make it more compact (resolves gap)
content = content.replace(/const r = window\.innerWidth < 768 \? 200 : 280;/g, 'const r = window.innerWidth < 768 ? 160 : 220;');
content = content.replace(/const d = window\.innerWidth < 768 \? 140 : 200;/g, 'const d = window.innerWidth < 768 ? 120 : 160;');

// 3. Resolve Layout Gap in Inline Styles
content = content.replace(/style="min-height: 550px !important; width: 100% !important; overflow: visible !important; display: flex !important; justify-content: center !important; position: relative !important;"/g, 'style="width: 100% !important; overflow: visible !important; display: flex !important; justify-content: center !important; position: relative !important; margin-top: -30px !important;"');

// 4. Update Global Styles
const layoutFixStyles = `
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
  
  /* Layout Fixes to move carousel up and text down */
  .elementor-element-e9aaaa9 {
    margin-top: -120px !important; /* Move carousel up more */
    padding-top: 0 !important;
  }
  
  .elementor-element-aafb0d4 {
    margin-top: 60px !important; /* Push text down further */
  }

  /* Force Carousel Visibility without breaking flow */
  .elementor-element-e9aaaa9, 
  .elementor-element-82d3b59 {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    min-height: auto !important;
  }
  
  .n-gallery-3d {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    height: 480px !important; /* Smaller height to reduce gap */
    width: 100% !important;
    margin-bottom: 20px !important;
    perspective: 1000px !important; /* Reduced perspective for closer feel */
  }
  
  .n-viewport {
    display: block !important;
    visibility: visible !important;
  }
  
  .n-card {
    display: block !important;
    visibility: visible !important;
  }
  
  @media (max-width: 768px) {
    .elementor-element-e9aaaa9 {
      margin-top: -60px !important;
    }
  }
</style>
`;

content = content.replace(/<style id="nurturing-custom-animations">[\s\S]*?<\/style>/, layoutFixStyles);

fs.writeFileSync(filePath, content);
console.log('Final Layout & Logic applied: Manual Swipe, Compact Radius, Moved Up.');
