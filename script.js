/* =========================================================
   BASIC HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [
  ...document.querySelectorAll(selector)
];




const headerContainer = $("#header-container");
const footerContainer = $("#footer-container");
const loaderContainer = $("#loader-container");


/* =========================================================
   HEADER
========================================================= */

if (headerContainer) {

  headerContainer.innerHTML = `
    <header class="nav" id="nav">

      <a class="brand" href="index.html">

        <span>NOTRE-DAME</span>

        <em>DE LA DÉLIVRANDE · Al-Daher</em>

      </a>


      <nav class="nav-links" aria-label="Navigation principale">


        <!-- =================================================
             ACCUEIL
        ================================================== -->

        <a href="index.html">
          Accueil
        </a>


        <!-- =================================================
             HISTOIRE DROPDOWN
        ================================================== -->

        <div class="nav-dropdown">

          <a
            href="histoire.html"
            class="nav-dropdown-toggle"
          >

            Histoire

            <span
              class="nav-arrow"
              aria-hidden="true"
            >⌄</span>

          </a>


          <div class="nav-dropdown-menu">

            <a href="histoire-origines.html">
              Aux origines
            </a>

            <a href="histoire-egypte.html">
              Délivrande en Égypte
            </a>

            <a href="histoire-ecole.html">
              L'école d'Al-Daher
            </a>

            <a href="histoire-batiments.html">
              Les bâtiments
            </a>

            <a href="histoire-directrices.html">
              Les directrices
            </a>

            <a href="histoire-uniformes.html">
              Les uniformes
            </a>

            <a href="histoire-generations.html">
              Les générations
            </a>

          </div>

        </div>


        <!-- =================================================
             CYCLES DROPDOWN
        ================================================== -->

        <div class="nav-dropdown">

          <a
            href="cycles.html"
            class="nav-dropdown-toggle"
          >

            Cycles

            <span
              class="nav-arrow"
              aria-hidden="true"
            >⌄</span>

          </a>


          <div class="nav-dropdown-menu">

            <a href="maternelle.html">
              Maternelle
            </a>

            <a href="primaire.html">
              Primaire
            </a>

            <a href="preparatoire.html">
              Préparatoire
            </a>

            <a href="secondaire.html">
              Secondaire
            </a>

          </div>

        </div>


        <!-- =================================================
             OTHER PAGES
        ================================================== -->

        <a href="vie.html">
          Vie de l'école
        </a>

        <a href="actualites.html">
          Actualités
        </a>

        <a href="contact.html">
          Contact
        </a>


      </nav>


      <!-- =================================================
           ADMISSION
      ================================================== -->

      <div class="nav-right">

        <a
          class="nav-admission"
          href="admission.html"
        >
          Admission
        </a>

      </div>


    </header>
  `;

}


/* =========================================================
   FOOTER
========================================================= */

if (footerContainer) {

  footerContainer.innerHTML = `
    <footer>

      <div class="footer-top">

        <div class="footer-brand">

          <span>NOTRE-DAME</span>

          <em>
            DE LA DÉLIVRANDE · Al-Daher
          </em>

        </div>


        <div class="footer-tag">

          Joie.<br>
          Bonheur.<br>
          Servir.

        </div>


        <div class="footer-address">

          Daher, 5 Habib Shalaby,
          Berket AZ Zatli,
          Bab El Sharia,
          Gouvernorat du Caire

          <br>

          (02) 2415 5192

        </div>

      </div>


      <div class="footer-bottom">

        <span>
          © 2026 Notre-Dame de la Délivrande
        </span>


        <div>

          <a href="#">
            Facebook
          </a>

          <a href="#">
            YouTube
          </a>

          <a href="vie.html">
            Galerie
          </a>

        </div>


        <span>
          Prototype
        </span>

      </div>

    </footer>
  `;

}


/* =========================================================
   LOADER
========================================================= */

