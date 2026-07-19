# MIKAEL GLOBAL — Data Analysis & Web Development

> Professional website for **MIKAEL GLOBAL**, a Lagos-based firm specializing in data analysis, web development, and business intelligence.  
> Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools.

🌐 **Live Site:** [mikaelglobal.netlify.app](https://mikaelglobal.netlify.app)
[thekinghimself.netlify.app](https://thekinghimself.netlify.app)

---

## ✦ Preview

```
Dark luxury aesthetic · Gold accent system · Rotating 3D wireframe globe · Animated cursor · Scroll reveals
```

---

## ✦ Services

- **Data Analysis & Intelligence** — Python, SQL, Power BI, Excel, Data Visualization, Statistical Analysis
- **Web Development** — React, Node.js, HTML5, CSS3, MongoDB, REST APIs
- **Business Intelligence** — Dashboards, Reporting, KPI Tracking, Predictive Analytics
- **Digital Strategy** — Consulting, UX Research, Product Strategy, Growth

---

## ✦ Features

- **Custom animated cursor** with a magnetic lag ring
- **Rotating 3D wireframe globe** in the hero — built from real CSS 3D transforms (meridians, latitude rings, embossed "MK" face), tilts toward the cursor on hover and speeds up its spin
- **Hero section** with staggered text reveal, mouse-parallax orbs, and an animated data-chart motif
- **Count-up stats** that animate on scroll into view
- **Service cards** with hover shine effect and alternating gold/data-blue accents
- **Project showcase** with animated gold reveal bars, presented as client work
- **About section** with a live code block displaying the company config
- **Dedicated careers page** (`careers.html`) with a matching hero and status cards
- **Smooth scroll-triggered reveals** throughout every section
- **Contact section** with hover fill animations
- Custom **favicon and app icon** using the MG logo mark
- Fully **responsive** — mobile, tablet, and desktop

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, clip-path, animations) |
| Logic | Vanilla JavaScript (IntersectionObserver, RAF) |
| Fonts | Syne · Instrument Serif · DM Mono (Google Fonts) |
| Hosting | Netlify |

---

## ✦ Project Structure

```
mikael-global/
├── index.html       # Home page (served at the site root)
├── careers.html     # Careers page
├── feed.html        # Blog / updates page
├── styles.css       # CSS file
├── script.js        # JavaScript file
├── mk_logo.png      # Logo mark (favicon / app icon)
└── README.md        # You are here
```

> Deployment note: static hosts like Netlify resolve `/` to `index.html`. Keep the homepage file named exactly `index.html` so the site root loads correctly.

---

## ✦ Customisation

All content lives in `index.html`. Keep that filename unchanged for correct root-path hosting. Key areas to update:

| What | Where in the file |
|------|------------------|
| Company name / tagline | `#hero` section |
| Company description | `#about` section |
| Service offerings | `#services` section |
| Project links | `href` on `.project-item` anchors |
| Founder story | `#founder` section |
| Contact details | `#contact` section + nav links |
| Stats numbers | `data-target` attributes on `.stat-num` |
| Careers page content | `careers.html` (status, ideal fit, ways to connect cards) |

Colors are controlled via CSS variables at the top of `styles.css`:

```css
:root {
  --gold: #C9A84C;
  --bg:   #0A0A0A;
  --text: #F0EDE8;
  --glow-gold: rgba(201,168,76,0.15);
  --data-blue: #4A8DB7;
}
```

**Tweaking the 3D globe** (in `script.js`, `buildHeroGlobe()`):

| What | Where |
|------|------|
| Face text ("MK") | `label.textContent` |
| Number/spacing of longitude lines | the `[0, 30, 60, 90, 120, 150]` array |
| Number/spacing of latitude rings | the `[-60, -30, 0, 30, 60]` array |
| Auto-spin speed | `animation` duration on `.globe-spin` in `styles.css` |
| Size on screen | `.hero-globe-wrap` width/height (desktop / tablet / mobile breakpoints in `styles.css`) — geometry rebuilds automatically on resize |

---

## ✦ Projects Featured

### AI-Powered Research Assistant `2026`
Client: Academic Research · React · Node.js · MongoDB · REST API

### Full-Stack Cleaning Service Platform `2025`
Client: Professional Cleaning · HTML5 · CSS3 · JavaScript · MongoDB

---

## ✦ Contact

| | |
|--|--|
| 📧 Email | [mikaelglobal01.com](mailto:mikaelglobal01@gmail.com) |
| 📞 Phone | 0906 901 8772 |
| 📍 Location | Lagos, Nigeria (Remote) |
| 🌐 Website | mikaelglobal.netlify.app |

---

<p align="center">
  Made with ♥ in Lagos, Nigeria &nbsp;·&nbsp; © 2026 MIKAEL GLOBAL
</p>