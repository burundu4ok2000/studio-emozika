
export function initFaq() {
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".faq-question");
        if (!btn) return;

        const item = btn.parentElement;
        const answer = item.querySelector(".faq-answer");
        if (!answer) return;

        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", (!expanded).toString());
        answer.classList.toggle("open");
    });
}
