
function buildVideoEmbedUrl(platform, videoId) {
    if (!videoId) return "";

    if (platform === "youtube") {
        return "https://www.youtube.com/embed/" + videoId;
    }

    if (platform === "vk") {
        return "https://vk.com/video/" + videoId;
    }

    return "";
}

const videoReviews = [
    {
        id: "review-masha-9",
        kind: "video",

        title: "Маша, 9 лет — перестала бояться сцены",
        quote:
            "После первого спектакля мы увидели совсем другого ребёнка — уверенного и светящегося.",
        authorLabel: "Мама Маши, 9 лет",

        thumbUrl: "assets/img/reviews/masha-9-thumb.webp",
        thumbAlt: "Кадр из видеоотзыва: мама Маши после спектакля",

        videoEmbedUrl: "", // Video temporarily unavailable
        platform: "youtube",
        videoId: "XXXXXXXX",

        persona: "parent",
        childName: "Маша",
        childAge: 9,
        yearsInStudio: 3,
        yearsInStudioLabel: "3 года в студии",
        branch: "филиал у Комендантского",

        event: "Спектакль «Любовь у сливного бачка»",

        topics: ["уверенность", "первый_спектакль", "атмосфера"],

        isFeatured: true,
        order: 10,
        isActive: true,

        durationSeconds: 75,
        durationLabel: "01:15",
        recordedAt: "2024-12-15",
    },
    {
        id: "review-kirill-12",
        kind: "video",

        title: "Кирилл, 12 лет — научился говорить вслух",
        quote:
            "Учителя в школе заметили, что Кирилл стал спокойно выходить к доске и не мямлить. Для нас это огромный шаг.",
        authorLabel: "Папа Кирилла, 12 лет",

        thumbUrl: "assets/img/reviews/kirill-12-thumb.webp",
        thumbAlt: "Кирилл с папой после спектакля",

        videoEmbedUrl: "", // Video temporarily unavailable
        platform: "vk",
        videoId: "0000000_0000000",

        persona: "parent",
        childName: "Кирилл",
        childAge: 12,
        yearsInStudio: 2,
        yearsInStudioLabel: "2 года в студии",
        branch: "филиал на Пионерской",

        event: "Фестиваль «На берегах Невы»",

        topics: ["речь", "уверенность", "фестивали"],

        isFeatured: false,
        order: 20,
        isActive: true,

        durationSeconds: 90,
        durationLabel: "01:30",
        recordedAt: "2024-03-10",
    },
    {
        id: "review-montage-camp",
        kind: "video",

        title: "Лагерь «Эмоция» — как вторая семья",
        quote:
            "Дети возвращаются из лагеря с ощущением, что у них появилась новая семья. Это не просто отдых, а глубокий опыт.",
        authorLabel: "Монтаж отзывов родителей",

        thumbUrl: "assets/img/reviews/camp-montage-thumb.webp",
        thumbAlt: "Кадры из смены лагеря студии «Эмоция»",

        videoEmbedUrl: "", // Video temporarily unavailable
        platform: "youtube",
        videoId: "YYYYYYYY",

        persona: "montage",
        childName: "",
        childAge: null,
        yearsInStudio: null,
        yearsInStudioLabel: "",
        branch: "",

        event: "Лагерь «Эмоция»",

        topics: ["лагерь", "атмосфера", "команда"],

        isFeatured: false,
        order: 30,
        isActive: true,

        durationSeconds: 120,
        durationLabel: "02:00",
        recordedAt: "2023-08-20",
    },
];

function buildReviewMetaLine(review) {
    var parts = [];

    if (review.authorLabel) {
        parts.push(review.authorLabel);
    } else if (review.childName || review.childAge) {
        var childBits = [];
        if (review.childName) {
            childBits.push(review.childName);
        }
        if (typeof review.childAge === "number") {
            childBits.push(review.childAge + " лет");
        }
        if (childBits.length) {
            parts.push(childBits.join(", "));
        }
    }

    if (review.yearsInStudioLabel) {
        parts.push(review.yearsInStudioLabel);
    }

    if (review.branch) {
        parts.push(review.branch);
    }

    return parts.join(" • ");
}

