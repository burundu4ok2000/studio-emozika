
export const isReducedMotion = () => {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
