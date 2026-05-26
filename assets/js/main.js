/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /*console.log('MAIN.JS CARREGADO');
   */
  /**ano auto increment */
  document.addEventListener("DOMContentLoaded", function () {
    const ano = document.getElementById("ano");
    if (ano) {
      ano.textContent = new Date().getFullYear();
    }
  });

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**frase para utilizar no eusou/estou */
  window.addEventListener("load", () => {
    const frases = [
      "estudante de tecnologia",
      "desenvolvedor em formação",
      "apaixonado por aprender",
      "em busca da primeira oportunidade",
      "determinado",
    ];

    const prefixo = document.getElementById("prefixo");
    const typedEl = document.getElementById("typed");

    if (typedEl && typeof Typed !== "undefined") {
      new Typed("#typed", {
        strings: frases,
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        preStringTyped: (arrayPos) => {
          prefixo.textContent =
            frases[arrayPos] === "em busca da primeira oportunidade"
              ? "Eu estou "
              : "Eu sou ";
        },
      });
    } else {
      console.error("Typed ou elemento #typed não encontrado");
    }
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }
  fetch("/portifolio/forms/counter.php")
    .then((res) => res.json())
    .then((data) => {
      console.log("DADOS:", data);

      document.getElementById("horas-estudo").textContent = data.horas_estudo;
      document.getElementById("horas-trabalho").textContent =
        data.horas_trabalho;
      document.getElementById("horas-pratica").textContent = data.horas_pratica;
      document.getElementById("horas-atividade").textContent =
        data.horas_atividade;
    })
    .catch((err) => console.error("Erro:", err));

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const loading = document.getElementById("form-loading");
    const success = document.getElementById("form-success");
    const error = document.getElementById("form-error");
    const button = form.querySelector("button");

    loading.style.display = "block";
    success.style.display = "none";
    error.style.display = "none";
    button.disabled = true;

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      loading.style.display = "none";
      button.disabled = false;

      if (response.ok) {
        success.style.display = "block";
        form.reset();
      } else {
        error.style.display = "block";
      }
    } catch {
      loading.style.display = "none";
      button.disabled = false;
      error.style.display = "block";
    }
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */

  /**
   * Initiate Pure Counter
   */

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        },
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false,
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim(),
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

/* parte logica do contador de horas*/
/*implementado pois github não interpreta php*/

const hoje = new Date();

/* Estudos */
const dataInicioEstudo = new Date("2024-01-01");
const diasEstudo = Math.floor(
  (hoje - dataInicioEstudo) / (1000 * 60 * 60 * 24),
);

const horasEstudo = diasEstudo * 5;

/* Trabalho */
const dataInicioWork = new Date("2025-09-23");
const diasWork = Math.floor((hoje - dataInicioWork) / (1000 * 60 * 60 * 24));

const horasWork = diasWork * 8;

/* Atualiza HTML */
document.getElementById("horas-estudo").textContent = horasEstudo;
document.getElementById("horas-trabalho").textContent = horasWork;
document.getElementById("horas-pratica").textContent = 532;
document.getElementById("horas-atividade").textContent = 6;