if (loaderContainer) {

  loaderContainer.innerHTML = `
    <div class="loader" id="loader">

      <div class="loader-inner">

        <div class="school-logo">

          <img
            src="images/notre_dame_school_logo.jpg"
            alt="Notre-Dame de la Délivrande logo"
          >

        </div>


        <div class="school-name">
          NOTRE-DAME DE LA DÉLIVRANDE
        </div>


        <strong>
          Al-Daher
        </strong>


        <div class="loader-line">

          <i></i>

        </div>


        <small>
          DEPUIS 1921 · LE CAIRE
        </small>

      </div>

    </div>
  `;

}


/* =========================================================
   LOADER ANIMATION
========================================================= */

const loader = $("#loader");

if (loader) {

  window.addEventListener("load", () => {

    setTimeout(() => {

      loader.classList.add("hide");

    }, 1000);

  });

}


/* =========================================================
   NAVIGATION + SCROLL
========================================================= */

const nav = $("#nav");

const progress = $("#progress");


function scrollFX() {

  const y = window.scrollY;


  /* -------------------------------------------------------
     NAVBAR
  ------------------------------------------------------- */

  if (nav) {

    nav.classList.toggle(
      "scrolled",
      y > 40
    );

  }


  /* -------------------------------------------------------
     READING PROGRESS
  ------------------------------------------------------- */

  if (progress) {

    const max =
      document.documentElement.scrollHeight
      -
      window.innerHeight;


    progress.style.width =
      (
        max > 0
          ? (y / max) * 100
          : 0
      ) + "%";

  }


  /* -------------------------------------------------------
     PARALLAX
  ------------------------------------------------------- */

  $$("[data-parallax]").forEach((el) => {

    const r =
      el.parentElement.getBoundingClientRect();


    const a =
      (
        window.innerHeight / 2
        -
        (
          r.top
          +
          r.height / 2
        )
      ) * .035;


    el.style.transform =
      `translate3d(0,${a}px,0) scale(1.04)`;

  });


  /* -------------------------------------------------------
     HORIZONTAL FACILITIES
  ------------------------------------------------------- */

  const track =
    $(".facility-track");

  const section =
    $(".facilities");


  if (
    track &&
    section &&
    window.innerWidth > 900
  ) {

    const r =
      section.getBoundingClientRect();


    const denominator =
      r.height - window.innerHeight;


    const p =
      denominator > 0
        ? Math.min(
          Math.max(
            (
              window.innerHeight
              -
              r.top
            ) / denominator,
            0
          ),
          1
        )
        : 0;


    const maxX =
      Math.max(
        track.scrollWidth
        -
        window.innerWidth
        +
        window.innerWidth * .08,
        0
      );


    track.style.transform =
      `translate3d(${-p * maxX}px,0,0)`;

  }

}


window.addEventListener(
  "scroll",
  scrollFX,
  { passive: true }
);


window.addEventListener(
  "resize",
  scrollFX
);


scrollFX();


/* =========================================================
   CURRENT NAVIGATION
========================================================= */

const current =
  location.pathname.split("/").pop()
  ||
  "index.html";


$$(".nav-links a").forEach((link) => {

  const href =
    link.getAttribute("href");


  if (href === current) {

    link.classList.add("active");

  }

});


/* =========================================================
   NAVIGATION DROPDOWNS
   Handles BOTH:
   - Histoire
   - Cycles
========================================================= */

const navDropdowns =
  $$(".nav-dropdown");


navDropdowns.forEach((dropdown) => {

  const toggle =
    dropdown.querySelector(
      ".nav-dropdown-toggle"
    );


  const menu =
    dropdown.querySelector(
      ".nav-dropdown-menu"
    );


  if (!toggle || !menu) {
    return;
  }


  /* -------------------------------------------------------
     CLICK / TAP TO OPEN
  ------------------------------------------------------- */

  toggle.addEventListener("click", (event) => {

    /*
       If the dropdown is closed:

       - prevent navigation
       - open dropdown
       - close other dropdowns

       If it is already open:

       - allow the normal link to work
       - therefore Histoire → histoire.html
       - or Cycles → cycles.html
    */

    if (!dropdown.classList.contains("open")) {

      event.preventDefault();


      navDropdowns.forEach((otherDropdown) => {

        if (
          otherDropdown !== dropdown
        ) {

          otherDropdown.classList.remove(
            "open"
          );

        }

      });


      dropdown.classList.add("open");

    }

  });


  /* -------------------------------------------------------
     KEYBOARD ACCESSIBILITY
  ------------------------------------------------------- */

  toggle.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        toggle.click();

      }

    }
  );


  /* -------------------------------------------------------
     DROPDOWN LINKS
  ------------------------------------------------------- */

  menu.addEventListener(
    "click",
    (event) => {

      const submenuLink =
        event.target.closest("a");


      if (submenuLink) {

        dropdown.classList.remove(
          "open"
        );

      }

    }
  );

});


