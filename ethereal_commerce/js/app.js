/**
 * LUXE — Main Application Logic
 */

// --- PRODUCT DATABASE ---
const products = [
    {
        id: 'silk-dress',
        name: 'Silk Slip Midi Dress',
        price: '$345.00',
        rating: 145,
        variant: 'Cream',
        chip: { text: 'New Arrival', class: 'chip-secondary' },
        description: 'A minimalist fashion staple. This luxurious cream-colored silk slip dress features a flattering bias cut and adjustable straps.',
        images: [
            'img/products/silk-dress_1.jpg',
            'img/products/silk-dress_2.jpg',
            'img/products/silk-dress_3.jpg',
            'img/products/silk-dress_4.jpg'
        ],
        colors: [
            { name: 'Cream', hex: '#F0EAD6' },
            { name: 'Black', hex: '#111111' }
        ]
    },
    {
        id: 'wool-blazer',
        name: 'Tailored Wool Blazer',
        price: '$495.00',
        rating: 89,
        variant: 'Charcoal',
        description: 'A professional flat lay of a tailored charcoal grey wool blazer. Crisp, directional studio lighting casts sharp but soft shadows.',
        images: [
            'img/products/wool-blazer_1.jpg',
            'img/products/wool-blazer_2.jpg',
            'img/products/wool-blazer_3.jpg',
            'img/products/wool-blazer_4.jpg'
        ],
        colors: [
            { name: 'Charcoal', hex: '#36454F' },
            { name: 'Navy', hex: '#000080' }
        ]
    },
    {
        id: 'cashmere-knit',
        name: 'Oversized Cashmere Knit',
        price: '$520.00',
        rating: 210,
        variant: 'Camel',
        chip: { text: 'Bestseller', class: 'chip-tertiary' },
        description: 'An editorial oversized cashmere knit sweater in a rich camel tone. Ribbed cuffs and a soft drape body for ultimate luxury and comfort.',
        images: [
            'img/products/cashmere-knit_1.jpg',
            'img/products/cashmere-knit_2.jpg',
            'img/products/cashmere-knit_3.jpg',
            'img/products/cashmere-knit_4.jpg'
        ],
        colors: [
            { name: 'Camel', hex: '#C19A6B' },
            { name: 'Ivory', hex: '#FFFFF0' }
        ]
    },
    {
        id: 'wide-trouser',
        name: 'Pleated Wide-Leg Trouser',
        price: '$285.00',
        rating: 74,
        variant: 'Olive',
        description: 'Wide-leg tailored trousers in a deep olive green. A modern, relaxed fit that emphasizes pleat details and fabric flow.',
        images: [
            'img/products/wide-trouser_1.jpg',
            'img/products/wide-trouser_2.jpg',
            'img/products/wide-trouser_3.jpg',
            'img/products/wide-trouser_4.jpg'
        ],
        colors: [
            { name: 'Olive', hex: '#808000' },
            { name: 'Black', hex: '#111111' }
        ]
    },
    {
        id: 'poplin-shirt',
        name: 'Poplin Boyfriend Shirt',
        price: '$195.00',
        rating: 112,
        variant: 'Optic White',
        chip: { text: 'Low Stock', class: 'chip-outline' },
        description: 'A crisp white cotton poplin button-down shirt. Presents a relaxed but professional look with minimalist, clean lines.',
        images: [
            'img/products/poplin-shirt_1.jpg',
            'img/products/poplin-shirt_2.jpg',
            'img/products/poplin-shirt_3.jpg',
            'img/products/poplin-shirt_4.jpg'
        ],
        colors: [
            { name: 'Optic White', hex: '#FFFFFF' },
            { name: 'Light Blue', hex: '#ADD8E6' }
        ]
    },
    {
        id: 'structured-tote',
        name: 'Structured Leather Tote',
        price: '$650.00',
        rating: 45,
        variant: 'Noir',
        description: 'A moody, elegant black leather structured tote bag with matte silver hardware. Refined luxury and minimalist design.',
        images: [
            'img/products/structured-tote_1.jpg',
            'img/products/structured-tote_2.jpg',
            'img/products/structured-tote_3.jpg',
            'img/products/structured-tote_4.jpg'
        ],
        colors: [
            { name: 'Noir', hex: '#111111' },
            { name: 'Cognac', hex: '#9A463D' }
        ]
    },
    {
        id: 'minimalist-trench',
        name: 'The Minimalist Trench',
        price: '$495.00',
        rating: 128,
        variant: 'Sand',
        chip: { text: 'New Arrival', class: 'chip-champagne' },
        description: 'A masterclass in restraint. This trench coat redefines classic outerwear with clean lines, hidden closures, and a fluid drape. Crafted from a water-resistant, breathable technical cotton blend.',
        images: [
            'img/products/minimalist-trench_1.jpg',
            'img/products/minimalist-trench_2.jpg',
            'img/products/minimalist-trench_3.jpg',
            'img/products/minimalist-trench_4.jpg'
        ],
        colors: [
            { name: 'Sand', hex: '#E5DCC5' },
            { name: 'Midnight', hex: '#2A2A2A' },
            { name: 'Sage', hex: '#7D8A77' }
        ]
    }
];

