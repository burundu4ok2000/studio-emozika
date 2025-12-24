# 🎭 Emozika Theatre Platform

> **A full-stack, data-driven web platform for a family theatre in Saint Petersburg — featuring automated content pipelines, modular JavaScript architecture, and a polished premium UI.**

## 📌 Elevator Pitch

**Emozika Theatre Platform** transforms how a local theatre manages its digital presence by replacing manual content updates with **automated VK API scraping pipelines** and a **modular, component-based frontend**. The result is a production-ready website that dynamically renders plays, media galleries, and real-time event data from structured JSON sources.

---

## 💡 The Problem

Managing a theatre's online presence traditionally involves:

| Challenge | Pain Point |
|-----------|------------|
| **Manual Content Updates** | Every new show, photo, or video requires editing static HTML files |
| **Fragmented Media Sources** | VK, YouTube, and local assets scattered across platforms |
| **Non-Technical Stakeholders** | Theatre staff can't update content without developer intervention |
| **Performance Bottlenecks** | Unoptimized images and heavy assets slow page loads |
| **SEO Gaps** | Missing structured data hurts discoverability for local searches |

---

## 🏗️ The Solution: Target Architecture

The platform implements a **Source → Scrape → Transform → Render** pipeline that automates content flow from VK social media to the production website.

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           DATA PIPELINE                                    │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   ┌─────────────┐     ┌─────────────────┐     ┌─────────────────────┐     │
│   │   VK API    │────▶│  scrape-vk.js   │────▶│  Raw JSON (.bd/)    │     │
│   │  (Source)   │     │  (Ingestion)    │     │  wall, photos, etc  │     │
│   └─────────────┘     └─────────────────┘     └──────────┬──────────┘     │
│                                                          │                 │
│                                                          ▼                 │
│   ┌─────────────────────────────────────────────────────────────────┐     │
│   │              TRANSFORMATION SCRIPTS                             │     │
│   │  ├── generate-show-carousel-data.js  (→ show-carousel.json)    │     │
│   │  ├── select-hero-photos.js           (→ curated hero images)   │     │
│   │  ├── find-best-photos.js             (→ gallery selections)    │     │
│   │  └── optimize-images.js              (→ WebP conversion)       │     │
│   └──────────────────────────────────────────┬──────────────────────┘     │
│                                              │                             │
│                                              ▼                             │
│   ┌─────────────────────────────────────────────────────────────────┐     │
│   │              STRUCTURED DATA (public/assets/data/)              │     │
│   │  ├── plays.json        (repertoire, schedules, tickets)        │     │
│   │  ├── people.json       (cast, directors, staff)                │     │
│   │  ├── show-carousel.json (featured carousel items)              │     │
│   │  └── docs.json         (legal documents metadata)              │     │
│   └──────────────────────────────────────────┬──────────────────────┘     │
│                                              │                             │
└──────────────────────────────────────────────┼─────────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌───────────────────┐    ┌───────────────────────────────────────┐       │
│   │   Vite Build      │    │     Modular JS Architecture           │       │
│   │   (Dev/Prod)      │    │                                       │       │
│   │                   │    │  main.js                              │       │
│   │  ├── HMR          │    │    ├── initAfisha()     (plays)       │       │
│   │  ├── SCSS→CSS     │    │    ├── initGallery()    (lightbox)    │       │
│   │  └── ES Modules   │    │    ├── initReviews()    (video grid)  │       │
│   │                   │    │    ├── initAwards()     (festivals)   │       │
│   └───────────────────┘    │    ├── initPeople()     (team)        │       │
│                            │    ├── initHeroCarousel() (3D stage)  │       │
│                            │    └── ... (20+ modules)              │       │
│                            └───────────────────────────────────────┘       │
│                                                                             │
│   ┌───────────────────────────────────────────────────────────────────┐    │
│   │                    SCSS ARCHITECTURE                              │    │
│   │  scss/                                                            │    │
│   │    ├── base/      (reset, typography, variables)                  │    │
│   │    ├── components/ (buttons, modals, cards, badges)               │    │
│   │    ├── sections/   (hero, afisha, contacts, awards...)            │    │
│   │    └── utils/      (mixins, functions)                            │    │
│   └───────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Vite 6.0** | Build tool with HMR, ES module bundling |
| **Vanilla JavaScript (ES6+)** | Zero-dependency modular architecture |
| **SCSS (Dart Sass)** | Component-scoped styling with design tokens |
| **HTML5 Semantic Markup** | Accessibility-first structure |

### Data Layer
| Technology | Purpose |
|------------|---------|
| **VK API v5.131** | Automated scraping of wall posts, photos, videos |
| **JSON Data Files** | plays.json, people.json — structured content storage |
| **Node.js Scripts** | ETL pipeline for content transformation |

### Dev & Deployment
| Technology | Purpose |
|------------|---------|
| **Sharp** | Image optimization and WebP conversion |
| **gh-pages** | Automated deployment to GitHub Pages |
| **Schema.org JSON-LD** | Structured data for SEO (TheaterEvent, PerformingGroup) |

