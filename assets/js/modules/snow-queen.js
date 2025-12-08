
export function initSnowQueen() {
    const snowSection = document.querySelector(".section-snow-queen");
    const snowGrid = snowSection
        ? snowSection.querySelector(".snow-queen-grid")
        : null;

    if (!snowSection || !snowGrid) return;

    // Если IntersectionObserver поддерживается — показываем карточки,
    // когда пользователь докрутил до секции.
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            snowGrid.classList.add("snow-queen-grid--visible");
                        }, 3000); // 3 секунды «чистого» фона
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(snowSection);
    } else {
        // Фоллбек для старых браузеров — показываем сразу
        snowGrid.classList.add("snow-queen-grid--visible");
    }
}
