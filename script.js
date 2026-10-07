// =========================================================
// BIOGRAFÍA MD3
// Archivo: script.js
// =========================================================

// ---------- Año automático del footer ----------
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


// ---------- Menú responsive ----------
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    const icon = menuButton.querySelector(".material-symbols-outlined");

    if (icon) {
      icon.textContent = isOpen ? "close" : "menu";
    }
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");

      const icon = menuButton.querySelector(".material-symbols-outlined");

      if (icon) {
        icon.textContent = "menu";
      }
    });
  });
}


// ---------- Tema claro / oscuro ----------
const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("bio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeIcon.textContent = "light_mode";
}

if (themeButton && themeIcon) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
    localStorage.setItem("bio-theme", isDark ? "dark" : "light");
  });
}


// ---------- Resaltar sección actual en el menú ----------
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => observer.observe(section));
