const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix Logos to v4 systematically
content = content.replace(/indian_girl_logo_v3\.png/g, 'indian_girl_logo_v4.png');
content = content.replace(/indian_boy_logo_v3\.png/g, 'indian_boy_logo_v4.png');
content = content.replace(/indian_girl_clock_logo_v3\.png/g, 'indian_girl_clock_logo_v4.png');

// 2. Fix the carousel section e9aaaa9 (Restore side-by-side)
// We need to match the entire section from e9aaaa9 until the next section.
const e9Regex = /<section[^>]*elementor-element-e9aaaa9[\s\S]*?(?=<section[^>]*elementor-element-c524a58)/;

const restoredE9 = `                  <section
                    class="elementor-section elementor-top-section elementor-element elementor-element-e9aaaa9 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="e9aaaa9" data-element_type="section">
                    <div class="elementor-container elementor-column-gap-default">
                      <div
                        class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7666484"
                        data-id="7666484" data-element_type="column">
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <section
                            class="elementor-section elementor-inner-section elementor-element elementor-element-56ad0eb abx elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                            data-id="56ad0eb" data-element_type="section"
                            data-settings='{"background_background":"classic"}'>
                            <div class="elementor-container elementor-column-gap-default">
                              <div
                                class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-dbcc02d"
                                data-id="dbcc02d" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated">
                                  <div
                                    class="elementor-element elementor-element-d5fade0 elementor-widget elementor-widget-image"
                                    data-id="d5fade0" data-element_type="widget"
                                    data-widget_type="image.default">
                                    <div class="elementor-widget-container"
                                      style="width: 100% !important; overflow: visible !important; display: flex !important; justify-content: center !important; position: relative !important; min-height: 500px;">
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
                                            v.parentElement.addEventListener('mousedown', (e) => { isD = true; sX = e.clientX; lA = a; document.addEventListener('mousemove', move); });
                                            v.parentElement.addEventListener('touchstart', (e) => { isD = true; sX = e.touches[0].clientX; lA = a; document.addEventListener('touchmove', move, { passive: false }); }, { passive: true });
                                            document.addEventListener('mouseup', () => { if (!isD) return; isD = false; document.removeEventListener('mousemove', move); a = Math.round(a / (360 / c.length)) * (360 / c.length); upd(); });
                                            document.addEventListener('touchend', () => { if (!isD) return; isD = false; document.removeEventListener('touchmove', move); a = Math.round(a / (360 / c.length)) * (360 / c.length); upd(); });
                                            upd(); window.addEventListener('resize', upd);
                                          }
                                          window.initNurturingGallery = function () { document.querySelectorAll('.n-gallery-3d').forEach(startGallery); }
                                          if (document.readyState === 'complete') window.initNurturingGallery();
                                          else window.addEventListener('load', window.initNurturingGallery);
                                        })();
                                      </script>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-aafb0d4"
                                data-id="aafb0d4" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated">
                                  <div
                                    class="elementor-element elementor-element-54f29ed curved elementor-widget elementor-widget-heading"
                                    data-id="54f29ed" data-element_type="widget" data-widget_type="heading.default">
                                    <div class="elementor-widget-container">
                                      <h4 class="elementor-heading-title elementor-size-large">What makes us</h4>
                                    </div>
                                  </div>
                                  <div
                                    class="elementor-element elementor-element-2b92700 elementor-widget elementor-widget-heading"
                                    data-id="2b92700" data-element_type="widget" data-widget_type="heading.default">
                                    <div class="elementor-widget-container">
                                      <h2 class="elementor-heading-title elementor-size-default">The Best Preschool and Daycare in Nerul - Uran - Pune !</h2>
                                    </div>
                                  </div>
                                  <div
                                    class="elementor-element elementor-element-261abaa elementor-widget-divider--separator-type-pattern elementor-widget-divider--view-line elementor-widget elementor-widget-divider"
                                    data-id="261abaa" data-element_type="widget" data-widget_type="divider.default">
                                    <div class="elementor-widget-container">
                                      <div class="elementor-divider"><span class="elementor-divider-separator"></span></div>
                                    </div>
                                  </div>
                                  <div
                                    class="elementor-element elementor-element-c022844 elementor-widget__width-initial elementor-widget elementor-widget-text-editor"
                                    data-id="c022844" data-element_type="widget" data-widget_type="text-editor.default">
                                    <div class="elementor-widget-container">
                                      <p><span style="font-weight: 400">When you walk through the doors of The Nurturing Roots Preschool and Daycare, you will see children indulging in a </span><b>joyful learning environment</b><span style="font-weight: 400">. Right from our curriculum to our activities, everything is curated innovatively and involves application of research from neuroscience to educational and childcare practices.</span></p>
                                    </div>
                                  </div>
                                  <div
                                    class="elementor-element elementor-element-b93cf1b elementor-mobile-align-center elementor-align-left elementor-tablet-align-center elementor-widget elementor-widget-button"
                                    data-id="b93cf1b" data-element_type="widget" data-widget_type="button.default">
                                    <div class="elementor-widget-container">
                                      <div class="elementor-button-wrapper">
                                        <a class="elementor-button elementor-button-link elementor-size-sm" href="./about-us/index.html">
                                          <span class="elementor-button-content-wrapper"><span class="elementor-button-text">About us</span></span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                          <div
                            class="elementor-element elementor-element-ed95baf elementor-widget__width-auto elementor-absolute mli elementor-hidden-mobile elementor-hidden-tablet elementor-widget elementor-widget-image"
                            data-id="ed95baf" data-element_type="widget" data-settings='{"_position":"absolute"}'
                            data-widget_type="image.default">
                            <div class="elementor-widget-container">
                              <img loading="eager" decoding="async" width="107" height="84" src="./images/an-img-06.png" class="attachment-large size-large wp-image-1912" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
`;

if (e9Regex.test(content)) {
    content = content.replace(e9Regex, restoredE9);
}

// 3. Fix the "Enriching" section overlap by ensuring height
// Find the section c524a58 and add a min-height to ensure blobs don't crash
content = content.replace(/data-id="c524a58" data-element_type="section">/g, 'data-id="c524a58" data-element_type="section" style="min-height: 500px !important;">');

fs.writeFileSync(filePath, content);
console.log('SUCCESS: Systematic restoration of Carousel (Side-by-Side), logos (v4), and enrichment section layout.');
