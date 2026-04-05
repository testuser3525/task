# Dressup Task

A static product page built with vanilla HTML, CSS, and JavaScript-no frameworks or build tools required.

## Project Structure

```
├── index.html
├── styles/
│   ├── base/
│   │   ├── variables.css     # Design tokens
│   │   ├── base.css
│   │   ├── fonts.css
│   │   └── normalize.css
│   ├── components/           # Per-component stylesheets
│   └── main.css              # Entry point, imports all styles
├── scripts/
│   ├── main.js               # Entry point, wires up all modules
│   ├── accordion.js
│   ├── cart.js
│   ├── drawer.js
│   ├── gallery-modal.js
│   ├── gallery-swiper.js
│   ├── mobile-nav.js
│   ├── product-options.js
│   ├── related-products.js
│   ├── viewport.js
│   ├── wishlist.js
│   └── static-data.js
└── assets/
    ├── icons/
    └── images/
```

### Modular JavaScript

Each interactive behavior lives in its own ES module that exports a single `setup*` function. `main.js` imports and calls them all after `DOMContentLoaded`. This keeps concerns separated without needing a bundler - the browser handles ES module resolution directly.

### Hardcoded vs JS-rendered HTML

Some sections of the page are static HTML in `index.html`, while others (e.g. product options) are built dynamically via JavaScript. The reason is drawer teleportation: components that need to appear inside the drawer when on mobile can't simply be moved with CSS - their markup has to be injected into the drawer's DOM at the right time. JavaScript-rendered sections make that straightforward; hardcoded sections stay static because they never need to relocate.

### Why not Web Components

The initial plan was to model each UI piece as a custom element. It turned out to be more overhead than the task warranted - the Shadow DOM boundary complicated sharing design tokens, and the lifecycle callbacks added boilerplate for what are essentially one-off UI behaviors. Plain functions operating on semantic HTML achieved the same result with far less ceremony.
