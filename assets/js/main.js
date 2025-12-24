
import '../scss/style.scss';

import { initReveal } from './modules/reveal.js';
import { initScroll } from './modules/scroll.js';
import { initAfisha } from './modules/afisha.js';
import { initSnowQueen } from './modules/snow-queen.js';
import { initDocsModal } from './modules/docs-modal.js';
import { initVideoLightbox } from './modules/video-lightbox.js';

// --- HEADER TOGGLE & SCROLL ---
const header = document.querySelector(".site-header");
const headerToggle = document.querySelector("[data-header-toggle]");
const body = document.body;

if (headerToggle && header) {
  headerToggle.addEventListener("click", () => {
    header.classList.toggle("is-open");
    // Toggle body scroll
    if (header.classList.contains("is-open")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  });

  // Close menu when clicking a link
  const navLinks = header.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      body.style.overflow = "";
    });
  });
}

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Базовая инициализация
  initReveal();
  initScroll();
  initSnowQueen();
  initVideoLightbox();
  initDocsModal();

  // 2. Афиша
  initAfisha();
});
