/**
 * Docs Modal Module
 * Управление модальным окном с документами
 */

export function initDocsModal() {
    const modal = document.querySelector('[data-docs-modal]');
    if (!modal) return;

    const openButtons = document.querySelectorAll('[data-open-docs-modal]');
    const closeButtons = modal.querySelectorAll('[data-close-docs-modal]');

    // Открытие модального окна
    function openModal() {
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';

        // Фокус на диалоге для доступности
        const dialog = modal.querySelector('.docs-modal__dialog');
        if (dialog) {
            dialog.focus();
        }
    }

    // Закрытие модального окна
    function closeModal() {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    // Обработчики событий
    openButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
            closeModal();
        }
    });
}