/* ---------------------------------------------------------
   CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
--------------------------------------------------------- */

document.addEventListener(
  "click",
  (event) => {

    navDropdowns.forEach((dropdown) => {

      if (
        !dropdown.contains(event.target)
      ) {

        dropdown.classList.remove(
          "open"
        );

      }

    });

  }
);


/* ---------------------------------------------------------
   CLOSE DROPDOWNS WITH ESCAPE
--------------------------------------------------------- */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }


    navDropdowns.forEach((dropdown) => {

      dropdown.classList.remove(
        "open"
      );

    });

  }
);


/* =========================================================
   TIMELINE
========================================================= */

const timelineButtons =
  $$(".timeline-dots button");


const year =
  $("#year");


const yearTitle =
  $("#yearTitle");


const yearText =
  $("#yearText");


timelineButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      timelineButtons.forEach((item) => {

        item.classList.remove("active");

      });


      button.classList.add("active");


      [
        year,
        yearTitle,
        yearText
      ].forEach((element) => {

        if (element) {

          element.style.opacity = 0;

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


        [
          year,
          yearTitle,
          yearText
        ].forEach((element) => {

          if (element) {

            element.style.opacity = 1;

          }

        });

      }, 220);

    }
  );

});


/* =========================================================
   PHILOSOPHY WORD ROTATION
========================================================= */

const words =
  $$(".changing-word .word");


const dots =
  $$(".statement-progress i");


if (words.length) {

  let wordIndex = 0;


  setInterval(() => {

    if (document.hidden) {
      return;
    }


    words[wordIndex]
      .classList
      .remove("active");


    if (dots[wordIndex]) {

      dots[wordIndex]
        .classList
        .remove("active");

    }


    wordIndex =
      (wordIndex + 1)
      % words.length;


    words[wordIndex]
      .classList
      .add("active");


    if (dots[wordIndex]) {

      dots[wordIndex]
        .classList
        .add("active");

    }

  }, 2300);

}


/* =========================================================
   CYCLE CARD 3D MOVEMENT
========================================================= */

const cards =
  $$(".cycle-card");


cards.forEach((card) => {


  card.addEventListener(
    "mousemove",
    (event) => {

      if (window.innerWidth < 900) {
        return;
      }


      const r =
        card.getBoundingClientRect();


      const x =
        event.clientX
        -
        r.left
        -
        r.width / 2;


      const y =
        event.clientY
        -
        r.top
        -
        r.height / 2;


      card.style.transform =
        `
        perspective(900px)
        rotateY(${x / r.width * 4}deg)
        rotateX(${-y / r.height * 4}deg)
        `;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = "";

    }
  );

});


/* =========================================================
   ADMISSION APPLICATION FLOW
========================================================= */

const applicationArea =
  document.querySelector(
    "#applicationArea"
  );


const startApplication =
  document.querySelector(
    "#startApplication"
  );


const applicationSteps =
  [
    ...document.querySelectorAll(
      ".application-step"
    )
  ];


const levelCards =
  [
    ...document.querySelectorAll(
      ".level-card"
    )
  ];


const stepCounter =
  document.querySelector(
    "#stepCounter"
  );


const formProgress =
  document.querySelector(
    "#formProgress"
  );


const selectedLevel =
  document.querySelector(
    "#selectedLevel"
  );


const kindergartenFields =
  document.querySelector(
    "#kindergartenFields"
  );


const primaryFields =
  document.querySelector(
    "#primaryFields"
  );


const primaryRules =
  document.querySelector(
    "#primaryRules"
  );


