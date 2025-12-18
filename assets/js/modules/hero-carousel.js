export function initHeroCarousel() {
    const orbitContainer = document.querySelector('.hero-orbit__ring');
    const scene = document.querySelector('.hero-orbit__scene');
    const showTitleEl = document.querySelector('[data-current-show-title]');
    const prevButton = document.querySelector('.show-nav__arrow--prev');
    const nextButton = document.querySelector('.show-nav__arrow--next');

    if (!orbitContainer || !scene) return;

    // --- SHOW DATA & STATE ---
    let shows = [];
    let currentShowIndex = 0;
    let isTransitioning = false;

    // --- CONFIG (COVERFLOW MODE) ---
    let isMobile = window.innerWidth < 768;
    const cardCount = 10;

    // Coverflow Geometry
    // Coverflow Geometry
    const getCardSpacing = () => isMobile ? 180 : 300; // Tighter spacing for fan effect
    const getRotationAngle = () => isMobile ? 45 : 45; // Stronger rotation
    const getSideScale = () => isMobile ? 0.7 : 0.85;
    const getSideOffset = () => isMobile ? 80 : 100;

    let currentIndex = 0; // Current centered card index
    let targetIndex = 0;   // Target card to center

    // Interaction State
    let isDragging = false;
    let startX = 0;
    let dragOffset = 0;
    let lastX = 0;

    // Generated Elements
    const cells = [];

    // 1. Load Show Data
    async function loadShowData() {
        try {
            const response = await fetch('assets/data/show-carousel.json');
            const data = await response.json();
            shows = data.shows || [];

            if (shows.length > 0) {
                await initCarousel();
            } else {
                console.warn('No shows data loaded');
            }
        } catch (err) {
            console.error('Failed to load show carousel data:', err);
        }
    }

    // 2. Initialize Carousel
    async function initCarousel() {
        const currentShow = shows[currentShowIndex];

        // Use actual number of photos instead of fixed cardCount
        const cardCount = currentShow.photos.length;

        // Create cards (no theta needed for coverflow)
        for (let i = 0; i < cardCount; i++) {
            const card = document.createElement('div');
            card.className = 'orbit-card';

            const photoIndex = i % currentShow.photos.length;
            const photoData = currentShow.photos[photoIndex];

            // Check if it's a video or image
            const isVideo = typeof photoData === 'object' && photoData.type === 'video';

            if (isVideo) {
                // Create video iframe
                const videoWrapper = document.createElement('div');
                videoWrapper.className = 'orbit-card-video';
                videoWrapper.style.cssText = 'width: 100%; height: 100%; position: relative; overflow: hidden; border-radius: 16px;';

                const iframe = document.createElement('iframe');
                iframe.src = photoData.url;
                iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;';
                iframe.allowFullscreen = true;
                iframe.frameBorder = '0';
                iframe.style.cssText = 'width: 100%; height: 100%; border: none; display: block;';

                videoWrapper.appendChild(iframe);
                card.appendChild(videoWrapper);

                cells.push({ el: card, content: videoWrapper, isVideo: true });
            } else {
                // Create image
                const img = document.createElement('img');
                img.src = photoData;
                img.alt = currentShow.title;
                img.draggable = false;

                card.appendChild(img);
                cells.push({ el: card, img: img, isVideo: false });
            }

            orbitContainer.appendChild(card);
        }

        // Update title
        if (showTitleEl) {
            showTitleEl.textContent = currentShow.title;
        }

        // Wire up navigation - move between cards
        if (prevButton) {
            prevButton.addEventListener('click', () => navigateCards(-1));
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => navigateCards(1));
        }

        // Start render loop
        render();
    }

    // 3. Navigate Shows
    async function navigateShows(direction) {
        if (isTransitioning || shows.length <= 1) return;

        isTransitioning = true;

        // Calculate new index with wrapping
        let newIndex = currentShowIndex + direction;
        if (newIndex < 0) newIndex = shows.length - 1;
        if (newIndex >= shows.length) newIndex = 0;

        await switchShow(newIndex);

        isTransitioning = false;
    }

    // 3b. Navigate Cards (Coverflow)
    function navigateCards(direction) {
        // Just increment target, render loop handles wrapping math
        targetIndex += direction;

        // Optional: Keep targetIndex within reasonable bounds to prevent float precision issues over long time
        // but for now, simple increment is finest for the circular math in render()
        // verify modulo math handles negative numbers correctly in JS? 
        // JS: -1 % 10 = -1. We handle this in render.
    }

    // 4. Switch Show
    async function switchShow(newIndex) {
        const newShow = shows[newIndex];

        // Fade out
        orbitContainer.style.opacity = '0';
        orbitContainer.style.transition = 'opacity 0.3s ease-out';

        await delay(300);

        // Update images/videos
        cells.forEach((cell, i) => {
            const photoIndex = i % newShow.photos.length;
            const photoData = newShow.photos[photoIndex];
            const isVideo = typeof photoData === 'object' && photoData.type === 'video';

            // Clear existing content
            cell.el.innerHTML = '';

            if (isVideo) {
                // Create video iframe
                const videoWrapper = document.createElement('div');
                videoWrapper.className = 'orbit-card-video';
                videoWrapper.style.cssText = 'width: 100%; height: 100%; position: relative; overflow: hidden; border-radius: 16px;';

                const iframe = document.createElement('iframe');
                iframe.src = photoData.url;
                iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;';
                iframe.allowFullscreen = true;
                iframe.frameBorder = '0';
                iframe.style.cssText = 'width: 100%; height: 100%; border: none; display: block;';

                videoWrapper.appendChild(iframe);
                cell.el.appendChild(videoWrapper);
                cell.content = videoWrapper;
                cell.isVideo = true;
                cell.img = null;
            } else {
                // Create image
                const img = document.createElement('img');
                img.src = photoData;
                img.alt = newShow.title;
                img.draggable = false;

                cell.el.appendChild(img);
                cell.img = img;
                cell.isVideo = false;
                cell.content = null;
            }
        });

        // Update title with animation
        if (showTitleEl) {
            showTitleEl.style.opacity = '0';
            showTitleEl.style.transform = 'translateY(10px)';

            await delay(150);

            showTitleEl.textContent = newShow.title;

            showTitleEl.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            showTitleEl.style.opacity = '1';
            showTitleEl.style.transform = 'translateY(0)';
        }

        // Fade in carousel
        orbitContainer.style.opacity = '1';

        currentShowIndex = newIndex;
    }

    // Helper delay function
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 5. Render Loop - Coverflow Effect
    function render() {
        const spacing = getCardSpacing();
        const rotationAngle = getRotationAngle();
        const sideScale = getSideScale();
        const sideOffset = getSideOffset();

        // Smooth interpolation to target
        if (!isDragging) {
            const diff = targetIndex - currentIndex;
            currentIndex += diff * 0.06; // Smoother easing (reduced from 0.1)

            // Snap when very close
            if (Math.abs(diff) < 0.01) {
                currentIndex = targetIndex;
            }
        } else {
            // While dragging, currentIndex tracks the drag
            // calculated in onMove based on startX
        }

        cells.forEach((cell, i) => {
            // 1. CIRCULAR WRAPPING LOGIC
            // Calculate shortest distance in a loop of size 'cardCount'
            let offset = (i - currentIndex) % cardCount;
            // Normalize offset to be within -cardCount/2 to +cardCount/2
            if (offset < -cardCount / 2) offset += cardCount;
            if (offset > cardCount / 2) offset -= cardCount;

            // Horizontal position
            const x = offset * spacing;

            // Scale: center card is 1.0, others are smaller
            const absOffset = Math.abs(offset);
            const scale = absOffset < 0.5 ? 1.0 : sideScale;

            // No rotation - cards stay flat
            const rotY = 0;

            // Z-depth: side cards pushed back slightly
            const z = absOffset > 0.5 ? -sideOffset : 0;

            // Opacity: fade distant cards more aggressively to hide the "back" of the circle
            // Show only ~5 cards (2 on each side) clearly
            let opacity = 1;
            if (absOffset > 2.5) {
                opacity = 0; // Hide cards that are wrapping behind visually
                cell.el.style.display = 'none'; // Optimization
            } else {
                cell.el.style.display = 'block';
                opacity = Math.max(0, 1 - (absOffset * 0.2));
            }

            // Apply transforms
            cell.el.style.transform = `
                translate3d(${x}px, 0, ${z}px)
                rotateY(${rotY}deg)
                scale(${scale})
            `;

            cell.el.style.opacity = opacity;

            // Z-index for proper stacking (Center card on top)
            cell.el.style.zIndex = Math.floor(100 - absOffset * 10);

            // Brightness based on position (only for images)
            if (!cell.isVideo && cell.img) {
                const brightness = 0.7 + (0.3 * (1 - Math.min(absOffset, 1)));
                cell.img.style.filter = `brightness(${brightness})`;
            }
        });

        requestAnimationFrame(render);
    }

    // Resize handler
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth < 768;
    });

    // Drag/Swipe handlers - Navigate between cards
    const onStart = (x) => {
        isDragging = true;
        startX = x;
        lastX = x;
        dragOffset = 0;
        scene.style.cursor = 'grabbing';
    };

    const onMove = (x) => {
        if (!isDragging) return;
        const moveX = x - startX;
        const spacing = getCardSpacing();
        // Update currentIndex directly during drag
        const delta = -moveX / spacing;
        currentIndex = targetIndex + delta;
        // Note: targetIndex stays fixed until release, currentIndex floats
    };

    const onEnd = () => {
        if (isDragging) {
            // Update target to nearest integer
            targetIndex = Math.round(currentIndex);
            // We set targetIndex to where we dragged to, 
            // enabling the easing loop to finish the snap.
            dragOffset = 0;
        }
        isDragging = false;
        scene.style.cursor = 'default';
    };

    window.addEventListener('mousedown', e => onStart(e.clientX));
    window.addEventListener('mousemove', e => onMove(e.clientX));
    window.addEventListener('mouseup', onEnd);

    window.addEventListener('touchstart', e => onStart(e.touches[0].clientX), { passive: false });
    window.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: false });
    window.addEventListener('touchend', onEnd);

    // Initialize
    loadShowData();
}