const curatedCategories = {
    'new-arrivals': {
        title: 'New Arrivals',
        description: 'Discover the latest objects selected for their quiet presence, beautiful materials, and lasting function.',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
        imageAlt: 'Sculptural vase and small home decor objects',
        shopHref: 'shop.html?category=new-arrivals',
        focus: ['Fresh forms', 'Natural finishes', 'Timeless utility']
    },
    textiles: {
        title: 'Textiles',
        description: 'Natural fibers and tactile layers that bring softness, warmth, and an effortless sense of comfort to your home.',
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
        imageAlt: 'Natural linen bedding and woven textiles',
        shopHref: 'shop.html?category=textiles',
        focus: ['Linen bedding', 'Woven throws', 'Everyday towels']
    },
    lighting: {
        title: 'Lighting',
        description: 'Sculptural lighting designed to create a warm atmosphere and make every corner feel considered.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
        imageAlt: 'Sculptural table lamp casting a warm glow',
        shopHref: 'shop.html?category=lighting',
        focus: ['Table lamps', 'Ambient glow', 'Architectural details']
    },
    dining: {
        title: 'Dining Essentials',
        description: 'Pieces for the modern table, made to turn simple meals and shared moments into everyday rituals.',
        image: 'https://images.unsplash.com/photo-1615865417236-d67f16812835?w=800&q=80',
        imageAlt: 'Ceramic tableware and linen for a modern table',
        shopHref: 'shop.html?category=dining',
        focus: ['Table linens', 'Serving pieces', 'Gathering essentials']
    }
};