const prejardinNote =
  document.querySelector(
    "#prejardinNote"
  );


const applicationSuccess =
  document.querySelector(
    "#applicationSuccess"
  );


const agreement =
  document.querySelector(
    "#agreement"
  );


const submitApplication =
  document.querySelector(
    "#submitApplication"
  );


let currentStep = 1;

let selectedAdmissionLevel = null;

const totalSteps = 6;


/* =========================================================
   START APPLICATION
========================================================= */

if (
  startApplication &&
  applicationArea
) {

  startApplication.addEventListener(
    "click",
    () => {

      applicationArea.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

}


/* =========================================================
   LEVEL SELECTION
========================================================= */

levelCards.forEach((card) => {

  card.addEventListener(
    "click",
    () => {

      levelCards.forEach((item) => {

        item.classList.remove(
          "selected"
        );

      });


      card.classList.add(
        "selected"
      );


      selectedAdmissionLevel =
        card.dataset.level;


      updateConditionalFields();


      if (selectedLevel) {

        selectedLevel.style.display =
          "block";


        const title =
          card.querySelector("h3");


        selectedLevel.innerHTML = `
          <strong>
            Niveau sélectionné :
          </strong>
          ${title ? title.textContent : ""}
        `;

      }


      setTimeout(() => {

        goToStep(2);

      }, 350);

    }
  );

});


/* =========================================================
   CONDITIONAL FIELDS
========================================================= */

function updateConditionalFields() {

  if (!selectedAdmissionLevel) {
    return;
  }


  /* -------------------------------------------------------
     KINDERGARTEN
  ------------------------------------------------------- */

  if (
    selectedAdmissionLevel === "prejardin" ||
    selectedAdmissionLevel === "jardin"
  ) {

    if (kindergartenFields) {

      kindergartenFields.classList.add(
        "visible"
      );

    }

  } else {

    if (kindergartenFields) {

      kindergartenFields.classList.remove(
        "visible"
      );

    }

  }


  /* -------------------------------------------------------
     PRIMARY TRANSFER
  ------------------------------------------------------- */

  if (
    selectedAdmissionLevel === "primaire"
  ) {

    if (primaryFields) {

      primaryFields.classList.add(
        "visible"
      );

    }


    if (primaryRules) {

      primaryRules.classList.add(
        "visible"
      );

    }

  } else {

    if (primaryFields) {

      primaryFields.classList.remove(
        "visible"
      );

    }


    if (primaryRules) {

      primaryRules.classList.remove(
        "visible"
      );

    }

  }


  /* -------------------------------------------------------
     PRE-JARDIN
  ------------------------------------------------------- */

  if (
    selectedAdmissionLevel === "prejardin"
  ) {

    if (prejardinNote) {

      prejardinNote.classList.add(
        "visible"
      );

    }

  } else {

    if (prejardinNote) {

      prejardinNote.classList.remove(
        "visible"
      );

    }

  }

}


/* =========================================================
   GO TO STEP
========================================================= */

function goToStep(step) {

  if (step < 1) {
    step = 1;
  }


  if (step > totalSteps) {
    step = totalSteps;
  }


  currentStep = step;


  applicationSteps.forEach(
    (section) => {

      section.classList.remove(
        "active"
      );


      if (
        Number(section.dataset.step)
        ===
        currentStep
      ) {

        section.classList.add(
          "active"
        );

      }

    }
  );


  /* -------------------------------------------------------
     PROGRESS
  ------------------------------------------------------- */

  const percentage =
    (currentStep / totalSteps) * 100;


  if (formProgress) {

    formProgress.style.width =
      percentage + "%";

  }


  if (stepCounter) {

    stepCounter.textContent =
      `Étape ${currentStep} / ${totalSteps}`;

  }


  /* -------------------------------------------------------
     SCROLL
  ------------------------------------------------------- */

  if (applicationArea) {

    window.scrollTo({

      top:
        applicationArea.offsetTop - 90,

      behavior: "smooth"

    });

  }

}


/* =========================================================
   NEXT BUTTONS
========================================================= */

document
  .querySelectorAll("[data-next]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        if (
          currentStep === 1 &&
          !selectedAdmissionLevel
        ) {

          alert(
            "Veuillez sélectionner un niveau d'inscription."
          );

          return;

        }


        if (
          !validateCurrentStep()
        ) {

          return;

        }


        goToStep(
          currentStep + 1
        );

      }
    );

  });


