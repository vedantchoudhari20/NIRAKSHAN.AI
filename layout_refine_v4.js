const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Module Images to v4 (Consistent Logo)
content = content.replace(/src="\.\/images\/indian_boy_logo_v3\.png"/g, 'src="./images/indian_boy_logo_v4.png"');
content = content.replace(/src="\.\/images\/indian_girl_clock_logo_v3\.png"/g, 'src="./images/indian_girl_clock_logo_v4.png"');

// 2. Hide Duplicate "Enriching" section on Desktop
// Find the section e28f9b0 and add the hidden class back
content = content.replace(/elementor-element-e28f9b0 elementor-section-full_width/g, 'elementor-element-e28f9b0 elementor-section-full_width elementor-hidden-desktop');

// 3. Re-organize Carousel & Text Layout (Vertical Stack for better brand look)
// We want Text on top, Carousel below.
// This requires moving the column element-aafb0d4 before dbcc02d, and making them full-width.

// Extract the text column chunk (aafb0d4)
const textColMatch = content.match(/<div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-aafb0d4"[\s\S]*?<\/div>[\s\n\r]*<\/div>[\s\n\r]*<\/div>/);
const carouselColMatch = content.match(/<div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-dbcc02d"[\s\S]*?<\/div>[\s\n\r]*<\/div>[\s\n\r]*<\/div>/);

if (textColMatch && carouselColMatch) {
    let textCol = textColMatch[0].replace('elementor-col-50', 'elementor-col-100');
    let carouselCol = carouselColMatch[0].replace('elementor-col-50', 'elementor-col-100');
    
    // Clean up margins in the column or container
    textCol = textCol.replace('margin-top: 60px !important;', 'margin-bottom: 40px !important;');
    
    // Construct the new inner section container content
    const newInnerContent = `
                            <div class="elementor-container elementor-column-gap-default" style="flex-direction: column !important; align-items: center !important;">
                                ${textCol}
                                ${carouselCol}
                            </div>`;
                            
    // Find the section container in 56ad0eb and replace its children
    const innerSectionRegex = /<section[^>]*elementor-element-56ad0eb[\s\S]*?<div class="elementor-container elementor-column-gap-default"[\s\S]*?<\/section>/;
    const oldInnerSection = content.match(innerSectionRegex);
    if (oldInnerSection) {
        let updatedInner = oldInnerSection[0].replace(/<div class="elementor-container elementor-column-gap-default"[\s\S]*?<\/div>[\s\r\n]*<\/section>/, newInnerContent + '\n                          </section>');
        content = content.replace(innerSectionRegex, updatedInner);
    }
}

// 4. Final adjustments to CSS
const finalResponsiveStyles = `
<style id="nurturing-custom-animations">
  @keyframes blob-drift {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1) translateY(0); }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.03) translateY(-10px); }
  }
  
  @keyframes entrance-fade-up {
    from { opacity: 0; transform: translateY(40px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .entrance-anim { animation: entrance-fade-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  .floating-anim { animation: float-gentle 4s ease-in-out infinite; }
  
  .blob-animated {
    mask-image: url('./images/blob_mask.png');
    -webkit-mask-image: url('./images/blob_mask.png');
    mask-size: 100% 100%;
    -webkit-mask-size: 100% 100%;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    transition: transform 0.4s ease;
    animation: blob-drift 10s ease-in-out infinite;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    display: block !important;
    width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
  }
  
  .blob-animated:hover { transform: scale(1.03); }
  
  /* Layout Fixes for stacked Brand look */
  .elementor-element-e9aaaa9 {
    margin-top: 20px !important; 
    padding-bottom: 60px !important;
  }
  
  .elementor-element-56ad0eb {
    text-align: center !important;
  }
  
  .elementor-element-dc1283d p, .elementor-element-9ad528c p, .elementor-element-bdc8e31 p {
    max-width: 800px;
    margin: 0 auto !important;
  }

  /* Force Carousel Visibility without large gaps */
  .n-gallery-3d {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    height: 500px !important; 
    width: 100% !important;
    margin: 20px auto !important;
    perspective: 1000px !important;
  }
  
  .n-card { border: 4px solid #fff; border-radius: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.15); }
  
  /* Hide the duplicate mobile section on desktop again */
  @media (min-width: 1025px) {
    .elementor-element-e28f9b0 { display: none !important; }
  }
</style>
`;

content = content.replace(/<style id="nurturing-custom-animations">[\s\S]*?<\/style>/, finalResponsiveStyles);

fs.writeFileSync(filePath, content);
console.log('Layout Refined: Text on Top, Carousel Below. Duplicate hidden. Consistent Logos v4 applied.');
