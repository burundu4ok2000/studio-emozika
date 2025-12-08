
const ABONEMENTS_DATA_URL = 'assets/data/abonements.json';

function createAbonementCard(abonement) {
    const article = document.createElement('article');
    article.className = 'abonement-card';

    if (abonement.highlight || abonement.isHero) {
        article.classList.add('abonement-card--highlight');
    }

    article.dataset.abonementId = abonement.id;

    article.innerHTML = `
    ${abonement.tagLine ? `<p class="abonement-tagline">${abonement.tagLine}</p>` : ''}
    <h3 class="abonement-name">${abonement.name}</h3>
    ${abonement.age ? `<p class="abonement-age">${abonement.age}</p>` : ''}
    ${abonement.description ? `<p class="abonement-description">${abonement.description}</p>` : ''}
    ${Array.isArray(abonement.bullets) && abonement.bullets.length
            ? `<ul class="abonement-list">
            ${abonement.bullets.map((item) => `<li>${item}</li>`).join('')}
          </ul>`
            : ''
        }
    <div class="abonement-bottom">
      ${abonement.price ? `<p class="abonement-price">${abonement.price}</p>` : ''}
      ${abonement.note ? `<p class="abonement-note">${abonement.note}</p>` : ''}
    </div>
    ${abonement.badge ? `<span class="abonement-badge">${abonement.badge}</span>` : ''}
  `;

    if (abonement.isHero) {
        article.classList.add('abonement-card--hero');
        article.setAttribute(
            'aria-label',
            `${abonement.name}. Чаще всего родители выбирают именно этот формат.`
        );
    }

    return article;
}

function renderAbonementsGrid(container, abonements) {
    container.innerHTML = '';

    abonements.forEach((item) => {
        const card = createAbonementCard(item);
        container.appendChild(card);
    });
}

function loadAbonementsData() {
    return fetch(ABONEMENTS_DATA_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные абонементов');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('[Abonements] Ошибка загрузки данных:', error);
            return [];
        });
}

export function initAbonements() {
    const gridRoot = document.querySelector('[data-abonements-root]');

    if (!gridRoot) {
        return;
    }

    const contactsSection = document.getElementById('contacts');

    const scrollToContacts = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (!contactsSection) {
            return;
        }

        contactsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Рендер карточек из JSON
    loadAbonementsData().then((abonements) => {
        if (!Array.isArray(abonements) || abonements.length === 0) {
            return;
        }

        renderAbonementsGrid(gridRoot, abonements);

        // Клик по карточке героя ведёт туда же, куда и главный CTA
        const heroCard = gridRoot.querySelector('.abonement-card--hero');

        if (heroCard) {
            heroCard.addEventListener('click', scrollToContacts);
        }
    });

    // Кнопки CTA внизу блока абонементов
    const ctaButtons = document.querySelectorAll('[data-scroll-to="contacts"]');

    if (ctaButtons.length) {
        ctaButtons.forEach((button) => {
            button.addEventListener('click', scrollToContacts);
        });
    }
}
