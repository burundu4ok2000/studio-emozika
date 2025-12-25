/**
 * iOS Safari Scroll Lock Utility v2
 * Блокирует scroll body, но разрешает scroll внутри модалок
 * 
 * Использует touchmove prevention вместо только CSS,
 * потому что position:fixed на body блокирует все touch-события в iOS Safari.
 */

let scrollY = 0;
let isLocked = false;
let scrollableElement = null;

/**
 * Touch move handler - блокирует scroll везде кроме указанного элемента
 */
function handleTouchMove(e) {
    // Если касание внутри scrollable элемента — разрешаем
    if (scrollableElement && scrollableElement.contains(e.target)) {
        return;
    }
    // Иначе блокируем
    e.preventDefault();
}

/**
 * Блокирует scroll body, но разрешает scroll внутри указанного элемента
 * @param {HTMLElement} scrollableEl - элемент который должен скроллиться (например .play-modal__dialog)
 */
export function lockScroll(scrollableEl = null) {
    if (isLocked) return;

    scrollY = window.scrollY;
    scrollableElement = scrollableEl;
    isLocked = true;

    // CSS блокировка для desktop браузеров
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    // Touch блокировка для iOS Safari
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
}

/**
 * Разблокирует scroll body и восстанавливает позицию
 */
export function unlockScroll() {
    if (!isLocked) return;

    // Убираем CSS блокировку
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';

    // Убираем touch listener
    document.removeEventListener('touchmove', handleTouchMove);

    // Восстанавливаем позицию скролла
    window.scrollTo(0, scrollY);

    isLocked = false;
    scrollableElement = null;
}