const categoryProductAdditions = {
    'new-arrivals': [
        { id: 'travertine-bookend', name: 'Travertine Bookend', price: '$62.00', variant: 'Natural' },
        { id: 'glass-bud-vase', name: 'Handblown Glass Bud Vase', price: '$38.00', variant: 'Smoke' },
        { id: 'wool-seat-cushion', name: 'Wool Seat Cushion', price: '$74.00', variant: 'Pebble' },
        { id: 'marble-tray', name: 'Honed Marble Tray', price: '$98.00', variant: 'Cream' },
        { id: 'paper-lantern', name: 'Soft Paper Lantern', price: '$112.00', variant: 'Ivory' },
        { id: 'brass-incense-holder', name: 'Brass Incense Holder', price: '$34.00', variant: 'Brushed Brass' },
        { id: 'ash-wood-stool', name: 'Ash Wood Stool', price: '$286.00', variant: 'Natural Ash' }
    ],
    textiles: [
        { id: 'waffle-blanket', name: 'Waffle Weave Blanket', price: '$142.00', variant: 'Fog' },
        { id: 'striped-pillowcase', name: 'Striped Linen Pillowcase', price: '$42.00', variant: 'Oat Stripe' },
        { id: 'cotton-bedspread', name: 'Quilted Cotton Bedspread', price: '$198.00', variant: 'Parchment' },
        { id: 'hemp-curtain', name: 'Hemp Curtain Panel', price: '$118.00', variant: 'Natural' },
        { id: 'boucle-pillow', name: 'Boucle Cushion Cover', price: '$58.00', variant: 'Stone' },
        { id: 'linen-tablecloth', name: 'French Linen Tablecloth', price: '$136.00', variant: 'Flax' },
        { id: 'cotton-robe', name: 'Organic Cotton Robe', price: '$158.00', variant: 'Warm White' }
    ],
    lighting: [
        { id: 'ceramic-pendant', name: 'Ceramic Pendant Light', price: '$264.00', variant: 'Bone' },
        { id: 'portable-lamp', name: 'Rechargeable Portable Lamp', price: '$128.00', variant: 'Moss' },
        { id: 'floor-reading-lamp', name: 'Floor Reading Lamp', price: '$342.00', variant: 'Matte Black' },
        { id: 'glass-wall-light', name: 'Fluted Glass Wall Light', price: '$176.00', variant: 'Amber' },
        { id: 'dome-desk-lamp', name: 'Dome Desk Lamp', price: '$196.00', variant: 'Deep Green' },
        { id: 'linen-pendant', name: 'Large Linen Pendant', price: '$312.00', variant: 'Natural' },
        { id: 'brass-picture-light', name: 'Slim Brass Picture Light', price: '$148.00', variant: 'Brushed Brass' }
    ],
    dining: [
        { id: 'linen-runner', name: 'Natural Linen Table Runner', price: '$48.00', variant: 'Oat' },
        { id: 'oak-serving-board', name: 'Solid Oak Serving Board', price: '$76.00', variant: 'Natural Oak' },
        { id: 'porcelain-bowl-set', name: 'Porcelain Bowl Set', price: '$86.00', variant: 'Shell' },
        { id: 'ceramic-pitcher', name: 'Handmade Ceramic Pitcher', price: '$94.00', variant: 'Chalk' },
        { id: 'brass-salad-servers', name: 'Brass Salad Servers', price: '$62.00', variant: 'Brushed Brass' },
        { id: 'woven-placemat-set', name: 'Woven Placemat Set', price: '$58.00', variant: 'Seagrass' },
        { id: 'stoneware-mug-set', name: 'Stoneware Mug Set', price: '$74.00', variant: 'Mist' }
    ]
};

const productDisplayOrder = [
    'marble-tray',
    'linen-duvet',
    'portable-lamp',
    'oak-serving-board',
    'stoneware-vase',
    'boucle-pillow',
    'brass-task-lamp',
    'ceramic-pitcher',
    'travertine-bookend',
    'cotton-bedspread',
    'opal-table-lamp',
    'stoneware-dinner-set',
    'paper-lantern',
    'linen-tablecloth',
    'ceramic-pendant',
    'linen-runner',
    'glass-bud-vase',
    'woven-throw',
    'glass-wall-light',
    'brass-salad-servers',
    'ash-wood-stool',
    'cotton-robe',
    'floor-reading-lamp',
    'porcelain-bowl-set',
    'oak-candleholder',
    'waffle-blanket',
    'dome-desk-lamp',
    'woven-placemat-set',
    'wool-seat-cushion',
    'striped-pillowcase',
    'linen-wall-sconce',
    'stoneware-mug-set',
    'brass-incense-holder',
    'bath-towel-set',
    'linen-pendant',
    'linen-napkin-set',
    'linen-throw',
    'hemp-curtain',
    'brass-picture-light',
    'glassware-set'
];

const productImageKeywords = {
    'new-arrivals': 'minimal home decor object',
    textiles: 'linen textile home',
    lighting: 'modern lamp interior',
    dining: 'ceramic tableware dining'
};

const buildProductImages = (product) => {
    return [1, 2, 3, 4].map(view =>
        `img/products/${product.id}_${view}.jpg`
    );
};

