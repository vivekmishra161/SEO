# UrbanVibe – Streetwear Brand Website

A minimal, SEO-ready multi-page website for the Gen Z fashion brand **UrbanVibe**.

## Pages

| Page        | File                        |
|-------------|------------------------------|
| Home        | `index.html`                |
| Shop        | `pages/shop.html`           |
| About       | `pages/about.html`          |
| Contact     | `pages/contact.html`        |
| Cart        | `pages/cart.html`           |

## File Structure

```
urbanvibe/
├── index.html          ← Homepage
├── server.js           ← Node.js static server
├── sitemap.xml         ← SEO sitemap
├── robots.txt          ← SEO robots file
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← All JavaScript
└── pages/
    ├── shop.html
    ├── about.html
    ├── contact.html
    └── cart.html
```

## Run Locally (Node.js)

```bash
# No npm install needed — uses built-in http module
node server.js
# Open: http://localhost:3000
```

## Or open directly

Just double-click `index.html` in your browser. All links work relatively.

## SEO Features

- Unique `<title>` and `<meta description>` per page
- `<meta name="robots" content="index, follow">` where appropriate
- `<link rel="canonical">` on each page
- Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Proper heading hierarchy (h1 → h2 → h3)
- `aria-label` and `aria-labelledby` for accessibility
- `sitemap.xml` with all pages
- `robots.txt` with sitemap reference
- Open Graph tags (og:title, og:description)
- Structured keywords per page
- Cart page marked `noindex` (not useful for search)

## Features

- ✅ Sticky navbar with scroll effect
- ✅ Mobile hamburger menu
- ✅ Smooth scroll reveal animations
- ✅ Live countdown timer (limited drops)
- ✅ Working cart (localStorage)
- ✅ Add to cart / remove / quantity controls
- ✅ Coupon code: `VIBE10` for 10% off
- ✅ Email subscription form
- ✅ Product filter tabs (Shop page)
- ✅ Sort by price / newest
- ✅ Toast notifications
- ✅ Responsive for mobile, tablet, desktop
