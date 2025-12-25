/**
 * Video Lightbox Module
 * Handles opening and closing of the location video lightbox
 */

import { lockScroll, unlockScroll } from './scroll-lock.js';

export function initVideoLightbox() {
    const lightbox = document.getElementById('location-video-lightbox');
    const iframe = document.getElementById('location-video-iframe');
    const openButton = document.querySelector('[data-open-location-video]');
    const closeButtons = document.querySelectorAll('[data-close-location-video]');

    const VIDEO_URL = 'https://vk.com/video_ext.php?oid=-232221941&id=456239082';

    if (!lightbox || !iframe || !openButton) {
        console.warn('Video lightbox elements not found');
        return;
    }

    // Open lightbox
    function openLightbox() {
        lightbox.removeAttribute('hidden');
        iframe.src = VIDEO_URL;
        // Передаём lightbox для iOS Safari scroll
        lockScroll(lightbox);

        // Focus trap
        lightbox.focus();
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.setAttribute('hidden', '');
        iframe.src = '';
        unlockScroll();
    }

    // Event listeners
    openButton.addEventListener('click', openLightbox);

    closeButtons.forEach(button => {
        button.addEventListener('click', closeLightbox);
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
            closeLightbox();
        }
    });
}