const homeProducts = [
    { id: 'stoneware-vase', name: 'Sculptural Stoneware Vase', price: '$84.00', variant: 'Ivory', category: 'new-arrivals', description: 'A hand-finished stoneware vase with a softly sculpted silhouette.' },
    { id: 'oak-candleholder', name: 'Turned Oak Candleholder', price: '$46.00', variant: 'Natural Oak', category: 'new-arrivals', description: 'A warm oak accent, made to bring a quiet glow to the table.' },
    { id: 'linen-throw', name: 'Washed Linen Throw', price: '$128.00', variant: 'Oat', category: 'new-arrivals', description: 'Lightweight, relaxed linen for effortless everyday layering.' },
    { id: 'linen-duvet', name: 'European Flax Duvet Set', price: '$245.00', variant: 'Natural', category: 'textiles', description: 'Breathable flax linen woven for a soft, lived-in feel.' },
    { id: 'woven-throw', name: 'Woven Cotton Throw', price: '$96.00', variant: 'Sand', category: 'textiles', description: 'A textured cotton throw with an inviting, tactile finish.' },
    { id: 'bath-towel-set', name: 'Organic Bath Towel Set', price: '$72.00', variant: 'Warm White', category: 'textiles', description: 'Plush organic cotton towels for a calm daily ritual.' },
    { id: 'brass-task-lamp', name: 'Brass Task Lamp', price: '$218.00', variant: 'Black', category: 'lighting', description: 'An adjustable task lamp that balances precision with warmth.' },
    { id: 'opal-table-lamp', name: 'Opal Glass Table Lamp', price: '$186.00', variant: 'Milk', category: 'lighting', description: 'Diffused light through a softly glowing opal glass shade.' },
    { id: 'linen-wall-sconce', name: 'Linen Shade Wall Sconce', price: '$154.00', variant: 'Natural', category: 'lighting', description: 'A compact wall light with a natural linen shade.' },
    { id: 'stoneware-dinner-set', name: 'Stoneware Dinner Set', price: '$164.00', variant: 'Chalk', category: 'dining', description: 'A versatile handmade-look dinner set for everyday meals.' },
    { id: 'linen-napkin-set', name: 'Washed Linen Napkin Set', price: '$54.00', variant: 'Flax', category: 'dining', description: 'Four relaxed linen napkins for an easy, layered table.' },
    { id: 'glassware-set', name: 'Ribbed Glassware Set', price: '$68.00', variant: 'Clear', category: 'dining', description: 'Four finely ribbed glasses made for water, wine, and shared moments.' }
].concat(
    Object.entries(categoryProductAdditions).flatMap(([category, items]) =>
        items.map(product => ({ ...product, category }))
    )
).sort((a, b) => productDisplayOrder.indexOf(a.id) - productDisplayOrder.indexOf(b.id))
    .map(product => ({
        ...product,
        rating: 24,
        description: product.description || `${product.name} is a thoughtfully made piece for a calm, considered home.`,
        images: buildProductImages(product),
        colors: [{ name: product.variant, hex: '#E5DCC5' }, { name: 'Charcoal', hex: '#2A2A2A' }]
    }));

