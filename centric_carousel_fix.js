const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix the broken image (Horizonal Learning Method)
// It was changed to v4 but v4 doesn't exist for the girl raising hands.
content = content.replace(/src="\.\/images\/indian_girl_logo_v4\.png"/g, 'src="./images/indian_girl_logo_v3.png"');

// 2. Centric Carousel Layout (No text beside it)
const searchE9 = /<section[^>]*elementor-element-e9aaaa9[\s\S]*?(?=<section[^>]*elementor-element-c524a58)/;

const centricCarousel = `                  <section
                    class="elementor-section elementor-top-section elementor-element elementor-element-e9aaaa9 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="e9aaaa9" data-element_type="section">
                    <div class="elementor-container elementor-column-gap-default">
                      <div
                        class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7666484"
                        data-id="7666484" data-element_type="column">
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <!-- Centered Brand Text Above Carousel -->
                          <div style="text-align: center; margin-bottom: 40px;">
                            <h4 style="font-family: 'Kid-Knowledge-1', sans-serif; color: #ff6b6b; font-size: 28px; margin-bottom: 10px;">What makes us</h4>
                            <h2 style="font-family: 'Kid-Knowledge-1', sans-serif; color: #4a4a4a; font-size: 36px; line-height: 1.2; max-width: 800px; margin: 0 auto 20px;">The Best Preschool and Daycare in Nerul - Uran - Pune !</h2>
                            <div style="width: 80px; height: 4px; background: #ffca28; margin: 0 auto; border-radius: 2px;"></div>
                          </div>

                          <!-- Full Width Carousel -->
                          <div
                            class="elementor-element elementor-element-d5fade0 elementor-widget elementor-widget-image"
                            data-id="d5fade0" data-element_type="widget"
                            data-widget_type="image.default">
                            <div class="elementor-widget-container"
                              style="width: 100% !important; overflow: visible !important; display: flex !important; justify-content: center !important; position: relative !important;">
                              <style>
                                .n-gallery-3d { width: 100%; height: 500px; perspective: 1200px; display: flex; justify-content: center; align-items: center; position: relative; overflow: visible !important; }
                                .n-viewport { width: 320px; height: 420px; position: relative; transform-style: preserve-3d; }
                                .n-card { position: absolute; width: 320px; height: 420px; background: #fff; border-radius: 40px; box-shadow: 0 40px 100px rgba(0, 0, 0, 0.2); border: 6px solid #fff; transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
                                .n-card img { width: 100%; height: 100%; object-fit: cover; }
                                @media (max-width: 768px) { .n-viewport, .n-card { width: 260px; height: 340px; } .n-gallery-3d { height: 450px; } }
                              </style>
                              <div class="n-gallery-3d">
                                <div class="n-viewport">
                                  <div class="n-card"><img src="./images/carousel_diverse_5.png"></div>
                                  <div class="n-card"><img src="./images/carousel_diverse_1.png"></div>
                                  <div class="n-card"><img src="./images/carousel_diverse_2.png"></div>
                                  <div class="n-card"><img src="./images/carousel_diverse_3.png"></div>
                                  <div class="n-card"><img src="./images/carousel_diverse_4.png"></div>
                                  <div class="n-card"><img src="./images/carousel_diverse_6.png"></div>
                                </div>
                              </div>
                              <script>
                                (function () {
                                  function startGallery(container) {
                                    const v = container.querySelector('.n-viewport'), c = container.querySelectorAll('.n-card');
                                    if (!v || !c.length) return;
                                    let a = 0, isD = false, sX = 0, lA = 0;
                                    function upd() {
                                      const step = 360 / c.length;
                                      const r = window.innerWidth < 768 ? 160 : 250;
                                      const d = window.innerWidth < 768 ? 120 : 180;
                                      c.forEach((card, i) => {
                                        const ang = (i * step + a) * Math.PI / 180;
                                        const x = Math.sin(ang) * (r * 0.9);
                                        const z = Math.cos(ang) * d;
                                        const nZ = (z + d) / (2 * d);
                                        const s = 0.5 + (nZ * 0.5), o = 0.2 + (nZ * 0.8), zI = Math.round(z + 500);
                                        card.style.transform = "translateX(" + x + "px) translateZ(" + z + "px) scale(" + s + ")";
                                        card.style.opacity = o.toFixed(2); card.style.zIndex = zI;
                                      });
                                    }
                                    function move(e) {
                                      if (!isD) return;
                                      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                                      a = lA + (x - sX) / 2.5; upd();
                                      if (e.cancelable) e.preventDefault();
                                    }
                                    function start(e) { isD = true; sX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX; lA = a; }
                                    function end() { if (!isD) return; isD = false; a = Math.round(a / (360 / c.length)) * (360 / c.length); upd(); }
                                    
                                    v.parentElement.addEventListener('mousedown', start);
                                    v.parentElement.addEventListener('touchstart', start, { passive: true });
                                    document.addEventListener('mousemove', move);
                                    document.addEventListener('touchmove', move, { passive: false });
                                    document.addEventListener('mouseup', end);
                                    document.addEventListener('touchend', end);
                                    upd(); window.addEventListener('resize', upd);
                                  }
                                  window.initNurturingGallery = function () { document.querySelectorAll('.n-gallery-3d').forEach(startGallery); }
                                  if (document.readyState === 'complete') window.initNurturingGallery();
                                  else window.addEventListener('load', window.initNurturingGallery);
                                })();
                              </script>
                            </div>
                          </div>
                          <div style="text-align: center; margin-top: 30px;">
                            <a class="elementor-button elementor-button-link elementor-size-sm" href="./about-us/index.html" style="background: #7bdcb5; border-radius: 30px; padding: 12px 30px; color: #fff; font-weight: bold; text-decoration: none; cursor: pointer;">About us</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
`;

if (searchE9.test(content)) {
    content = content.replace(searchE9, centricCarousel);
    fs.writeFileSync(filePath, content);
    console.log('SUCCESS: Centered Carousel layout and fixed broken image.');
} else {
    console.error('FAILED: Could not find section e9aaaa9.');
}
