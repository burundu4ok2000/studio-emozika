
import '../scss/style.scss';

import { initReveal } from './modules/reveal.js';
import { initStats } from './modules/stats.js';
import { initScroll } from './modules/scroll.js';
import { initJourney } from './modules/journey.js';
import { initStudioTimeline } from './modules/studio-timeline.js';
import { initAfisha } from './modules/afisha.js';
import { initFilms } from './modules/films.js';
import { initGallery } from './modules/gallery.js';
import { initFaq } from './modules/faq.js';
import { initPeople } from './modules/people.js';
import { initVideoReviewsSection } from './modules/reviews.js';
import { initBranches } from './modules/branches.js';
import { initAbonements } from './modules/abonements.js';
import { initAwards } from './modules/awards.js';
import { initSnowQueen } from './modules/snow-queen.js';
import { initDocsModal } from './modules/docs-modal.js';

import { initHeroCarousel } from './modules/hero-carousel.js';
import { initVideoLightbox } from './modules/video-lightbox.js';

document.addEventListener("DOMContentLoaded", () => {
  // 1. Базовая инициализация и эффекты
  initReveal();
  initStats();
  initScroll();
  initFaq();
  initSnowQueen();
  // initHeroCarousel(); // Carousel removed - replaced with minimalist hero
  initVideoLightbox();
  initDocsModal();

  // 2. Студия и путешествие
  initJourney();
  initStudioTimeline();

  // 3. Афиша и Фильмы
  initAfisha();
  initFilms();

  // 4. Галерея
  initGallery();

  // 5. Люди театра
  initPeople();

  // 6. Отзывы
  initVideoReviewsSection();

  // 7. Филиалы
  initBranches();

  // 8. Абонементы
  initAbonements();

  // 9. Награды
  initAwards();

  // 10. Кастинг: временно отключаем скачок страницы по кнопке подписки
  const castingNewsButton = document.querySelector(
    ".section-casting .casting-btn-secondary"
  );

  if (castingNewsButton) {
    castingNewsButton.addEventListener("click", (event) => {
      // пока нет отдельной страницы/формы — не прыгаем наверх
      event.preventDefault();
    });
  }
});
