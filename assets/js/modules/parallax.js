export function initHeroParallax() {
    const heroSection = document.querySelector('.hero');
    const collage = document.querySelector('.hero-collage');

    if (!heroSection || !collage) return;

    heroSection.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = heroSection;
        const { clientX: x, clientY: y } = e;

        // Calculate center-based coordinates (-1 to 1)
        const xPos = (x / width - 0.5) * 2;
        const yPos = (y / height - 0.5) * 2;

        // Rotation intensity
        const tiltX = yPos * -15; // Invert Y for intuitive tilt
        const tiltY = xPos * 15;

        // Apply transform to the container
        collage.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

        // Parallax for inner images (optional, if we query them)
        // const mainImage = collage.querySelector('.hero-collage__main');
        // mainImage.style.transform = `translateZ(50px)`;
    });

    // Reset on mouse leave
    heroSection.addEventListener('mouseleave', () => {
        collage.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
}
