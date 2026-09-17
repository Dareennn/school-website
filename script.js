/* =========================================================
   BASIC HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [
  ...document.querySelectorAll(selector)
];


/* =========================================================
   LOADER
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


function scrollFX(){

  const y = window.scrollY;


  /* Navbar */

  if(nav){

    nav.classList.toggle(
      "scrolled",
      y > 40
    );

  }


  /* Reading progress */

  if(progress){

    const max =
      document.documentElement.scrollHeight
      - window.innerHeight;

    progress.style.width =
      (
        max > 0
          ? (y / max) * 100
          : 0
      ) + "%";

  }


  /* Parallax */

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


  /* Horizontal facilities */

  const track =
    $(".facility-track");

  const section =
    $(".facilities");


  if(
    track &&
    section &&
    window.innerWidth > 900
  ){

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
                - r.top
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
  { passive:true }
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

  if(href === current){

    link.classList.add("active");

  }

});


/* =========================================================
   CUSTOM CURSOR
========================================================= */

let cx = window.innerWidth / 2;
let cy = window.innerHeight / 2;

let tx = cx;
let ty = cy;

const cursor = $("#cursor");


if(cursor){

  window.addEventListener(
    "mousemove",
    (event) => {

      tx = event.clientX;
      ty = event.clientY;

    }
  );


  (function cursorLoop(){

    cx += (tx - cx) * .18;
    cy += (ty - cy) * .18;

    cursor.style.left =
      cx + "px";

    cursor.style.top =
      cy + "px";

    requestAnimationFrame(
      cursorLoop
    );

  })();


  $$(
    "a, button, .cycle-card, .news article, .cycle-option"
  ).forEach((element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        cursor.classList.add("big");

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        cursor.classList.remove("big");

      }
    );

  });

}


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

        if(element){

          element.style.opacity = 0;

        }

      });


      setTimeout(() => {


        if(year){

          year.textContent =
            button.dataset.year;

        }


        if(yearTitle){

          yearTitle.textContent =
            button.dataset.title;

        }


        if(yearText){

          yearText.textContent =
            button.dataset.text;

        }


        [
          year,
          yearTitle,
          yearText
        ].forEach((element) => {

          if(element){

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


if(words.length){

  let wordIndex = 0;


  setInterval(() => {


    if(document.hidden){

      return;

    }


    words[wordIndex]
      .classList
      .remove("active");


    if(dots[wordIndex]){

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


    if(dots[wordIndex]){

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


      if(window.innerWidth < 900){

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

const applicationArea = document.querySelector("#applicationArea");
const startApplication = document.querySelector("#startApplication");

const applicationSteps =
  [...document.querySelectorAll(".application-step")];

const levelCards =
  [...document.querySelectorAll(".level-card")];

const stepCounter =
  document.querySelector("#stepCounter");

const formProgress =
  document.querySelector("#formProgress");

const selectedLevel =
  document.querySelector("#selectedLevel");

const kindergartenFields =
  document.querySelector("#kindergartenFields");

const primaryFields =
  document.querySelector("#primaryFields");

const primaryRules =
  document.querySelector("#primaryRules");

const prejardinNote =
  document.querySelector("#prejardinNote");

const applicationSuccess =
  document.querySelector("#applicationSuccess");

const agreement =
  document.querySelector("#agreement");

const submitApplication =
  document.querySelector("#submitApplication");


let currentStep = 1;
let selectedAdmissionLevel = null;

const totalSteps = 6;


/* =========================================================
   START APPLICATION
========================================================= */

if (startApplication && applicationArea) {

  startApplication.addEventListener("click", () => {

    applicationArea.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

}


/* =========================================================
   LEVEL SELECTION
========================================================= */

levelCards.forEach(card => {

  card.addEventListener("click", () => {

    levelCards.forEach(item => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");

    selectedAdmissionLevel =
      card.dataset.level;

    updateConditionalFields();

    selectedLevel.style.display = "block";

    const title =
      card.querySelector("h3").textContent;

    selectedLevel.innerHTML = `
      <strong>Niveau sélectionné :</strong>
      ${title}
    `;


    /*
      Automatically move to child information
      after a small delay.
    */

    setTimeout(() => {

      goToStep(2);

    }, 350);

  });

});


/* =========================================================
   CONDITIONAL FIELDS
========================================================= */

function updateConditionalFields() {

  if (!selectedAdmissionLevel) return;


  /*
     Kindergarten fields
     appear for both Pre-jardin and Jardin.
  */

  if (
    selectedAdmissionLevel === "prejardin" ||
    selectedAdmissionLevel === "jardin"
  ) {

    kindergartenFields.classList.add("visible");

  } else {

    kindergartenFields.classList.remove("visible");

  }


  /*
     Primary transfer fields
  */

  if (
    selectedAdmissionLevel === "primaire"
  ) {

    primaryFields.classList.add("visible");
    primaryRules.classList.add("visible");

  } else {

    primaryFields.classList.remove("visible");
    primaryRules.classList.remove("visible");

  }


  /*
     Pre-jardin special rule
  */

  if (
    selectedAdmissionLevel === "prejardin"
  ) {

    prejardinNote.classList.add("visible");

  } else {

    prejardinNote.classList.remove("visible");

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


  applicationSteps.forEach(section => {

    section.classList.remove("active");

    if (
      Number(section.dataset.step) === currentStep
    ) {

      section.classList.add("active");

    }

  });


  /*
     Update progress
  */

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


  /*
     Scroll to application
  */

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
  .forEach(button => {

    button.addEventListener("click", () => {

      /*
         On step 1 the user must choose
         an admission level.
      */

      if (
        currentStep === 1 &&
        !selectedAdmissionLevel
      ) {

        alert(
          "Veuillez sélectionner un niveau d'inscription."
        );

        return;

      }


      /*
         Basic validation for visible
         required fields.
      */

      if (!validateCurrentStep()) {

        return;

      }


      goToStep(currentStep + 1);

    });

  });


/* =========================================================
   PREVIOUS BUTTONS
========================================================= */

document
  .querySelectorAll("[data-prev]")
  .forEach(button => {

    button.addEventListener("click", () => {

      goToStep(currentStep - 1);

    });

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


  for (const field of requiredFields) {

    /*
       Ignore hidden fields.
    */

    if (
      field.offsetParent === null
    ) {

      continue;

    }


    if (!field.value.trim()) {

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

  submitApplication.addEventListener("click", () => {

    if (!agreement.checked) {

      alert(
        "Veuillez confirmer que vous avez lu et compris les informations d'admission."
      );

      return;

    }


    /*
       Prototype submission.

       Later this can be connected to:
       PHP / Laravel / Node.js / MySQL
    */

    applicationSteps.forEach(step => {

      step.style.display = "none";

    });


    applicationSuccess.classList.add("visible");


    if (formProgress) {

      formProgress.style.width = "100%";

    }


    if (stepCounter) {

      stepCounter.textContent =
        "Demande terminée";

    }


    window.scrollTo({

      top:
        applicationArea.offsetTop - 80,

      behavior: "smooth"

    });

  });

}

/* =========================================================
   NOTRE-DAME TODAY CAROUSEL (home)
========================================================= */

const todayCarousel = document.querySelector("#todayCarousel");

if (todayCarousel) {

  const todayTag = document.querySelector("#todayTag");
  const todayTitle = document.querySelector("#todayTitle");
  const todayPrev = document.querySelector("#todayPrev");
  const todayNext = document.querySelector("#todayNext");
  const todayCenterPhoto = todayCarousel.querySelector(
    ".today-slide--center .today-photo-label"
  );

  // Placeholder content only — replace tag/title text (and the
  // .today-photo divs in the HTML) with your real photos & captions.
  const todaySlides = [
    { tag: "SPORT", title: "Un nouveau titre à écrire ici" },
    { tag: "ACADÉMIQUE", title: "Un second titre à écrire ici" },
    { tag: "CULTURE", title: "Un troisième titre à écrire ici" },
    { tag: "SOLIDARITÉ", title: "Un quatrième titre à écrire ici" },
    { tag: "ÉVÉNEMENT", title: "Un cinquième titre à écrire ici" }
  ];

  let todayIndex = 0;

  const renderTodaySlide = () => {

    const caption = todayCarousel.querySelector(".today-caption");

    caption.style.opacity = "0";

    setTimeout(() => {

      const slide = todaySlides[todayIndex];

      todayTag.textContent = slide.tag;
      todayTitle.textContent = slide.title;

      caption.style.opacity = "1";

    }, 220);

  };

  todayPrev.addEventListener("click", () => {

    todayIndex =
      (todayIndex - 1 + todaySlides.length) % todaySlides.length;

    renderTodaySlide();

  });

  todayNext.addEventListener("click", () => {

    todayIndex =
      (todayIndex + 1) % todaySlides.length;

    renderTodaySlide();

  });

}