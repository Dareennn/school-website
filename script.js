const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const loader=$("#loader");addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),1450));
const nav=$("#nav"),progress=$("#progress");
function scrollFX(){
 const y=scrollY;nav.classList.toggle("scrolled",y>80);
 const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(max>0?y/max*100:0)+"%";
 $$("[data-parallax]").forEach(el=>{const r=el.parentElement.getBoundingClientRect();const a=(innerHeight/2-(r.top+r.height/2))*.055;el.style.transform=`translate3d(0,${a}px,0) scale(1.05)`});
 const tr=$(".facility-track"), sec=$(".facilities");
 if(tr&&sec&&innerWidth>900){const r=sec.getBoundingClientRect();const p=Math.min(Math.max((innerHeight-r.top)/(r.height-innerHeight),0),1);const mx=tr.scrollWidth-innerWidth+innerWidth*.08;tr.style.transform=`translate3d(${-p*mx}px,0,0)`}
}
addEventListener("scroll",scrollFX,{passive:true});addEventListener("resize",scrollFX);scrollFX();

const menuButton=$("#menuButton"),menu=$("#menuPanel");
function toggleMenu(open){menuButton.classList.toggle("open",open);menu.classList.toggle("open",open);document.body.classList.toggle("menu-open",open)}
menuButton.onclick=()=>toggleMenu(!menu.classList.contains("open"));$$("[data-menu-link]").forEach(a=>a.onclick=()=>toggleMenu(false));document.addEventListener("keydown",e=>{if(e.key==="Escape")toggleMenu(false)});

let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;const cursor=$("#cursor");
addEventListener("mousemove",e=>{tx=e.clientX;ty=e.clientY});(function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cursor.style.left=cx+"px";cursor.style.top=cy+"px";requestAnimationFrame(loop)})();
$$("a,button,.cycle-card,.news article").forEach(el=>{el.onmouseenter=()=>cursor.classList.add("big");el.onmouseleave=()=>cursor.classList.remove("big")});

const timelineButtons=$$(".timeline-dots button"),year=$("#year"),yearTitle=$("#yearTitle"),yearText=$("#yearText");
timelineButtons.forEach(b=>b.onclick=()=>{timelineButtons.forEach(x=>x.classList.remove("active"));b.classList.add("active");year.style.opacity=0;yearTitle.style.opacity=0;yearText.style.opacity=0;setTimeout(()=>{year.textContent=b.dataset.year;yearTitle.textContent=b.dataset.title;yearText.textContent=b.dataset.text;year.style.opacity=1;yearTitle.style.opacity=1;yearText.style.opacity=1},250)});

const words=$$(".changing-word .word"),dots=$$(".statement-progress i");let wi=0;
setInterval(()=>{if(document.hidden)return;words[wi].classList.remove("active");dots[wi].classList.remove("active");wi=(wi+1)%words.length;words[wi].classList.add("active");dots[wi].classList.add("active")},2300);

const cards=$$(".cycle-card");cards.forEach(card=>{card.onmousemove=e=>{if(innerWidth<900)return;const r=card.getBoundingClientRect(),x=e.clientX/r.width-r.left/r.width-.5,y=e.clientY/r.height-r.top/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*4}deg) rotateX(${-y*4}deg)`};card.onmouseleave=()=>card.style.transform=""});
