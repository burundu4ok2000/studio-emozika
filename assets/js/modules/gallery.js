
export function initGallery() {
    const gallerySection = document.querySelector("#gallery");

    if (gallerySection) {
        const scroller = gallerySection.querySelector("[data-gallery-scroller]");
        const tabs = gallerySection.querySelectorAll("[data-gallery-filter]");
        const lightbox = document.querySelector("#gallery-lightbox");
        const lightboxImage = lightbox ? lightbox.querySelector(".lightbox__image") : null;
        const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox__caption") : null;
        const prevBtn = lightbox ? lightbox.querySelector("[data-lightbox-prev]") : null;
        const nextBtn = lightbox ? lightbox.querySelector("[data-lightbox-next]") : null;
        const closeEls = lightbox
            ? lightbox.querySelectorAll("[data-lightbox-close]")
            : [];

        // один массив объектов — его потом легко вынести в JSON
        const galleryItems = [
            {
                id: "rehearsal-1",
                category: "rehearsal",
                categoryLabel: "Репетиции",
                src: "assets/gallery/rehearsal-1.jpg",
                full: "assets/gallery/rehearsal-1.jpg",
                alt: "Репетиция в студии «Эмоция»",
                caption: "Репетиция в студии «Эмоция»",
            },
            {
                id: "show-1",
                category: "stage",
                categoryLabel: "Сцена",
                src: "assets/gallery/show-1.jpg",
                full: "assets/gallery/show-1.jpg",
                alt: "Юные актёры на сцене",
                caption: "Юные актёры на сцене",
            },
            {
                id: "backstage-1",
                category: "backstage",
                categoryLabel: "Закулисье",
                src: "assets/gallery/backstage-1.jpg",
                full: "assets/gallery/backstage-1.jpg",
                alt: "Закулисье перед спектаклем",
                caption: "Закулисье перед спектаклем",
            },
            {
                id: "rehearsal-2",
                category: "rehearsal",
                categoryLabel: "Репетиции",
                src: "assets/gallery/rehearsal-2.jpg",
                full: "assets/gallery/rehearsal-2.jpg",
                alt: "Работа над сценой",
                caption: "Работа над сценой",
            },
            // сюда потом просто добавляешь новые кадры
        ];

        let currentFilter = "all";
        let visibleItems = [];
        let currentIndex = 0;

        function getFilteredItems() {
            if (currentFilter === "all") {
                return galleryItems;
            }

            return galleryItems.filter((item) => item.category === currentFilter);
        }

        function renderGallery() {
            if (!scroller) return;

            const items = getFilteredItems();
            visibleItems = items;
            scroller.innerHTML = "";

            if (!items.length) {
                const empty = document.createElement("p");
                empty.className = "gallery__empty";
                empty.textContent = "Скоро здесь появятся новые фотографии.";
                scroller.appendChild(empty);
                return;
            }

            items.forEach((item, index) => {
                const card = document.createElement("button");
                card.type = "button";
                card.className = "gallery-card";
                card.setAttribute("data-gallery-id", item.id);
                card.setAttribute("data-gallery-index", String(index));

                card.innerHTML = `
          <div class="gallery-card__image-wrapper">
            <img
              src="${item.src}"
              alt="${item.alt}"
              class="gallery-card__image"
              loading="lazy"
            >
            <div class="gallery-card__frame"></div>
          </div>
          <div class="gallery-card__meta">
            <div class="gallery-card__title"></div>
            <div class="gallery-card__tag">
              <span class="gallery-card__tag-dot"></span>
              <span class="gallery-card__tag-label"></span>
            </div>
          </div>
        `;

                const titleEl = card.querySelector(".gallery-card__title");
                const tagLabelEl = card.querySelector(".gallery-card__tag-label");
                const tagEl = card.querySelector(".gallery-card__tag");

                if (titleEl) {
                    titleEl.textContent = item.caption || "";
                }

                if (tagLabelEl && tagEl) {
                    if (item.categoryLabel) {
                        tagLabelEl.textContent = item.categoryLabel;
                    } else {
                        tagEl.style.display = "none";
                    }
                }

                card.addEventListener("click", () => {
                    openLightbox(index);
                });

                scroller.appendChild(card);
            });
        }

        function updateLightbox() {
            if (!lightboxImage || !lightboxCaption) return;
            const item = visibleItems[currentIndex];

            if (!item) return;

            const src = item.full || item.src;

            lightboxImage.src = src;
            lightboxImage.alt = item.alt || "";
            lightboxCaption.textContent = item.caption || "";
        }

        function openLightbox(index) {
            if (!lightbox || !lightboxImage || !visibleItems.length) return;

            currentIndex = index;
            updateLightbox();

            lightbox.hidden = false;
            document.body.classList.add("is-lightbox-open");
        }

        function closeLightbox() {
            if (!lightbox) return;
            lightbox.hidden = true;
            document.body.classList.remove("is-lightbox-open");
        }

        function goTo(delta) {
            if (!visibleItems.length) return;
            const length = visibleItems.length;
            currentIndex = (currentIndex + delta + length) % length;
            updateLightbox();
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                goTo(-1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                goTo(1);
            });
        }

        closeEls.forEach((el) => {
            el.addEventListener("click", () => {
                closeLightbox();
            });
        });

        document.addEventListener("keydown", (event) => {
            if (!lightbox || lightbox.hidden) return;

            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "ArrowRight") {
                goTo(1);
            } else if (event.key === "ArrowLeft") {
                goTo(-1);
            }
        });

        if (tabs.length) {
            tabs.forEach((tab) => {
                tab.addEventListener("click", () => {
                    const value = tab.getAttribute("data-gallery-filter") || "all";
                    currentFilter = value;

                    tabs.forEach((btn) => {
                        btn.classList.toggle("is-active", btn === tab);
                    });

                    renderGallery();
                });
            });
        }

        renderGallery();
    }
}
