/**
 * Play Page JS
 * Минимальный JS для страниц спектаклей
 */

// Импортируем стили
import '../scss/style.scss';

// Header scroll effect
const header = document.querySelector(".site-header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}