### Third-Party Integrations
| Service | Purpose |
|---------|---------|
| **Yandex.Afisha Widget** | Ticket purchasing integration |
| **Yandex Maps Embed** | Location and directions |
| **VK Video Embeds** | Performance trailers and promo content |

---

## 📊 Current Status & Roadmap

### ✅ Completed Features

- [x] **Core Website Architecture** — Vite build, SCSS system, modular JS
- [x] **Afisha Module** — Dynamic plays rendering from `plays.json` with modal details
- [x] **Play Modal System** — Full play info with video embeds, cast, and ticket CTA
- [x] **Hero Section** — Animated theatrical curtains with spotlight effects
- [x] **VK API Scraper** — Automated ingestion of wall posts, photos, videos, discussions
- [x] **Image Optimization Pipeline** — Sharp-based WebP conversion
- [x] **Gallery Lightbox** — Keyboard-navigable photo viewer
- [x] **Video Lightbox** — Fullscreen video player for location guides
- [x] **Contacts Section** — Yandex Maps integration, WhatsApp CTAs
- [x] **Documents Modal** — Legal documents (licenses, permits) display
- [x] **SEO Implementation** — Schema.org JSON-LD for events, Open Graph tags
- [x] **Responsive Design** — Mobile-first with glassmorphism effects
- [x] **Accessibility** — Skip links, ARIA labels, keyboard navigation

### 🔄 In Progress

- [ ] **Hero Carousel** — 3D carousel for featured shows (currently disabled)
- [ ] **Awards Section** — Festival trophies and achievements display
- [ ] **Reviews Module** — Video testimonials from parents and students
- [ ] **People Section** — Team members with photos from `people.json`
- [ ] **Photo Gallery Automation** — Connect raw VK photos to gallery component

### 📋 Planned Enhancements

- [ ] **Admin Dashboard** — CMS for non-technical staff to update `plays.json`
- [ ] **Automated CI/CD Pipeline** — GitHub Actions for scheduled VK scrapes
- [ ] **Analytics Integration** — Yandex.Metrica event tracking
- [ ] **Telegram Notifications** — Alert admins when new VK content is scraped
- [ ] **Multi-Page Architecture** — Dedicated pages per play for SEO

---

## ⭐ Key Features

### 🎬 Data-Driven Afisha System
Renders plays dynamically from structured JSON, with automatic date sorting, age badges, and integrated ticket purchasing via Yandex.Afisha.

### 🔄 VK Content Ingestion Pipeline
Custom Node.js scraper pulls wall posts, photos, videos, and discussions from the theatre's VK group — transforming raw social data into structured assets.

### 🎨 Premium Glassmorphism UI
Modern design language with frosted glass panels, smooth micro-animations, and a theatrical dark theme that evokes the stage experience.

### 📦 Modular JavaScript Architecture
20+ self-contained modules (`afisha.js`, `gallery.js`, `reviews.js`, etc.) with zero external dependencies — clean separation of concerns for maintainability.

### 🖼️ Automated Image Optimization
Sharp-powered pipeline converts and compresses images to WebP, with automated selection of best photos from scraped VK albums.

### 🔍 SEO-Optimized Structured Data
Schema.org JSON-LD markup for `TheaterEvent` and `PerformingGroup` entities, plus Open Graph and Twitter Card meta tags for social sharing.

---

## 📁 Project Structure

```
studio-emozika/
├── assets/
│   ├── js/
│   │   ├── main.js                 # Entry point, module orchestration
│   │   └── modules/                # 20+ feature modules
│   │       ├── afisha.js           # Repertoire rendering & modal
│   │       ├── gallery.js          # Photo lightbox
│   │       ├── reviews.js          # Video testimonials
│   │       ├── awards.js           # Festival achievements
│   │       ├── hero-carousel.js    # 3D carousel (WIP)
│   │       └── ...
│   └── scss/
│       ├── base/                   # Reset, typography, tokens
│       ├── components/             # Buttons, modals, badges
│       └── sections/               # Hero, afisha, contacts, etc.
├── public/assets/data/
│   ├── plays.json                  # Repertoire data
│   ├── people.json                 # Cast and team
│   └── show-carousel.json          # Featured content
├── scripts/
│   ├── scrape-vk.js               # VK API ingestion
│   ├── generate-show-carousel-data.js
│   ├── select-hero-photos.js
│   └── optimize-images.js
├── .bd/                            # Raw scraped VK data (gitignored)
├── index.html                      # Single-page application
└── vite.config.js                  # Build configuration
```

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server with HMR
npm run dev

# Scrape content from VK (requires .env configuration)
node scripts/scrape-vk.js

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Environment Variables

Create a `.env` file in the project root:

```env
VK_SERVICE_TOKEN=your_vk_service_token
VK_GROUP_ID=-232221941
```

---

## 📄 License

This project is a private portfolio piece developed for Emozika Theatre Studio.  
© 2014–2025 Emozika Theatre & Emotion Studio. All rights reserved.

---

<p align="center">
  <strong>Developed by</strong> <a href="https://telegram.me/BurundukovS">Stanislav Burundukov</a>
</p>
