const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];




const loader = $("#loader");

if (loader) {
  addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1000);
  });
}




const nav = $("#nav");
const progress = $("#progress");

function scrollFX() {

  const y = scrollY;

  if (nav) {
    nav.classList.toggle("scrolled", y > 40);
  }

  if (progress) {

    const max =
      document.documentElement.scrollHeight - innerHeight;

    progress.style.width =
      (max > 0 ? y / max * 100 : 0) + "%";
  }



  $$("[data-parallax]").forEach(el => {

    const r =
      el.parentElement.getBoundingClientRect();

    const a =
      (innerHeight / 2 - (r.top + r.height / 2)) * .035;

    el.style.transform =
      `translate3d(0,${a}px,0) scale(1.04)`;
  });


  const tr = $(".facility-track");
  const sec = $(".facilities");

  if (tr && sec && innerWidth > 900) {

    const r =
      sec.getBoundingClientRect();

    const denom =
      r.height - innerHeight;

    const p =
      denom > 0
        ? Math.min(
          Math.max(
            (innerHeight - r.top) / denom,
            0
          ),
          1
        )
        : 0;

    const mx =
      Math.max(
        tr.scrollWidth -
        innerWidth +
        innerWidth * .08,
        0
      );

    tr.style.transform =
      `translate3d(${-p * mx}px,0,0)`;
  }
}

addEventListener("scroll", scrollFX, {
  passive: true
});

addEventListener("resize", scrollFX);

scrollFX();




const current =
  location.pathname.split("/").pop() || "index.html";

$$(".nav-links a").forEach(a => {

  const href =
    a.getAttribute("href");

  if (href === current) {
    a.classList.add("active");
  }

});




let cx = innerWidth / 2;
let cy = innerHeight / 2;

let tx = cx;
let ty = cy;

const cursor = $("#cursor");

if (cursor) {

  addEventListener("mousemove", e => {

    tx = e.clientX;
    ty = e.clientY;

  });


  (function loop() {

    cx += (tx - cx) * .18;
    cy += (ty - cy) * .18;

    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";

    requestAnimationFrame(loop);

  })();


  $$(
    "a, button, .cycle-card, .cycle-image, .news article"
  ).forEach(el => {

    el.addEventListener("mouseenter", () => {
      cursor.classList.add("big");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("big");
    });

  });

}




const timelineButtons =
  $$(".timeline-dots button");

const year =
  $("#year");

const yearTitle =
  $("#yearTitle");

const yearText =
  $("#yearText");


timelineButtons.forEach(button => {

  button.onclick = () => {

    timelineButtons.forEach(x => {
      x.classList.remove("active");
    });

    button.classList.add("active");


    [year, yearTitle, yearText].forEach(x => {

      if (x) {
        x.style.opacity = 0;
      }

    });


    setTimeout(() => {

      if (year) {
        year.textContent =
          button.dataset.year;
      }

      if (yearTitle) {
        yearTitle.textContent =
          button.dataset.title;
      }

      if (yearText) {
        yearText.textContent =
          button.dataset.text;
      }


      [year, yearTitle, yearText].forEach(x => {

        if (x) {
          x.style.opacity = 1;
        }

      });

    }, 220);

  };

});




const words =
  $$(".changing-word .word");

const dots =
  $$(".statement-progress i");


if (words.length) {

  let wi = 0;

  setInterval(() => {

    if (document.hidden) {
      return;
    }


    words[wi].classList.remove("active");

    if (dots[wi]) {
      dots[wi].classList.remove("active");
    }


    wi =
      (wi + 1) % words.length;


    words[wi].classList.add("active");

    if (dots[wi]) {
      dots[wi].classList.add("active");
    }

  }, 2300);

}




const cards =
  $$(".cycle-card");


cards.forEach(card => {

  card.addEventListener("mousemove", e => {

    if (innerWidth < 900) {
      return;
    }


    const r =
      card.getBoundingClientRect();


    const x =
      e.clientX -
      r.left -
      r.width / 2;


    const y =
      e.clientY -
      r.top -
      r.height / 2;


    card.style.transform =
      `perspective(900px)
       rotateY(${x / r.width * 4}deg)
       rotateX(${-y / r.height * 4}deg)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});