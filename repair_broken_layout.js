const fs = require('fs');
const filePath = 'c:/Users/Vedant/Downloads/thenurturingroots.com/deploy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// The messed up section e9aaaa9 starts around 4304 in the previous view. 
// I need a robust way to replace the entire block from e9aaaa9 to c524a58.

const searchStart = /<section[^>]*elementor-element-e9aaaa9[\s\S]*?(?=<section[^>]*elementor-element-c524a58)/;

const restoredSection = `                  <section
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
                                      style="width: 100% !important; overflow: visible !important; display: flex !important; justify-content: center !important; position: relative !important;">
                                      <style>
                                        .n-gallery-3d {
                                          width: 100%;
                                          height: 550px;
                                          perspective: 1200px;
                                          display: flex;
                                          justify-content: center;
                                          align-items: center;
                                          position: relative;
                                          overflow: visible !important;
                                        }

                                        .n-viewport {
                                          width: 320px;
                                          height: 420px;
                                          position: relative;
                                          transform-style: preserve-3d;
                                        }

                                        .n-card {
                                          position: absolute;
                                          width: 320px;
                                          height: 420px;
                                          background: #fff;
                                          border-radius: 40px;
                                          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.2);
                                          border: 6px solid #fff;
                                          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
                                          overflow: hidden;
                                        }

                                        .n-card img {
                                          width: 100%;
                                          height: 100%;
                                          object-fit: cover;
                                        }

                                        @media (max-width: 768px) {
                                          .n-viewport,
                                          .n-card {
                                            width: 260px;
                                            height: 340px;
                                          }

                                          .n-gallery-3d {
                                            height: 450px;
                                          }
                                        }
                                      </style>

                                      <div class="n-gallery-3d">
                                        <div class="n-viewport">
                                          <div class="n-card"><img src="./images/carousel_diverse_5.png"
                                              alt="Happy student 1"></div>
                                          <div class="n-card"><img src="./images/carousel_diverse_1.png"
                                              alt="Happy student 2"></div>
                                          <div class="n-card"><img src="./images/carousel_diverse_2.png"
                                              alt="Happy student 3"></div>
                                          <div class="n-card"><img src="./images/carousel_diverse_3.png"
                                              alt="Happy student 4"></div>
                                          <div class="n-card"><img src="./images/carousel_diverse_4.png"
                                              alt="Happy student 5"></div>
                                          <div class="n-card"><img src="./images/carousel_diverse_6.png"
                                              alt="Happy student 6"></div>
                                        </div>
                                      </div>

                                      <script>
                                        (function () {
                                          function startGallery(container) {
                                            const v = container.querySelector('.n-viewport');
                                            const c = container.querySelectorAll('.n-card');
                                            if (!v || !c.length) return;

                                            let a = 0;
                                            let isD = false;
                                            let sX = 0;
                                            let lA = 0;

                                            function upd() {
                                              const step = 360 / c.length;
                                              const r = window.innerWidth < 768 ? 160 : 250;
                                              const d = window.innerWidth < 768 ? 120 : 180;

                                              c.forEach((card, i) => {
                                                const ang = (i * step + a) * Math.PI / 180;
                                                const x = Math.sin(ang) * (r * 0.9);
                                                const z = Math.cos(ang) * d;
                                                const nZ = (z + d) / (2 * d);
                                                const s = 0.5 + (nZ * 0.5);
                                                const o = 0.2 + (nZ * 0.8);
                                                const zI = Math.round(z + 500);

                                                card.style.transform = \\"translateX(\\" + x + \\"px) translateZ(\\" + z + \\"px) scale(\\" + s + \\")\\";
                                                card.style.opacity = o.toFixed(2);
                                                card.style.zIndex = zI;
                                              });
                                            }

                                            function move(e) {
                                              if (!isD) return;
                                              const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                                              a = lA + (x - sX) / 2.5;
                                              upd();
                                              if (e.cancelable) e.preventDefault();
                                            }

                                            v.parentElement.addEventListener('mousedown', (e) => { isD = true; sX = e.clientX; lA = a; document.addEventListener('mousemove', move); });
                                            v.parentElement.addEventListener('touchstart', (e) => { isD = true; sX = e.touches[0].clientX; lA = a; document.addEventListener('touchmove', move, { passive: false }); }, { passive: true });

                                            document.addEventListener('mouseup', () => { if (!isD) return; isD = false; document.removeEventListener('mousemove', move); a = Math.round(a / (360 / c.length)) * (360 / c.length); upd(); });
                                            document.addEventListener('touchend', () => { if (!isD) return; isD = false; document.removeEventListener('touchmove', move); a = Math.round(a / (360 / c.length)) * (360 / c.length); upd(); });

                                            upd();
                                            window.addEventListener('resize', upd);
                                          }

                                          window.initNurturingGallery = function () {
                                            document.querySelectorAll('.n-gallery-3d').forEach(startGallery);
                                          }

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
                                      <h4 class="elementor-heading-title elementor-size-large">
                                        What makes us
                                      </h4>
                                    </div>
                                  </div>
                                  <div
                                    class="elementor-element elementor-element-2b92700 elementor-widget elementor-widget-heading"
                                    data-id="2b92700" data-element_type="widget" data-widget_type="heading.default">
                                    <div class="elementor-widget-container">
                                      <h2 class="elementor-heading-title elementor-size-default">
                                        The Best Preschool and Daycare in
                                        Nerul - Uran - Pune !
                                      </h2>
                                    </div>
                                  </div>
                                  <div
                                    class="elementor-element elementor-element-261abaa elementor-widget-divider--separator-type-pattern elementor-widget-divider--view-line elementor-widget elementor-widget-divider"
                                    data-id="261abaa" data-widget_type="divider.default">
                                    <div class="elementor-widget-container">
                                      <div class="elementor-divider">
                                        <span class="elementor-divider-separator">
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="elementor-element elementor-element-c022844 elementor-widget__width-initial elementor-widget elementor-widget-text-editor"
                                    data-id="c022844" data-element_type="widget" data-widget_type="text-editor.default">
                                    <div class="elementor-widget-container">
                                      <p>
                                        <span style="font-weight: 400">When you walk through the doors of
                                          The Nurturing Roots Preschool and
                                          Daycare, you will see children
                                          indulging in a </span><b>joyful learning environment</b><span
                                          style="font-weight: 400">. Right from our curriculum to our
                                          activities, everything is curated
                                          innovatively and involves
                                          application of research from
                                          neuroscience to educational and
                                          childcare practices.</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    class="elementor-element elementor-element-b93cf1b elementor-mobile-align-center elementor-align-left elementor-tablet-align-center elementor-widget elementor-widget-button"
                                    data-id="b93cf1b" data-element_type="widget" data-widget_type="button.default">
                                    <div class="elementor-widget-container">
                                      <div class="elementor-button-wrapper">
                                        <a class="elementor-button elementor-button-link elementor-size-sm"
                                          href="./about-us/index.html">
                                          <span class="elementor-button-content-wrapper">
                                            <span class="elementor-button-text">About us</span>
                                          </span>
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
                              <img loading="eager" decoding="async" width="107" height="84" src="./images/an-img-06.png"
                                class="attachment-large size-large wp-image-1912" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
`;

if (searchStart.test(content)) {
    content = content.replace(searchStart, restoredSection);
    // Double check if there's a leftover extra section 82d3b59 if duplicated
    content = content.replace(/<section[^>]*elementor-element-82d3b59[\s\S]*?<\/section>/, '');
    
    // Fix logos to v4 while we are at it
    content = content.replace(/src="\.\/images\/indian_boy_logo_v3\.png"/g, 'src="./images/indian_boy_logo_v4.png"');
    content = content.replace(/src="\.\/images\/indian_girl_clock_logo_v3\.png"/g, 'src="./images/indian_girl_clock_logo_v4.png"');

    fs.writeFileSync(filePath, content);
    console.log('SUCCESS: Reverted to side-by-side layout and cleaned up HTML structure.');
} else {
    console.error('FAILED: Could not find the messed up section start.');
}