const catalogProducts = [...products, ...homeProducts];

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. DYNAMIC PRODUCT PAGE RENDERING ---
    // Extract ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    // Only render product info if we are on product.html and elements exist
    const titleEl = document.getElementById('product-title');
    if (titleEl) {
        // Default to trench if no id provided
        if (!productId) productId = 'minimalist-trench';

        const product = catalogProducts.find(p => p.id === productId);
        if (product) {
            document.title = `${product.name} - LUXE`;
            const descriptionMeta = document.querySelector('meta[name="description"]');
            if (descriptionMeta) descriptionMeta.content = product.description;

            // Update Text
            titleEl.textContent = product.name;
            const priceEl = document.getElementById('product-price');
            if (priceEl) priceEl.textContent = product.price;

            const reviewCountEl = document.getElementById('review-count');
            if (reviewCountEl) reviewCountEl.textContent = `(${product.rating} Reviews)`;

            const descEl = document.getElementById('product-desc');
            if (descEl) descEl.textContent = product.description;

            // Update Breadcrumb
            const breadcrumbEl = document.getElementById('breadcrumb-current');
            if (breadcrumbEl) breadcrumbEl.textContent = product.name;

            // Update Main Image & Chip
            const mainImg = document.getElementById('main-product-img');
            if (mainImg) {
                mainImg.src = product.images[0];
                mainImg.alt = product.name;
            }
            const mainChip = document.getElementById('main-product-chip');
            if (mainChip) {
                if (product.chip) {
                    mainChip.textContent = product.chip.text;
                    mainChip.className = `chip ${product.chip.class}`;
                    mainChip.style.display = 'inline-block';
                } else {
                    mainChip.style.display = 'none';
                }
            }

            // Build a gallery for the selected product instead of keeping
            // thumbnails from the default product page.
            const thumbnails = document.getElementById('thumbnails');
            if (thumbnails) {
                thumbnails.innerHTML = '';
                product.images.forEach((image, index) => {
                    const thumbnail = document.createElement('button');
                    thumbnail.className = `thumb ${index === 0 ? 'active' : ''}`;
                    thumbnail.dataset.index = index;
                    thumbnail.type = 'button';
                    thumbnail.innerHTML = `<img src="${image}" alt="${product.name} - view ${index + 1}" />`;
                    thumbnails.appendChild(thumbnail);
                });
            }

            // Update Colors
            const colorSwatchesContainer = document.getElementById('color-swatches');
            if (colorSwatchesContainer) {
                colorSwatchesContainer.innerHTML = '';
                product.colors.forEach((c, idx) => {
                    const btn = document.createElement('button');
                    btn.className = `color-swatch ${idx === 0 ? 'active' : ''}`;
                    btn.style.background = c.hex;
                    btn.dataset.color = c.name;
                    btn.setAttribute('aria-label', `Select ${c.name} color`);
                    colorSwatchesContainer.appendChild(btn);
                });
                const colorNameLabel = document.getElementById('color-name');
                if (colorNameLabel) colorNameLabel.textContent = product.colors[0].name;

                // Re-attach color listener
                const swatches = colorSwatchesContainer.querySelectorAll('.color-swatch');
                swatches.forEach(swatch => {
                    swatch.addEventListener('click', () => {
                        swatches.forEach(s => s.classList.remove('active'));
                        swatch.classList.add('active');
                        if (colorNameLabel) colorNameLabel.textContent = swatch.dataset.color;
                    });
                });
            }

            // Each detail page also links to other real products from the catalog.
            const relatedGrid = document.querySelector('.related-grid');
            if (relatedGrid) {
                const relatedProducts = catalogProducts
                    .filter(item => item.id !== product.id)
                    .filter(item => !product.category || item.category === product.category)
                    .slice(0, 4);
                relatedGrid.innerHTML = '';

                relatedProducts.forEach(item => {
                    const card = document.createElement('a');
                    card.className = 'related-card';
                    card.href = `product.html?id=${encodeURIComponent(item.id)}`;
                    card.innerHTML = `
                        <div class="related-card-image">
                          <img src="${item.images[0]}" alt="${item.name}" />
                          <span class="wishlist-btn" aria-label="Add ${item.name} to wishlist">
                            <span class="material-symbols-outlined" style="font-size:18px;">favorite_border</span>
                          </span>
                        </div>
                        <h3 class="related-card-name">${item.name}</h3>
                        <p class="related-card-price">${item.price}</p>`;
                    relatedGrid.appendChild(card);
                });
            }
        }
    }


    // --- 1. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // --- Category landing pages ---
    const categoryPage = document.getElementById('category-page');
    if (categoryPage) {
        const categorySlug = new URLSearchParams(window.location.search).get('category');
        const categoryKey = curatedCategories[categorySlug] ? categorySlug : 'new-arrivals';
        const category = curatedCategories[categoryKey];
        const title = document.getElementById('category-title');
        const description = document.getElementById('category-description');
        const breadcrumb = document.getElementById('category-breadcrumb');
        const hero = document.getElementById('category-hero');
        const shopLink = document.getElementById('category-shop-link');

        if (title) title.textContent = category.title;
        if (description) description.textContent = category.description;
        if (breadcrumb) breadcrumb.textContent = category.title;
        if (hero) {
            hero.style.backgroundImage = `url("${category.image}")`;
            hero.setAttribute('role', 'img');
            hero.setAttribute('aria-label', category.imageAlt);
        }
        if (shopLink) shopLink.href = category.shopHref;
        document.title = `${category.title} - LUXE`;

        const pageDescription = document.querySelector('meta[name="description"]');
        if (pageDescription) pageDescription.content = category.description;
    }

    // Use the same artwork on the all-categories landing page.
    document.querySelectorAll('.all-category-card[data-category]').forEach(card => {
        const category = curatedCategories[card.dataset.category];
        if (category) card.style.backgroundImage = `url("${category.image}")`;
    });

    // --- 2. Filter Toggles (Shop Page) ---
    const filterToggles = [
        { toggleId: 'filter-category-toggle', contentId: 'filter-category-options' },
        { toggleId: 'filter-price-toggle', contentId: 'filter-price-options' },
        { toggleId: 'filter-size-toggle', contentId: 'filter-size-options' }
    ];

    filterToggles.forEach(filter => {
        const toggleBtn = document.getElementById(filter.toggleId);
        const content = document.getElementById(filter.contentId);

        if (toggleBtn && content) {
            toggleBtn.addEventListener('click', () => {
                const icon = toggleBtn.querySelector('.material-symbols-outlined');
                if (content.style.display === 'none') {
                    content.style.display = content.dataset.displayType || 'block';
                    if (content.id === 'filter-size-options') content.style.display = 'grid';
                    if (content.id === 'filter-price-options') content.style.display = 'flex';
                    if (content.id === 'filter-category-options') content.style.display = 'flex';
                    icon.textContent = 'expand_less';
                } else {
                    content.dataset.displayType = window.getComputedStyle(content).display;
                    content.style.display = 'none';
                    icon.textContent = 'expand_more';
                }
            });
        }
    });

    // --- 3. Size Selection (Shop Sidebar & Product Page) ---
    const sizeContainers = document.querySelectorAll('.size-filter-grid, #size-grid');
    sizeContainers.forEach(container => {
        const sizeBtns = container.querySelectorAll('.size-btn:not(.disabled)');
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });

    // --- 5. Image Gallery (Product Page) ---
    const thumbnailsContainer = document.getElementById('thumbnails');
    const mainProductImg = document.getElementById('main-product-img');

    if (thumbnailsContainer && mainProductImg) {
        const thumbnails = thumbnailsContainer.querySelectorAll('.thumb');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');

                // Update main image source and alt
                const img = thumb.querySelector('img');
                if (img) {
                    mainProductImg.src = img.src;
                    mainProductImg.alt = img.alt;
                }
            });
        });
    }

    // --- 6. Quantity Selector ---
    const qtySelectors = document.querySelectorAll('.qty-selector');
    qtySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('button[aria-label="Decrease quantity"]');
        const plusBtn = selector.querySelector('button[aria-label="Increase quantity"]');
        const input = selector.querySelector('.qty-value');

        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', () => {
                let val = parseInt(input.value) || 1;
                if (val > 1) {
                    input.value = val - 1;
                }
            });

            plusBtn.addEventListener('click', () => {
                let val = parseInt(input.value) || 1;
                input.value = val + 1;
            });

            input.addEventListener('change', () => {
                let val = parseInt(input.value);
                if (isNaN(val) || val < 1) {
                    input.value = 1;
                }
            });
        }
    });

    // --- 7. Wishlist Toggles ---
    const wishlistBtns = document.querySelectorAll('.wishlist-action, .wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) {
                if (icon.textContent === 'favorite_border') {
                    icon.textContent = 'favorite';
                    icon.classList.add('filled');
                    icon.style.color = 'var(--primary)';
                } else {
                    icon.textContent = 'favorite_border';
                    icon.classList.remove('filled');
                    icon.style.color = '';
                }
            }
        });
    });

    // --- 8. Checkout Form Logic ---
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Show Success Modal
            const modal = document.getElementById('success-modal');
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    }

    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redirect to home on close
        });
    }

    // --- 9. Shop category navigation and pagination ---
    if (window.location.pathname.endsWith('shop.html') || window.location.pathname === '/shop.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const categoryMap = Object.fromEntries(
            Object.entries(curatedCategories).map(([slug, details]) => [slug, details.title])
        );
        const categoryView = categoryMap[category];
        const productGrid = document.getElementById('product-grid');
        const shopProducts = categoryView
            ? homeProducts.filter(product => product.category === category)
            : homeProducts;

        if (productGrid) {
            productGrid.innerHTML = '';
            shopProducts.forEach(product => {
                const card = document.createElement('a');
                card.className = 'product-card';
                card.href = `product.html?id=${encodeURIComponent(product.id)}`;
                card.id = product.id;
                card.dataset.category = product.category;

                const chipMarkup = product.chip
                    ? `<span class="chip ${product.chip.class}">${product.chip.text}</span>`
                    : '';

                card.innerHTML = `
                    <div class="product-card-image">
                      <img src="${product.images[0]}" alt="${product.name}" />
                      ${chipMarkup}
                      <button class="quick-add" aria-label="Quick add ${product.name} to cart">
                        <span class="material-symbols-outlined" style="font-size:20px;">shopping_bag</span>
                      </button>
                    </div>
                    <div class="product-card-info">
                      <div>
                        <h3 class="product-card-name">${product.name}</h3>
                        <p class="product-card-variant">${product.variant}</p>
                      </div>
                      <span class="product-card-price">${product.price}</span>
                    </div>`;
                productGrid.appendChild(card);
            });
        }

        const allProducts = Array.from(document.querySelectorAll('.product-card'));
        const pagination = document.getElementById('pagination');
        const productsForView = allProducts;
        const itemsPerPage = 5;
        const pageCount = Math.max(1, Math.ceil(productsForView.length / itemsPerPage));
        let currentPage = 1;

        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            const isCurrent = categoryView
                ? href === `shop.html?category=${category}`
                : href === 'shop.html';
            link.classList.toggle('active', isCurrent);
            link.toggleAttribute('aria-current', isCurrent);
            if (isCurrent) link.setAttribute('aria-current', 'page');
        });

        const pageTitle = document.querySelector('.shop-header h1');
        const breadcrumbCurrent = document.querySelector('#breadcrumbs .current');
        const itemCount = document.querySelector('.shop-header .body-md');
        const viewTitle = categoryView || 'Shop All';
        if (pageTitle) pageTitle.textContent = viewTitle;
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = viewTitle;
        if (itemCount) {
            const count = productsForView.length;
            itemCount.textContent = `Showing ${count} ${count === 1 ? 'item' : 'items'}`;
        }
        document.title = `${viewTitle} - LUXE`;

        document.querySelectorAll('#filter-category-options input[data-category]').forEach(input => {
            input.checked = input.dataset.category === category;
            input.addEventListener('change', () => {
                window.location.href = input.checked
                    ? `shop.html?category=${encodeURIComponent(input.dataset.category)}`
                    : 'shop.html';
            });
        });

        const showPage = (page) => {
            currentPage = Math.min(Math.max(page, 1), pageCount);
            const firstItem = (currentPage - 1) * itemsPerPage;
            const cardsOnPage = productsForView.slice(firstItem, firstItem + itemsPerPage);

            allProducts.forEach(card => {
                card.style.display = cardsOnPage.includes(card) ? 'block' : 'none';
            });
            if (itemCount) {
                const firstVisible = firstItem + 1;
                const lastVisible = Math.min(firstItem + itemsPerPage, productsForView.length);
                itemCount.textContent = productsForView.length === 1
                    ? 'Showing 1 of 1 item'
                    : `Showing ${firstVisible}-${lastVisible} of ${productsForView.length} items`;
            }
            renderPagination();
        };

        const createPageButton = (page) => {
            const button = document.createElement('button');
            button.className = `page-btn ${page === currentPage ? 'active' : ''}`;
            button.type = 'button';
            button.textContent = page;
            button.setAttribute('aria-label', `Page ${page}`);
            if (page === currentPage) button.setAttribute('aria-current', 'page');
            button.addEventListener('click', () => showPage(page));
            return button;
        };

        const createArrowButton = (direction) => {
            const isPrevious = direction === 'previous';
            const button = document.length ? 'page-arrow' : 'page-arrow';
            const buttonEl = document.createElement('button');
            buttonEl.className = 'page-arrow';
            buttonEl.type = 'button';
            buttonEl.disabled = isPrevious ? currentPage === 1 : currentPage === pageCount;
            buttonEl.setAttribute('aria-label', isPrevious ? 'Previous page' : 'Next page');
            buttonEl.innerHTML = `<span class="material-symbols-outlined">${isPrevious ? 'chevron_left' : 'chevron_right'}</span>`;
            buttonEl.addEventListener('click', () => showPage(currentPage + (isPrevious ? -1 : 1)));
            return buttonEl;
        };

        const renderPagination = () => {
            if (!pagination) return;
            pagination.innerHTML = '';
            pagination.appendChild(createArrowButton('previous'));
            for (let page = 1; page <= pageCount; page += 1) {
                pagination.appendChild(createPageButton(page));
            }
            pagination.appendChild(createArrowButton('next'));
            pagination.hidden = pageCount === 1;
        };

        showPage(1);
    }

});