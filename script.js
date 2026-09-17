const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];


// =====================================================
// LOAD SHARED COMPONENTS
// =====================================================

async function loadComponent(containerId, file) {

  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  try {

    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(
        `Could not load ${file}: ${response.status}`
      );
    }

    container.innerHTML = await response.text();

  } catch (error) {

    console.error(
      `Error loading component ${file}:`,
      error
    );

  }

}


// Load shared HTML files from the components folder
loadComponent(
  "loader-container",
  "components/loader.html"
);

loadComponent(
  "header-container",
  "components/header.html"
);

loadComponent(
  "footer-container",
  "components/footer.html"
);


// =====================================================
// LOADER
// =====================================================

const loader = $("#loader");

if (loader) {

  addEventListener("load", () => {

    setTimeout(() => {

      loader.classList.add("hide");

    }, 1000);

  });

}


// =====================================================
// NAVIGATION + SCROLL PROGRESS
// =====================================================

const nav = $("#nav");
const progress = $("#progress");


function scrollFX() {

  const y = scrollY;


  // Add/remove scrolled class from navigation
  if (nav) {

    nav.classList.toggle(
      "scrolled",
      y > 40
    );

  }


  // Scroll progress bar
  if (progress) {

    const max =
      document.documentElement.scrollHeight -
      innerHeight;

    progress.style.width =
      (max > 0
        ? y / max * 100
        : 0
      ) + "%";

  }


  // Parallax elements
  $$("[data-parallax]").forEach(el => {

    const r =
      el.parentElement.getBoundingClientRect();

    const a =
      (
        innerHeight / 2 -
        (r.top + r.height / 2)
      ) * .035;

    el.style.transform =
      `translate3d(0,${a}px,0) scale(1.04)`;

  });


  // ===================================================
  // FACILITIES HORIZONTAL SCROLL
  // ===================================================

  const tr = $(".facility-track");
  const sec = $(".facilities");


  if (
    tr &&
    sec &&
    innerWidth > 900
  ) {

    const r =
      sec.getBoundingClientRect();

    const denom =
      r.height - innerHeight;


    const p =
      denom > 0
        ? Math.min(
          Math.max(
            (innerHeight - r.top) /
            denom,
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


addEventListener(
  "scroll",
  scrollFX,
  {
    passive: true
  }
);


addEventListener(
  "resize",
  scrollFX
);


scrollFX();


// =====================================================
// CURRENT PAGE NAVIGATION
// =====================================================

const current =
  location.pathname
    .split("/")
    .pop() ||
  "index.html";


// These pages belong to the "Cycles" section
const cyclePages = [
  "maternelle.html",
  "primaire.html",
  "preparatoire.html",
  "secondaire.html"
];


$$(".nav-links a").forEach(a => {

  const href =
    a.getAttribute("href");


  // Normal pages
  if (href === current) {

    a.classList.add("active");

  }


  // Keep "Cycles" active on the four
  // individual cycle pages
  if (
    cyclePages.includes(current) &&
    href === "cycles.html"
  ) {

    a.classList.add("active");

  }

});


// =====================================================
// CUSTOM CURSOR
// =====================================================

let cx = innerWidth / 2;
let cy = innerHeight / 2;

let tx = cx;
let ty = cy;


const cursor = $("#cursor");


if (cursor) {

  // Follow mouse
  addEventListener(
    "mousemove",
    e => {

      tx = e.clientX;
      ty = e.clientY;

    }
  );


  // Smooth cursor movement
  (function loop() {

    cx += (tx - cx) * .18;
    cy += (ty - cy) * .18;


    cursor.style.left =
      cx + "px";

    cursor.style.top =
      cy + "px";


    requestAnimationFrame(loop);

  })();


  // Cursor grows over clickable elements
  $$(
    "a, button, .cycle-card, .cycle-image, .news article"
  ).forEach(el => {

    el.addEventListener(
      "mouseenter",
      () => {

        cursor.classList.add("big");

      }
    );


    el.addEventListener(
      "mouseleave",
      () => {

        cursor.classList.remove("big");

      }
    );

  });

}


// =====================================================
// TIMELINE INTERACTIONS
// =====================================================

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


    // Remove active state
    timelineButtons.forEach(x => {

      x.classList.remove("active");

    });


    // Activate clicked button
    button.classList.add("active");


    // Fade out
    [
      year,
      yearTitle,
      yearText
    ].forEach(x => {

      if (x) {

        x.style.opacity = 0;

      }

    });


    // Update content
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


      // Fade back in
      [
        year,
        yearTitle,
        yearText
      ].forEach(x => {

        if (x) {

          x.style.opacity = 1;

        }

      });


    }, 220);

  };

});


// =====================================================
// PHILOSOPHY WORD ROTATION
// =====================================================

const words =
  $$(".changing-word .word");


const dots =
  $$(".statement-progress i");


if (words.length) {

  let wi = 0;


  setInterval(() => {


    // Don't animate when tab isn't visible
    if (document.hidden) {

      return;

    }


    words[wi]
      .classList
      .remove("active");


    if (dots[wi]) {

      dots[wi]
        .classList
        .remove("active");

    }


    // Move to next word
    wi =
      (wi + 1) %
      words.length;


    words[wi]
      .classList
      .add("active");


    if (dots[wi]) {

      dots[wi]
        .classList
        .add("active");

    }


  }, 2300);

}


// =====================================================
// CYCLE CARD 3D EFFECT
// =====================================================

const cards =
  $$(".cycle-card");


cards.forEach(card => {


  card.addEventListener(
    "mousemove",
    e => {


      // Disable 3D effect on smaller screens
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

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = "";

    }
  );

});