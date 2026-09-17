const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const loader = $("#loader");
if (loader) addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 1000));

const nav = $("#nav");
const progress = $("#progress");

function scrollFX(){
  const y = scrollY;
  if (nav) nav.classList.toggle("scrolled", y > 40);
  if (progress) {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? y / max * 100 : 0) + "%";
  }
  $$('[data-parallax]').forEach(el => {
    const r = el.parentElement.getBoundingClientRect();
    const a = (innerHeight / 2 - (r.top + r.height / 2)) * .035;
    el.style.transform = `translate3d(0,${a}px,0) scale(1.04)`;
  });

  const tr = $(".facility-track"), sec = $(".facilities");
  if (tr && sec && innerWidth > 900) {
    const r = sec.getBoundingClientRect();
    const denom = r.height - innerHeight;
    const p = denom > 0 ? Math.min(Math.max((innerHeight-r.top)/denom,0),1) : 0;
    const mx = Math.max(tr.scrollWidth - innerWidth + innerWidth*.08, 0);
    tr.style.transform = `translate3d(${-p*mx}px,0,0)`;
  }
}
addEventListener("scroll", scrollFX, {passive:true});
addEventListener("resize", scrollFX);
scrollFX();

// Highlight the current page in the normal top navigation.
const current = location.pathname.split('/').pop() || 'index.html';
$$('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === current) a.classList.add('active');
});

// Custom cursor
let cx=innerWidth/2, cy=innerHeight/2, tx=cx, ty=cy;
const cursor=$("#cursor");
if (cursor) {
  addEventListener("mousemove", e => {tx=e.clientX; ty=e.clientY});
  (function loop(){
    cx+=(tx-cx)*.18; cy+=(ty-cy)*.18;
    cursor.style.left=cx+"px"; cursor.style.top=cy+"px";
    requestAnimationFrame(loop);
  })();
  $$('a,button,.cycle-card,.news article').forEach(el=>{
    el.onmouseenter=()=>cursor.classList.add('big');
    el.onmouseleave=()=>cursor.classList.remove('big');
  });
}

// Timeline interactions
const timelineButtons=$$(".timeline-dots button"), year=$("#year"), yearTitle=$("#yearTitle"), yearText=$("#yearText");
timelineButtons.forEach(b=>b.onclick=()=>{
  timelineButtons.forEach(x=>x.classList.remove('active')); b.classList.add('active');
  [year,yearTitle,yearText].forEach(x=>{if(x)x.style.opacity=0});
  setTimeout(()=>{
    if(year) year.textContent=b.dataset.year;
    if(yearTitle) yearTitle.textContent=b.dataset.title;
    if(yearText) yearText.textContent=b.dataset.text;
    [year,yearTitle,yearText].forEach(x=>{if(x)x.style.opacity=1});
  },220);
});

// Philosophy word rotation on the home page
const words=$$(".changing-word .word"), dots=$$(".statement-progress i");
if(words.length){
  let wi=0;
  setInterval(()=>{
    if(document.hidden)return;
    words[wi].classList.remove('active'); if(dots[wi])dots[wi].classList.remove('active');
    wi=(wi+1)%words.length; words[wi].classList.add('active'); if(dots[wi])dots[wi].classList.add('active');
  },2300);
}

// Small 3D movement on cycle cards
const cards=$$(".cycle-card");
cards.forEach(card=>{
  card.onmousemove=e=>{
    if(innerWidth<900)return;
    const r=card.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
    card.style.transform=`perspective(900px) rotateY(${x/r.width*4}deg) rotateX(${-y/r.height*4}deg)`;
  };
  card.onmouseleave=()=>card.style.transform='';
});
