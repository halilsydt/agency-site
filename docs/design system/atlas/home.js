/* Atlas — home-only: hero entrance + interactive results showcase */
(function(){
  // Hero entrance — rAF for nice timing, with a timeout fallback so content
  // always reveals even if rAF is throttled (background tab / capture tools).
  function startHero(){
    const hero=document.getElementById('hero'); if(hero) hero.classList.add('go');
    const hl=document.getElementById('heroLine'); if(hl) hl.style.strokeDashoffset='0';
  }
  requestAnimationFrame(()=>requestAnimationFrame(startHero));
  setTimeout(startHero, 260);

  const CLIENTS=[
    {tab:'Amazon · full year',per:'2025 Annual Results',title:'A stalled catalog, scaled to seven figures.',desc:'Listing overhaul, A+ Content, and profit-first PPC turned a plateaued account into a full-year growth story.',
     stats:[{v:'+212%',l:'Revenue',g:1},{v:'2.1×',l:'Ad ROAS'},{v:'+38%',l:'Conv. rate'}],
     labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],series:[34,33,41,39,52,55,63,68,82,89,108,124],pre:'$',suf:'k'},
    {tab:'Etsy · 5 years',per:'2020–2025 Growth',title:'Five years of compounding growth.',desc:'Steady SEO, seasonal planning, and listing refreshes compounded into year-over-year gains since 2020.',
     stats:[{v:'4.4×',l:'vs. 2020',g:1},{v:'5 yr',l:'Consistent'},{v:'+27%',l:'Avg/yr'}],
     labels:['2020','2021','2022','2023','2024','2025'],series:[48,72,98,134,176,214],pre:'$',suf:'k'},
    {tab:'Etsy · full year',per:'2025 Annual Results',title:'A strong year, made stronger.',desc:'Tag research and conversion-focused listings lifted an already-healthy shop to its best year yet.',
     stats:[{v:'+148%',l:'Revenue',g:1},{v:'+41%',l:'Visibility'},{v:'4.9★',l:'Rating'}],
     labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],series:[12,13,16,15,19,22,24,27,31,34,42,48],pre:'$',suf:'k'},
    {tab:'New Etsy shop',per:'May–Dec 2025',title:'From zero to traction in eight months.',desc:'A brand-new shop, set up right and marketed deliberately — rapid, sustainable growth since launch.',
     stats:[{v:'$63k',l:'In 8 mo',g:1},{v:'1.1k',l:'Orders'},{v:'8 mo',l:'Since launch'}],
     labels:['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],series:[2,5,9,14,22,33,48,63],pre:'$',suf:'k'}
  ];
  const tabsEl=document.getElementById('tabs'),rinfo=document.getElementById('rinfo'),rcbox=document.getElementById('rcbox');
  if(!tabsEl) return;
  tabsEl.innerHTML=CLIENTS.map((c,i)=>`<button class="tab${i?'':' active'}" data-i="${i}">${c.tab}</button>`).join('');
  const W=560,H=230,PX=8,PT=18,PB=18;
  function chart(c){
    const max=Math.max(...c.series),min=Math.min(...c.series),span=(max-min)||1,iH=H-PT-PB,iW=W-PX*2;
    const pts=c.series.map((v,i)=>({x:PX+(i/(c.series.length-1))*iW,y:PT+iH-((v-min)/span)*iH*.88-iH*.06,v,label:c.labels[i]}));
    const line=pts.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const area=`M${pts[0].x},${H-PB} `+pts.map(p=>`L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')+` L${pts[pts.length-1].x},${H-PB} Z`;
    const grid=[.25,.5,.75].map(f=>`<line x1="0" y1="${(PT+iH*f).toFixed(1)}" x2="${W}" y2="${(PT+iH*f).toFixed(1)}" stroke="rgba(255,255,255,.08)"/>`).join('');
    return {pts,svg:`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="width:100%;height:100%">
      <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6FD3A4" stop-opacity=".3"/><stop offset="1" stop-color="#6FD3A4" stop-opacity="0"/></linearGradient></defs>
      ${grid}<path d="${area}" fill="url(#rg)"/>
      <path class="rline" pathLength="1" d="${line}" fill="none" stroke="#6FD3A4" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" style="stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.3s cubic-bezier(.16,1,.3,1)"/>
    </svg>`};
  }
  function render(i){
    const c=CLIENTS[i],{pts,svg}=chart(c);
    rinfo.innerHTML=`<div class="rper">${c.per}</div><h3>${c.title}</h3><p>${c.desc}</p>
      <div class="rstats">${c.stats.map(s=>`<div><div class="rv ${s.g?'g':''}">${s.v}</div><div class="rl">${s.l}</div></div>`).join('')}</div>`;
    rcbox.innerHTML=svg+'<div class="rdot"></div><div class="rtip"></div>';
    const ln=rcbox.querySelector('.rline');requestAnimationFrame(()=>requestAnimationFrame(()=>ln.style.strokeDashoffset='0'));
    const dot=rcbox.querySelector('.rdot'),tip=rcbox.querySelector('.rtip');
    function move(ev){
      const r=rcbox.getBoundingClientRect(),cx=((ev.touches?ev.touches[0].clientX:ev.clientX)-r.left)/r.width*W;
      let n=pts[0];for(const p of pts)if(Math.abs(p.x-cx)<Math.abs(n.x-cx))n=p;
      const lx=n.x/W*100,ly=n.y/H*100;
      dot.style.left=lx+'%';dot.style.top=ly+'%';dot.style.opacity=1;
      tip.style.left=lx+'%';tip.style.top=ly+'%';tip.style.opacity=1;tip.textContent=`${n.label} · ${c.pre}${n.v}${c.suf}`;
    }
    rcbox.onmousemove=move;rcbox.onmouseleave=()=>{dot.style.opacity=0;tip.style.opacity=0;};
    rcbox.ontouchmove=move;
  }
  tabsEl.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{
    tabsEl.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(+b.dataset.i);
  }));
  render(0);
})();
