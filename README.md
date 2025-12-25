# 🎭 Emozika Theatre

<div align="center">

**Детский театр «Эмоцика» — A premium web experience for a children's theatre in Saint Petersburg**

[![Live Demo](https://img.shields.io/badge/🎪_Live_Demo-Visit_Site-4CAF50?style=for-the-badge)](https://burundu4ok2000.github.io/studio-emozika/)
[![CS50x](https://img.shields.io/badge/CS50x-Final_Project-crimson?style=for-the-badge&logo=edx)](https://cs50.harvard.edu/x/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 📺 Video Demo

[![CS50x Video Demo](https://img.shields.io/badge/▶_Watch_Demo-YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=lP56K4tAYLs)

---

## 🎯 Project Overview

This is a **production-ready theatre website** built for Emozika — a children's drama studio in Saint Petersburg that has been inspiring young actors since 2014.

### What makes it special?

| Feature | Implementation |
|---------|---------------|
| 🎬 **Theatrical Opening** | CSS-animated stage curtains that "open" on page load |
| ❄️ **Seasonal Theme** | "Snow Queen" section with particle snowfall animation |
| 📱 **Mobile-First** | Fully responsive with hamburger navigation and touch gestures |
| ⚡ **Performance** | Optimized WebP images, minimal JS (9.7 KB gzipped) |
| ♿ **Accessibility** | Skip links, ARIA labels, keyboard navigation |

---

## 🛠️ Tech Stack

```
Frontend           Build & Deploy        Design
─────────────────────────────────────────────────────
HTML5              Vite 6.0              SCSS/Sass
Vanilla JS (ES6)   GitHub Pages          CSS Variables
CSS Animations     gh-pages CLI          Glassmorphism
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^6.0.0 | Lightning-fast dev server & bundler |
| `sass` | ^1.83.0 | SCSS compilation |
| `gh-pages` | ^6.3.0 | Automated deployment |

**Zero frontend dependencies** — pure vanilla JavaScript!

---

## 📁 Project Structure

```
studio-emozika/
├── 📄 index.html              # Single-page application
├── 📦 package.json            # Project configuration
├── ⚙️ vite.config.js          # Vite configuration
│
├── 🎨 assets/
│   ├── scss/                  # Styling (ITCSS methodology)
│   │   ├── base/              # Variables, reset, typography
│   │   ├── components/        # Buttons, cards, modals
│   │   └── sections/          # Header, hero, afisha, footer
│   │
│   ├── js/                    # JavaScript modules
│   │   ├── main.js            # Entry point
│   │   └── modules/           # Feature modules
│   │       ├── afisha.js      # Play cards & strip navigation
│   │       ├── snow-queen.js  # Seasonal section logic
│   │       ├── reveal.js      # Scroll animations
│   │       └── ...
│   │
│   └── docs/                  # Legal documents
│
└── 🖼️ public/assets/
    ├── data/plays.json        # Repertoire data
    └── img/                   # Optimized images (WebP)
```

---

## ✨ Key Features

### 1. Animated Theatre Curtains
The hero section features **CSS keyframe animations** simulating stage curtains opening — creating an immersive theatrical experience from the first second.

```scss
@keyframes curtainOpenLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
}
```

### 2. Data-Driven Afisha (Playbill)
Plays are rendered dynamically from `plays.json`, allowing easy content updates without touching HTML:

```json
{
  "slug": "snow-queen",
  "title": "Снежная Королева",
  "badges": ["ny", "premiere"]
}
```

### 3. Horizontal Scrolling Strip
The afisha uses **CSS Scroll Snap** for smooth, swipeable card navigation on mobile:

```scss
.afisha-strip {
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}
```

### 4. Professional SCSS Architecture
Following **ITCSS methodology** with:
- Design tokens in CSS variables
- Component-based structure
- JSDoc-style file headers
- Organized section comments

### 5. Accessibility Features
- Skip-to-content link for keyboard users
- ARIA labels on interactive elements
- Reduced motion support (`prefers-reduced-motion`)
- Focus-visible indicators

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/burundu4ok2000/studio-emozika.git
cd studio-emozika

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## � Build Output

```
dist/
├── index.html          24.24 kB │ gzip:  6.43 kB
├── assets/
│   ├── index-*.css     55.67 kB │ gzip: 11.09 kB
│   └── index-*.js       9.71 kB │ gzip:  3.36 kB
```

**Total: ~21 KB gzipped** — optimized for fast loading!

---

## 🎓 CS50x Final Project

This project was created as the final project for **Harvard's CS50x: Introduction to Computer Science**.

### Skills Demonstrated

- ✅ HTML/CSS/JavaScript fundamentals
- ✅ Responsive web design
- ✅ CSS animations and transitions
- ✅ JavaScript DOM manipulation
- ✅ JSON data handling
- ✅ Build tools (Vite, npm)
- ✅ Version control (Git)
- ✅ Deployment (GitHub Pages)

---

## 🤖 AI Acknowledgment

This project was developed with the assistance of AI coding tools, as permitted by CS50x guidelines:

- **IDE**: Antigravity IDE
- **AI Models**: Claude Opus 4.5 (Thinking), Gemini 3 Pro (High)

AI was used as a coding assistant to help with:
- Complex SCSS styles and animations
- Responsive layout implementations
- Cross-browser compatibility fixes
- Code refactoring and optimization

All architectural decisions, the design system, project structure, and the overall implementation represent my own work. AI tools served as amplifiers of productivity, not replacements for understanding.

---

## 👤 Author

**Stanislav Burundukov**

- Telegram: [@BurundukovS](https://t.me/BurundukovS)
- GitHub: [@burundu4ok2000](https://github.com/burundu4ok2000)

---

## 📄 License

Private portfolio project for Emozika Theatre Studio.  
© 2014–2025 Emozika Theatre. All rights reserved.

---

<div align="center">

**Built with 💚 in Saint Petersburg**

*This was CS50!*

</div>
