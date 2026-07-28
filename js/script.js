/* ==========================================================================
   VIELADIGIT — script.js
   Tema (claro/escuro), idioma (PT/EN), menu mobile e animação de KPIs
   ========================================================================== */

(function () {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  /* ---------------------------- Tema claro / escuro ---------------------------- */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("vieladigit-theme", theme);
  }

  const savedTheme = localStorage.getItem("vieladigit-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  /* ---------------------------------- Idioma ---------------------------------- */
  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-list]").forEach((el) => {
      const key = el.getAttribute("data-i18n-list");
      const items = dict[key];
      if (Array.isArray(items)) {
        el.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
      }
    });

    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    langToggle.querySelector(".lang-code").textContent = lang.toUpperCase();
    localStorage.setItem("vieladigit-lang", lang);

    renderPortfolio(lang);
  }

  langToggle.addEventListener("click", () => {
    const current = localStorage.getItem("vieladigit-lang") || "pt";
    applyLanguage(current === "pt" ? "en" : "pt");
  });

  /* -------------------------------- Portfólio -------------------------------- */
  const portfolioGrid = document.getElementById("portfolioGrid");
  const modal = document.getElementById("portfolioModal");
  const modalBackdrop = document.getElementById("portfolioModalBackdrop");
  const modalClose = document.getElementById("portfolioModalClose");
  const modalIframe = document.getElementById("portfolioModalIframe");
  const modalTitle = document.getElementById("portfolioModalTitle");

  function openPortfolioModal(title, url) {
    modalTitle.textContent = title;
    modalIframe.src = url;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closePortfolioModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalIframe.src = ""; // para o relatório de continuar carregando em segundo plano
  }

  modalBackdrop.addEventListener("click", closePortfolioModal);
  modalClose.addEventListener("click", closePortfolioModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePortfolioModal();
  });

  function renderPortfolio(lang) {
    if (!portfolioGrid || typeof portfolioItems === "undefined") return;
    const openLabel = (translations[lang] && translations[lang].portfolio_open) || "Ver dashboard";

    portfolioGrid.innerHTML = portfolioItems
      .map((item, index) => {
        const title = lang === "en" && item.titleEn ? item.titleEn : item.title;
        const description = lang === "en" && item.descriptionEn ? item.descriptionEn : item.description;
        const thumb = item.embedUrl
          ? `<iframe class="portfolio-card-iframe" src="${item.embedUrl}" tabindex="-1" title="${title} — preview" loading="lazy"></iframe>`
          : `<span class="portfolio-card-glyph">▤</span>`;
        return `
          <article class="portfolio-card">
            <div class="portfolio-card-thumb" data-index="${index}" role="button" tabindex="0" aria-label="${openLabel}: ${title}">
              ${thumb}
              <span class="portfolio-card-thumb-overlay">${openLabel}</span>
            </div>
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="btn btn-ghost portfolio-open-btn" data-index="${index}">${openLabel}</button>
          </article>
        `;
      })
      .join("");

    portfolioGrid.querySelectorAll(".portfolio-open-btn, .portfolio-card-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = portfolioItems[parseInt(btn.getAttribute("data-index"), 10)];
        const lang = localStorage.getItem("vieladigit-lang") || "pt";
        const title = lang === "en" && item.titleEn ? item.titleEn : item.title;
        openPortfolioModal(title, item.embedUrl);
      });
    });

    portfolioGrid.querySelectorAll(".portfolio-card-thumb").forEach((thumb) => {
      thumb.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          thumb.click();
        }
      });
    });
  }

  /* -------------------------------- Menu mobile -------------------------------- */
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mainNav.classList.remove("open"));
  });

  /* ------------------------------ Contadores KPI ------------------------------- */
  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const kpiNumbers = document.querySelectorAll(".kpi-number");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  kpiNumbers.forEach((el) => observer.observe(el));

  /* ----------------------------------- Rodapé ----------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* --------------------------- Aplicar idioma inicial --------------------------- */
  const savedLang = localStorage.getItem("vieladigit-lang") || "pt";
  applyLanguage(savedLang);
})();
