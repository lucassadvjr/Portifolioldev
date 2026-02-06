# AI Copilot Instructions for iPortfolio

## Project Overview
This is a personal portfolio website built on the **iPortfolio Bootstrap template** (BootstrapMade). It's a static portfolio site with a PHP contact form integration, hosted on XAMPP at `c:\xampp\htdocs\portifolio`.

**Key Characteristics:**
- Single-page template with anchored navigation
- Pre-built responsive layout (Bootstrap 5.3.3)
- Limited to free tier features (SCSS, advanced PHP form validation unavailable)
- Front-end driven interactivity using vendor libraries

## Architecture

### File Structure
```
├── index.html                  # Main landing page (835 lines)
├── portfolio-details.html      # Portfolio item detail view
├── service-details.html        # Service detail view
├── starter-page.html           # Template starter page
├── forms/
│   └── contact.php            # Contact form endpoint (requires pro PHP-Email-Form library)
└── assets/
    ├── css/main.css           # Primary stylesheet (compiled CSS only)
    ├── js/main.js             # Main JavaScript (255 lines)
    ├── img/
    │   ├── portfolio/         # Portfolio item images
    │   └── testimonials/      # Testimonial avatars
    └── vendor/                # Third-party libraries
        ├── bootstrap/         # Bootstrap 5.3.3 CSS & JS
        ├── aos/              # Animate on Scroll library
        ├── glightbox/        # Image lightbox
        ├── isotope-layout/   # Portfolio grid filtering
        ├── swiper/           # Carousel slider
        ├── typed.js/         # Text typing animation
        └── waypoints/        # Scroll event detection
```

### Design Patterns

**1. Single Page Application Navigation**
- All major sections (hero, about, resume, portfolio, services, contact) use anchor links (`#hero`, `#about`, etc.)
- Mobile navigation toggle via `.header-toggle` button affects `#header` visibility
- On mobile, nav links auto-close header after click

**2. Vendor Library Integration**
- **AOS (Animate on Scroll):** Add `data-aos="fade-in"` attributes and `data-aos-delay="100"` for scroll animations
- **Typed.js:** Used for dynamic text animation in hero section; configured in `main.js` lines 33-56
- **Swiper:** Carousel implementation for testimonials/portfolio (pre-configured in vendor assets)
- **Isotope:** Portfolio filtering/masonry layout (referenced but requires HTML setup with `.isotope` class)
- **GLightbox:** Modal image viewer for portfolio items (apply to image links with `data-gallery` attribute)

**3. Dynamic Text Typing**
Located in [main.js](main.js#L33-L56), the Typed.js instance rotates Portuguese phrases:
```javascript
const frases = [
  "estudante de tecnologia",
  "desenvolvedor em formação",
  "apaixonado por aprender",
  "em busca da primeira oportunidade",
  "determinado"
];
```
Prefix changes dynamically based on phrase (`"Eu sou"` vs `"Eu estou"`).

## Key Development Workflows

### Adding Content
1. **Portfolio items:** Edit template references in `index.html` portfolio section; ensure image paths point to `assets/img/portfolio/`
2. **About/Resume sections:** Update text content directly in HTML; uses Bootstrap grid classes for layout
3. **Services:** Add new service cards following existing pattern in `#services` section

### Styling
- **No SCSS available** in free tier; only compiled CSS at `assets/css/main.css`
- Bootstrap utility classes used extensively (e.g., `d-flex`, `align-items-center`, `text-center`)
- Custom styles limited to `main.css`—recommend adding new rules there rather than inline styles

### Contact Form Integration
- Form endpoint: [forms/contact.php](forms/contact.php)
- **Limitation:** Requires `PHP_Email_Form` library (unavailable in free tier)
- To enable: Purchase pro version or manually implement email sending logic
- Expected form fields: `name`, `email`, `subject`, `message` (received as POST data)

### Mobile Responsiveness
- Hamburger menu controlled by `.header-toggle` button (hidden on screens `xl` and wider via `d-xl-none`)
- All major elements use Bootstrap responsive classes
- Test viewport changes at common breakpoints (sm, md, lg, xl)

## Project-Specific Conventions

1. **Language:** Portuguese for user-facing text (hero, navigation labels, form fields)
2. **Image Structure:** All portfolio/testimonial images go in `assets/img/{portfolio|testimonials}/`
3. **Scroll Events:** Use AOS library for animations; avoid custom scroll listeners
4. **Navigation IDs:** Section IDs match nav links (e.g., `id="portfolio"` for `href="#portfolio"`)
5. **Header State:** Toggling header visibility is managed by `header.classList.toggle('header-show')`

## External Dependencies & Limitations

| Library | Version | Free Tier | Notes |
|---------|---------|-----------|-------|
| Bootstrap | 5.3.3 | ✓ | Full CSS/JS included |
| Typed.js | Latest | ✓ | Text animation in hero |
| AOS | Latest | ✓ | Scroll animations |
| GLightbox | Latest | ✓ | Image modal viewer |
| Swiper | Latest | ✓ | Carousel/slider |
| Isotope | Latest | ✓ | Portfolio filtering (requires config) |
| SCSS/Sass | - | ✗ | Only CSS compiled version |
| PHP Email Form | - | ✗ | Contact form validation/sending |

## Common Tasks

### Task: Update hero section text/image
1. Edit `index.html` lines ~50-150 (hero section)
2. Modify image path in `<img src="assets/img/hero-bg.jpg">`
3. Update heading text within `<h2>` and `<p>` tags
4. Keep AOS attributes (`data-aos`, `data-aos-delay`) for animation consistency

### Task: Add new portfolio item
1. Duplicate existing portfolio card in `#portfolio` section
2. Update `href` to link to detail page or external URL
3. Update image path to `assets/img/portfolio/your-image.jpg`
4. Add GLightbox attributes if lightbox modal needed
5. Ensure item ID follows naming convention if filtering required

### Task: Fix responsive layout issue
1. Check Bootstrap grid classes (`col-lg-4`, `row`, etc.)
2. Verify viewport meta tag exists in `<head>`
3. Test at breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop)
4. Inspect element with browser dev tools—check for conflicting `main.css` rules

## Local Development

**Environment:** XAMPP (Apache + PHP)  
**Access:** `http://localhost/portifolio/` (assuming XAMPP docroot is `c:\xampp\htdocs`)  
**No build step required:** Directly edit HTML/CSS, refresh browser  
**For PHP form testing:** Ensure Apache is running; contact.php will fail without PHP Email Form library in pro version

## Important Notes for AI Agents

- **Template Origin:** This is a modified iPortfolio free template; many pro features are stubbed out
- **Before suggesting changes:** Check if feature exists in free tier (see Dependencies table)
- **HTML preservation:** Keep semantic structure (sections, IDs for navigation) intact
- **Avoid custom JS:** Prefer vendor libraries for animations/interactions (AOS, Typed.js, Swiper)
- **Testing:** After changes, verify mobile toggle works, scroll animations trigger, and nav links still function
