/* ============================================================
   SCALENTY — Atlas shared chrome (nav + footer) + helpers
   Each page sets <body data-page="home|amazon|etsy|pricing|about|faq|contact">
   ============================================================ */
(function(){
  // Brand mark — uploaded "arrow + S" icon, recolored to Atlas.
  // viewBox cropped to artwork bounds so height controls optical size.
  const SP = "M 262.91 259.88 L 262.91 216.56 A 1.08 1.08 0.0 0 1 263.99 215.48 Q 300.72 215.56 335.49 215.09 Q 340.46 215.03 345.49 218.81 C 350.83 222.84 351.88 227.39 352.70 234.52 Q 372.75 408.63 384.40 506.28 Q 385.68 517.04 384.63 520.23 Q 381.98 528.24 372.92 531.72 C 370.48 532.66 365.27 532.43 361.86 532.43 Q 218.10 532.54 54.96 532.38 Q 46.03 532.37 44.57 532.00 C 36.47 529.93 30.05 521.83 31.07 513.32 C 37.56 459.58 45.22 390.64 52.99 325.84 Q 57.60 287.48 62.99 238.49 Q 64.32 226.41 66.04 223.74 C 70.76 216.39 76.95 215.19 86.42 215.28 Q 93.63 215.34 153.06 215.18 A 0.64 0.64 0.0 0 1 153.70 215.82 L 153.70 259.84 A 0.68 0.68 0.0 0 1 153.02 260.52 Q 143.49 260.58 108.83 260.59 Q 104.87 260.60 104.40 264.69 C 96.17 336.61 86.12 419.74 79.05 481.12 Q 78.72 483.96 79.46 485.81 A 3.41 3.40 81.8 0 0 82.32 487.96 Q 85.04 488.22 88.00 488.21 Q 185.95 487.82 328.05 488.01 C 331.96 488.02 337.33 488.69 336.88 483.00 C 335.67 467.57 332.42 444.46 330.59 428.42 Q 321.63 349.86 316.34 304.92 C 314.56 289.81 313.47 276.03 311.90 264.42 Q 311.35 260.37 307.01 260.41 Q 279.16 260.62 263.66 260.63 A 0.75 0.75 0.0 0 1 262.91 259.88 Z";
  const AP = "M 184.03 387.97 L 184.30 126.91 A 0.20 0.20 0.0 0 0 184.17 126.72 Q 183.95 126.64 183.49 126.98 C 178.49 130.67 171.76 138.49 167.18 142.99 Q 140.70 169.01 134.80 174.97 A 0.76 0.76 0.0 0 1 133.78 175.02 C 127.19 169.55 119.83 161.61 108.43 150.20 C 105.95 147.72 103.64 144.58 101.52 142.75 A 1.07 1.07 0.0 0 1 101.47 141.19 L 207.23 35.43 A 1.07 1.07 0.0 0 1 208.75 35.43 L 315.21 141.89 A 0.55 0.55 0.0 0 1 315.21 142.67 L 282.83 175.04 A 1.17 1.16 -46.7 0 1 281.23 175.09 Q 276.95 171.25 269.57 163.95 Q 262.31 156.78 232.82 126.59 A 0.35 0.35 0.0 0 0 232.22 126.83 Q 232.59 180.71 232.40 271.76 Q 232.24 351.71 232.53 379.01 Q 232.58 383.85 232.01 387.77 A 0.66 0.66 0.0 0 1 231.36 388.34 L 184.39 388.34 A 0.37 0.36 -90.0 0 1 184.03 387.97 Z";
  const mark = (arrow, s) => `<svg class="mk" viewBox="31 28 353 511" fill="none" aria-label="Scalenty"><path fill="${s}" d="${SP}"/><path fill="${arrow}" d="${AP}"/></svg>`;
  const LOGO  = mark('#0E8C5A', '#15201B');   // header, on light
  const FLOGO = mark('#6FD3A4', '#FAF9F5');   // footer, on ink

  // favicon — ink rounded tile with mint arrow + off-white S
  const FAV = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' rx='115' fill='#15201B'/><g transform='translate(105.6 50.7) scale(0.724)'><path fill='#FAF9F5' d='${SP}'/><path fill='#6FD3A4' d='${AP}'/></g></svg>`;
  const favLink = document.createElement('link');
  favLink.rel = 'icon'; favLink.type = 'image/svg+xml';
  favLink.href = 'data:image/svg+xml,' + encodeURIComponent(FAV);
  document.head.appendChild(favLink);

  const LINKS = [
    {label:'Home', href:'Home.html', key:'home'},
    {label:'Amazon', href:'Amazon.html', key:'amazon'},
    {label:'Etsy', href:'Etsy.html', key:'etsy'},
    {label:'Pricing', href:'Pricing.html', key:'pricing'},
    {label:'About', href:'About.html', key:'about'},
    {label:'FAQ', href:'FAQ.html', key:'faq'},
  ];
  const page = document.body.dataset.page || '';
  const navLinks = LINKS.map(l=>`<a href="${l.href}" class="${l.key===page?'active':''}">${l.label}</a>`).join('');

  // scroll progress bar
  const bar = document.createElement('div');
  bar.className = 'scrollbar';

  // header
  const header = document.createElement('header');
  header.className = 'nav';
  header.innerHTML = `
    <div class="wrap nav-inner">
      <a class="logo" href="Home.html">${LOGO}<span class="nm">Scalenty</span></a>
      <nav class="nav-links">${navLinks}</nav>
      <div class="nav-r">
        <span class="lang" title="Language">EN / TR</span>
        <a class="btn btn-green" href="Contact.html">Book a Call</a>
        <button class="nav-toggle" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
    <nav class="nav-mobile">${navLinks}<a href="Contact.html">Book a Call</a></nav>`;
  document.body.prepend(header);
  document.body.prepend(bar);

  const toggle = header.querySelector('.nav-toggle');
  const mobile = header.querySelector('.nav-mobile');
  toggle.addEventListener('click', ()=> mobile.classList.toggle('open'));

  // footer
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="wrap">
      <div class="foot">
        <div>
          <a class="logo" href="Home.html">${FLOGO}<span class="nm">Scalenty</span></a>
          <p class="foot-tag">Honest e-commerce consulting for Amazon &amp; Etsy sellers.</p>
        </div>
        <div><h5>Quick Links</h5>
          <a href="Home.html">Home</a><a href="Pricing.html">Pricing</a><a href="About.html">About</a><a href="FAQ.html">FAQ</a></div>
        <div><h5>Services</h5>
          <a href="Amazon.html">Amazon Services</a><a href="Etsy.html">Etsy Services</a><a href="Contact.html">Book a Call</a></div>
        <div><h5>Contact</h5>
          <a href="Contact.html">Contact Us</a><a href="mailto:hello@scalenty.com">hello@scalenty.com</a><a href="Privacy.html">Privacy Policy</a><a href="Terms.html">Terms of Service</a></div>
      </div>
      <div class="foot-bot">
        <span>© ${new Date().getFullYear()} Scalenty. All rights reserved.</span>
        <span>Honest Amazon &amp; Etsy consulting</span>
      </div>
    </div>`;
  document.body.appendChild(footer);

  // nav shadow + progress
  function onScroll(){
    const h = document.documentElement, max = (h.scrollHeight - h.clientHeight) || 1;
    bar.style.width = (h.scrollTop / max * 100) + '%';
    header.classList.toggle('scrolled', h.scrollTop > 8);
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // reveal on scroll
  const io = new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:0, rootMargin:'0px 0px -18% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // counters
  function countUp(el){
    const to=parseFloat(el.dataset.count), pre=el.dataset.prefix||'', suf=el.dataset.suffix||'', dur=1300, t0=performance.now();
    if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=pre+to+suf;return;}
    function step(t){const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=pre+Math.round(to*e)+suf;if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  }
  const cio = new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target);} });
  },{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

  // language toggle (EN/TR)
  if(window.SCALENTY_I18N) window.SCALENTY_I18N.init();
})();
