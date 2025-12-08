
export function initScroll() {
    const scrollLinks = document.querySelectorAll("[data-scroll-to]");

    if (scrollLinks.length) {
        scrollLinks.forEach((link) => {
            const targetId = link.getAttribute("data-scroll-to");
            if (!targetId) return;

            link.addEventListener("click", (event) => {
                const target = document.getElementById(targetId);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }
}
