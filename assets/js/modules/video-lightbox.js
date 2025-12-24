/**
 * Video Lightbox Module
 * Handles opening and closing of the location video lightbox
 */

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
        document.body.style.overflow = 'hidden';

        // Focus trap
        lightbox.focus();
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.setAttribute('hidden', '');
        iframe.src = '';
        document.body.style.overflow = '';
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