/* =========================================================
   PREVIOUS BUTTONS
========================================================= */

document
  .querySelectorAll("[data-prev]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        goToStep(
          currentStep - 1
        );

      }
    );

  });


/* =========================================================
   BASIC FORM VALIDATION
========================================================= */

function validateCurrentStep() {

  const activeStep =
    document.querySelector(
      `.application-step[data-step="${currentStep}"]`
    );


  if (!activeStep) {
    return true;
  }


  const requiredFields =
    activeStep.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );


  for (
    const field of requiredFields
  ) {

    if (
      field.offsetParent === null
    ) {

      continue;

    }


    if (
      !field.value.trim()
    ) {

      field.focus();


      alert(
        "Veuillez remplir tous les champs obligatoires (*)."
      );


      return false;

    }

  }


  return true;

}


/* =========================================================
   SUBMIT APPLICATION
========================================================= */

if (submitApplication) {

  submitApplication.addEventListener(
    "click",
    () => {

      if (
        !agreement ||
        !agreement.checked
      ) {

        alert(
          "Veuillez confirmer que vous avez lu et compris les informations d'admission."
        );

        return;

      }


      applicationSteps.forEach(
        (step) => {

          step.style.display =
            "none";

        }
      );


      if (applicationSuccess) {

        applicationSuccess.classList.add(
          "visible"
        );

      }


      if (formProgress) {

        formProgress.style.width =
          "100%";

      }


      if (stepCounter) {

        stepCounter.textContent =
          "Demande terminée";

      }


      if (applicationArea) {

        window.scrollTo({

          top:
            applicationArea.offsetTop - 80,

          behavior: "smooth"

        });

      }

    }
  );

}


/* =========================================================
   NOTRE-DAME TODAY CAROUSEL — HOME
========================================================= */

const todayCarousel =
  document.querySelector(
    "#todayCarousel"
  );


if (todayCarousel) {

  const todayTag =
    document.querySelector(
      "#todayTag"
    );


  const todayTitle =
    document.querySelector(
      "#todayTitle"
    );


  const todayPrev =
    document.querySelector(
      "#todayPrev"
    );


  const todayNext =
    document.querySelector(
      "#todayNext"
    );


  const todaySlides = [

    {
      tag: "SPORT",
      title: "Un nouveau titre à écrire ici"
    },

    {
      tag: "ACADÉMIQUE",
      title: "Un second titre à écrire ici"
    },

    {
      tag: "CULTURE",
      title: "Un troisième titre à écrire ici"
    },

    {
      tag: "SOLIDARITÉ",
      title: "Un quatrième titre à écrire ici"
    },

    {
      tag: "ÉVÉNEMENT",
      title: "Un cinquième titre à écrire ici"
    }

  ];


  let todayIndex = 0;


  const renderTodaySlide = () => {

    const caption =
      todayCarousel.querySelector(
        ".today-caption"
      );


    if (caption) {

      caption.style.opacity = "0";

    }


    setTimeout(() => {

      const slide =
        todaySlides[todayIndex];


      if (todayTag) {

        todayTag.textContent =
          slide.tag;

      }


      if (todayTitle) {

        todayTitle.textContent =
          slide.title;

      }


      if (caption) {

        caption.style.opacity =
          "1";

      }

    }, 220);

  };


  if (todayPrev) {

    todayPrev.addEventListener(
      "click",
      () => {

        todayIndex =
          (
            todayIndex
            -
            1
            +
            todaySlides.length
          )
          %
          todaySlides.length;


        renderTodaySlide();

      }
    );

  }


  if (todayNext) {

    todayNext.addEventListener(
      "click",
      () => {

        todayIndex =
          (
            todayIndex
            +
            1
          )
          %
          todaySlides.length;


        renderTodaySlide();

      }
    );

  }

}