function createReviewVideoCard(review) {
    var card = document.createElement("article");
    card.className = "review-video-card card card-hover";
    card.setAttribute("data-review-id", review.id);

    var poster = document.createElement("div");
    poster.className = "review-video-card__poster";
    if (review.thumbUrl) {
        poster.style.backgroundImage = "url(" + review.thumbUrl + ")";
    }

    if (review.durationLabel) {
        var duration = document.createElement("span");
        duration.className = "review-video-card__duration";
        duration.textContent = review.durationLabel;
        poster.appendChild(duration);
    }

    var badge = document.createElement("span");
    badge.className = "review-video-card__badge";
    badge.textContent = "Видеоотзыв";

    var title = document.createElement("h3");
    title.className = "review-video-card__title";
    title.textContent = review.title || "";

    var meta = document.createElement("p");
    meta.className = "review-video-card__meta";
    meta.textContent = buildReviewMetaLine(review);

    card.appendChild(poster);
    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(meta);

    return card;
}

function openReviewLightbox(lightbox, review) {
    var titleEl = lightbox.querySelector(".review-lightbox__title");
    var quoteEl = lightbox.querySelector(".review-lightbox__quote");
    var metaEl = lightbox.querySelector(".review-lightbox__meta");
    var videoContainer = lightbox.querySelector(".review-lightbox__video");

    if (!videoContainer) return;

    videoContainer.innerHTML = "";

    if (review.videoEmbedUrl) {
        var iframe = document.createElement("iframe");
        var src = review.videoEmbedUrl;
        iframe.src = src;
        iframe.title = review.title || "Видеоотзыв";
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        videoContainer.appendChild(iframe);
    }

    if (titleEl) {
        titleEl.textContent = review.title || "";
    }
    if (quoteEl) {
        quoteEl.textContent = review.quote || "";
    }
    if (metaEl) {
        metaEl.textContent =
            buildReviewMetaLine(review) +
            (review.event ? " • " + review.event : "");
    }

    lightbox.setAttribute("data-current-id", review.id);
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("is-open");
    document.body.classList.add("is-lightbox-open");
}

function closeReviewLightbox(lightbox) {
    var videoContainer = lightbox.querySelector(".review-lightbox__video");
    if (videoContainer) {
        videoContainer.innerHTML = "";
    }
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-lightbox-open");
}

export function initVideoReviewsSection() {
    var section = document.getElementById("reviews");
    if (!section) return;

    var strip = section.querySelector("[data-reviews-strip]");
    var lightbox = section.querySelector("[data-review-lightbox]");
    if (!strip || !lightbox) return;

    var activeReviews = videoReviews.filter(function (review) {
        return review.isActive !== false;
    });

    if (!activeReviews.length) {
        section.classList.add("section-reviews--empty");
        return;
    }

    // сортировка: сначала избранные, потом по order
    activeReviews.sort(function (a, b) {
        var aFeatured = !!a.isFeatured;
        var bFeatured = !!b.isFeatured;

        if (aFeatured !== bFeatured) {
            return aFeatured ? -1 : 1;
        }

        var orderA = typeof a.order === "number" ? a.order : 0;
        var orderB = typeof b.order === "number" ? b.order : 0;
        return orderA - orderB;
    });

    // рендер карточек
    activeReviews.forEach(function (review) {
        var card = createReviewVideoCard(review);
        strip.appendChild(card);
    });

    // клик по карточкам — открываем модалку
    strip.addEventListener("click", function (event) {
        var card = event.target.closest(".review-video-card");
        if (!card) return;

        var reviewId = card.getAttribute("data-review-id");
        var review = null;
        for (var i = 0; i < activeReviews.length; i++) {
            if (activeReviews[i].id === reviewId) {
                review = activeReviews[i];
                break;
            }
        }
        if (!review) return;

        openReviewLightbox(lightbox, review);
    });

    // стрелки прокрутки
    var leftArrow = section.querySelector("[data-reviews-arrow='left']");
    var rightArrow = section.querySelector("[data-reviews-arrow='right']");

    function scrollStrip(direction) {
        if (!strip) return;
        var firstCard = strip.querySelector(".review-video-card");
        var cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 260;
        strip.scrollBy({
            left: direction * (cardWidth * 0.9 + 16),
            behavior: "smooth",
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener("click", function () {
            scrollStrip(-1);
        });
    }
    if (rightArrow) {
        rightArrow.addEventListener("click", function () {
            scrollStrip(1);
        });
    }

    // закрытие модалки
    var closeBtn = lightbox.querySelector("[data-review-lightbox-close]");
    var backdrop = lightbox.querySelector("[data-review-lightbox-backdrop]");

    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            closeReviewLightbox(lightbox);
        });
    }

    if (backdrop) {
        backdrop.addEventListener("click", function () {
            closeReviewLightbox(lightbox);
        });
    }

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            lightbox.classList.contains("is-open")
        ) {
            closeReviewLightbox(lightbox);
        }
    });
}
