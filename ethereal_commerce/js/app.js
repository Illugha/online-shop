/**
 * LUXE — Main Application Logic
 */

// =====================================================
// PRODUCT DATABASE
// =====================================================

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


// =====================================================
// CURATED CATEGORIES
// =====================================================

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


// =====================================================
// CATEGORY PRODUCT ADDITIONS
// =====================================================

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


// =====================================================
// PRODUCT DISPLAY ORDER
// =====================================================

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


// =====================================================
// IMAGE HELPERS
// =====================================================

const productImageKeywords = {
    'new-arrivals': 'minimal home decor object',
    textiles: 'linen textile home',
    lighting: 'modern lamp interior',
    dining: 'ceramic tableware dining'
};

const buildProductImages = (product) => {
    return [1, 2, 3, 4].map(
        view => `img/products/${product.id}_${view}.jpg`
    );
};


// =====================================================
// HOME PRODUCTS
// =====================================================

const homeProducts = [
    {
        id: 'stoneware-vase',
        name: 'Sculptural Stoneware Vase',
        price: '$84.00',
        variant: 'Ivory',
        category: 'new-arrivals',
        description: 'A hand-finished stoneware vase with a softly sculpted silhouette.'
    },

    {
        id: 'oak-candleholder',
        name: 'Turned Oak Candleholder',
        price: '$46.00',
        variant: 'Natural Oak',
        category: 'new-arrivals',
        description: 'A warm oak accent, made to bring a quiet glow to the table.'
    },

    {
        id: 'linen-throw',
        name: 'Washed Linen Throw',
        price: '$128.00',
        variant: 'Oat',
        category: 'new-arrivals',
        description: 'Lightweight, relaxed linen for effortless everyday layering.'
    },

    {
        id: 'linen-duvet',
        name: 'European Flax Duvet Set',
        price: '$245.00',
        variant: 'Natural',
        category: 'textiles',
        description: 'Breathable flax linen woven for a soft, lived-in feel.'
    },

    {
        id: 'woven-throw',
        name: 'Woven Cotton Throw',
        price: '$96.00',
        variant: 'Sand',
        category: 'textiles',
        description: 'A textured cotton throw with an inviting, tactile finish.'
    },

    {
        id: 'bath-towel-set',
        name: 'Organic Bath Towel Set',
        price: '$72.00',
        variant: 'Warm White',
        category: 'textiles',
        description: 'Plush organic cotton towels for a calm daily ritual.'
    },

    {
        id: 'brass-task-lamp',
        name: 'Brass Task Lamp',
        price: '$218.00',
        variant: 'Black',
        category: 'lighting',
        description: 'An adjustable task lamp that balances precision with warmth.'
    },

    {
        id: 'opal-table-lamp',
        name: 'Opal Glass Table Lamp',
        price: '$186.00',
        variant: 'Milk',
        category: 'lighting',
        description: 'Diffused light through a softly glowing opal glass shade.'
    },

    {
        id: 'linen-wall-sconce',
        name: 'Linen Shade Wall Sconce',
        price: '$154.00',
        variant: 'Natural',
        category: 'lighting',
        description: 'A compact wall light with a natural linen shade.'
    },

    {
        id: 'stoneware-dinner-set',
        name: 'Stoneware Dinner Set',
        price: '$164.00',
        variant: 'Chalk',
        category: 'dining',
        description: 'A versatile handmade-look dinner set for everyday meals.'
    },

    {
        id: 'linen-napkin-set',
        name: 'Washed Linen Napkin Set',
        price: '$54.00',
        variant: 'Flax',
        category: 'dining',
        description: 'Four relaxed linen napkins for an easy, layered table.'
    },

    {
        id: 'glassware-set',
        name: 'Ribbed Glassware Set',
        price: '$68.00',
        variant: 'Clear',
        category: 'dining',
        description: 'Four finely ribbed glasses made for water, wine, and shared moments.'
    }

]
    .concat(
        Object.entries(
            categoryProductAdditions
        ).flatMap(
            ([category, items]) =>
                items.map(product => ({
                    ...product,
                    category
                }))
        )
    )
    .sort((a, b) => {

        const aIndex =
            productDisplayOrder.indexOf(a.id);

        const bIndex =
            productDisplayOrder.indexOf(b.id);

        return (
            (aIndex === -1 ? 999 : aIndex) -
            (bIndex === -1 ? 999 : bIndex)
        );
    })
    .map(product => ({

        ...product,

        rating: 24,

        description:
            product.description ||
            `${product.name} is a thoughtfully made piece for a calm, considered home.`,

        images:
            buildProductImages(product),

        colors: [
            {
                name: product.variant,
                hex: '#E5DCC5'
            },
            {
                name: 'Charcoal',
                hex: '#2A2A2A'
            }
        ]
    }));


const catalogProducts = [
    ...products,
    ...homeProducts
];


// =====================================================
// SALE SYSTEM
// =====================================================

const SALE_DISCOUNTS = {
    'portable-lamp': 25,
    'linen-duvet': 15,
    'stoneware-vase': 20,
    'boucle-pillow': 15,
    'brass-task-lamp': 10,
    'ceramic-pitcher': 20,
    'opal-table-lamp': 15,
    'stoneware-dinner-set': 20,
    'woven-throw': 10,
    'bath-towel-set': 15
};

function getNumericPrice(price) {
    return Number(
        String(price)
            .replace('$', '')
            .replace(/,/g, '')
            .trim()
    ) || 0;
}

function formatMoney(value) {
    return `$${Number(value).toFixed(2)}`;
}

function getSaleDiscount(product) {
    if (!product) {
        return 0;
    }

    return Number(
        SALE_DISCOUNTS[product.id] || 0
    );
}

function isProductOnSale(product) {
    return getSaleDiscount(product) > 0;
}

function getSalePrice(product) {
    const originalPrice = getNumericPrice(product.price);
    const discount = getSaleDiscount(product);

    if (!discount) {
        return originalPrice;
    }

    return originalPrice * (1 - discount / 100);
}

function getSaleBadgeMarkup(product) {
    const discount = getSaleDiscount(product);

    if (!discount) {
        return '';
    }

    return `
        <span class="chip chip-sale">
            SALE -${discount}%
        </span>
    `;
}

function getProductPriceMarkup(product) {
    const discount = getSaleDiscount(product);

    if (!discount) {
        return `
            <span class="product-card-price">
                ${product.price}
            </span>
        `;
    }

    return `
        <div class="product-card-price sale-price">
            <span class="old-price">
                ${product.price}
            </span>

            <span class="new-price">
                ${formatMoney(getSalePrice(product))}
            </span>
        </div>
    `;
}
function getNumericPrice(price) {

    return Number(
        String(price)
            .replace('$', '')
            .replace(/,/g, '')
            .trim()
    ) || 0;
}


function formatMoney(value) {

    return `$${Number(value).toFixed(2)}`;
}


function getSaleDiscount(product) {

    if (!product) {
        return 0;
    }

    return Number(
        SALE_DISCOUNTS[product.id] || 0
    );
}


function isProductOnSale(product) {

    return (
        getSaleDiscount(product) >
        0
    );
}


function getSalePrice(product) {

    const originalPrice =
        getNumericPrice(
            product.price
        );

    const discount =
        getSaleDiscount(product);


    if (!discount) {
        return originalPrice;
    }


    return originalPrice *
        (1 - discount / 100);
}


function getSaleBadgeMarkup(product) {

    const discount =
        getSaleDiscount(product);


    if (!discount) {
        return '';
    }


    return `
        <span class="chip chip-sale">
            SALE -${discount}%
        </span>
    `;
}


function getProductPriceMarkup(product) {

    const discount =
        getSaleDiscount(product);


    if (!discount) {

        return `
            <span class="product-card-price">
                ${product.price}
            </span>
        `;
    }


    return `
        <div
            class="product-card-price sale-price"
        >

            <span class="old-price">
                ${product.price}
            </span>

            <span class="new-price">
                ${formatMoney(
        getSalePrice(product)
    )}
            </span>

        </div>
    `;
}


// =====================================================
// CART SYSTEM
// =====================================================

const CART_KEY = 'luxeCart';


function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(
                CART_KEY
            )
        ) || [];

    } catch (error) {

        console.error(
            'LUXE: Error reading cart',
            error
        );

        return [];
    }
}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}


function updateCartBadge() {

    const cart =
        getCart();


    const count =
        cart.reduce(
            (total, item) =>
                total +
                Number(
                    item.quantity || 0
                ),
            0
        );


    document
        .querySelectorAll(
            '.cart-badge'
        )
        .forEach(
            badge => {

                badge.textContent =
                    count;


                badge.style.display =
                    count > 0
                        ? 'flex'
                        : 'none';
            }
        );
}


function addToCart(
    product,
    quantity = 1,
    variant = null
) {

    if (!product) {

        console.error(
            'LUXE: Product not found'
        );

        return;
    }


    const cart =
        getCart();


    const selectedVariant =
        variant ||
        product.variant ||
        'Default';


    const existingItem =
        cart.find(
            item =>
                String(item.id) ===
                String(product.id) &&
                String(
                    item.variant
                ) ===
                String(
                    selectedVariant
                )
        );


    const currentPrice =
        isProductOnSale(product)
            ? formatMoney(
                getSalePrice(product)
            )
            : product.price;


    if (existingItem) {

        existingItem.quantity +=
            Number(quantity);


        // Update price in case
        // sale price has changed
        existingItem.price =
            currentPrice;

        existingItem.originalPrice =
            product.price;

        existingItem.discount =
            getSaleDiscount(product);

    } else {

        cart.push({

            id:
                product.id,

            name:
                product.name,

            price:
                currentPrice,

            originalPrice:
                product.price,

            discount:
                getSaleDiscount(product),

            variant:
                selectedVariant,

            image:
                product.images?.[0] ||
                '',

            quantity:
                Number(quantity) ||
                1
        });
    }


    saveCart(
        cart
    );


    updateCartBadge();


    showCartMessage(
        `${product.name} added to cart`
    );
}


function showCartMessage(message) {

    let toast =
        document.getElementById(
            'luxe-cart-toast'
        );


    if (!toast) {

        toast =
            document.createElement(
                'div'
            );


        toast.id =
            'luxe-cart-toast';


        toast.style.position =
            'fixed';

        toast.style.right =
            '24px';

        toast.style.bottom =
            '24px';

        toast.style.zIndex =
            '99999';

        toast.style.padding =
            '14px 20px';

        toast.style.background =
            '#171717';

        toast.style.color =
            '#ffffff';

        toast.style.borderRadius =
            '4px';

        toast.style.fontSize =
            '14px';

        toast.style.boxShadow =
            '0 10px 30px rgba(0,0,0,.18)';

        toast.style.transition =
            'opacity .25s ease';


        document.body.appendChild(
            toast
        );
    }


    toast.textContent =
        message;


    toast.style.opacity =
        '1';


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(
            () => {

                toast.style.opacity =
                    '0';

            },
            1800
        );
}


// Global access
window.getCart =
    getCart;

window.saveCart =
    saveCart;

window.addToCart =
    addToCart;

window.updateCartBadge =
    updateCartBadge;

window.getSaleDiscount =
    getSaleDiscount;

window.getSalePrice =
    getSalePrice;

window.isProductOnSale =
    isProductOnSale;

window.getNumericPrice =
    getNumericPrice;

window.formatMoney =
    formatMoney;

window.catalogProducts =
    catalogProducts;

window.products =
    products;


// =====================================================
// DOM CONTENT LOADED
// =====================================================

document.addEventListener(
    'DOMContentLoaded',
    () => {
        // =====================================================
        // IMAGE ZOOM LENS INITIALIZATION
        // =====================================================
        function initImageZoom() {
            const img = document.getElementById('main-product-img');
            const lens = document.getElementById('zoom-lens');
            const result = document.getElementById('zoom-result');
            const container = document.getElementById('main-image');

            if (!img || !lens || !result || !container) return;

            // Размер линзы
            const LENS_SIZE = 140;
            lens.style.width = LENS_SIZE + 'px';
            lens.style.height = LENS_SIZE + 'px';

            // Функция вычисляет точный размер и отступы фото внутри контейнера (из-за object-fit)
            function getRenderedImageDetails() {
                if (!img.naturalWidth || !img.naturalHeight) {
                    return {
                        width: img.offsetWidth,
                        height: img.offsetHeight,
                        left: 0,
                        top: 0
                    };
                }

                const naturalRatio = img.naturalWidth / img.naturalHeight;
                const containerWidth = img.offsetWidth;
                const containerHeight = img.offsetHeight;
                const containerRatio = containerWidth / containerHeight;

                let renderWidth = containerWidth;
                let renderHeight = containerHeight;
                let offsetX = 0;
                let offsetY = 0;

                if (containerRatio > naturalRatio) {
                    renderWidth = containerHeight * naturalRatio;
                    offsetX = (containerWidth - renderWidth) / 2;
                } else {
                    renderHeight = containerWidth / naturalRatio;
                    offsetY = (containerHeight - renderHeight) / 2;
                }

                return {
                    width: renderWidth,
                    height: renderHeight,
                    left: offsetX,
                    top: offsetY
                };
            }

            function updateZoomBackground() {
                result.style.backgroundImage = `url("${img.src}")`;
            }

            function moveLens(e) {
                e.preventDefault();
                const rect = img.getBoundingClientRect();
                const rendered = getRenderedImageDetails();

                // Положение мыши относительно контейнера
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                // Центрируем линзу на курсоре
                let x = mouseX - (LENS_SIZE / 2);
                let y = mouseY - (LENS_SIZE / 2);

                // Ограничиваем движение линзы СТРОГО видимой частью картинки
                const minX = rendered.left;
                const maxX = rendered.left + rendered.width - LENS_SIZE;
                const minY = rendered.top;
                const maxY = rendered.top + rendered.height - LENS_SIZE;

                if (x < minX) x = minX;
                if (x > maxX) x = maxX;
                if (y < minY) y = minY;
                if (y > maxY) y = maxY;

                lens.style.left = x + 'px';
                lens.style.top = y + 'px';

                // Коэффициент масштаба
                const cx = result.offsetWidth / LENS_SIZE;
                const cy = result.offsetHeight / LENS_SIZE;

                // Размер фона и смещение (с учетом отступов rendered.left и rendered.top)
                result.style.backgroundSize = `${rendered.width * cx}px ${rendered.height * cy}px`;

                const bgX = (x - rendered.left) * cx;
                const bgY = (y - rendered.top) * cy;

                result.style.backgroundPosition = `-${bgX}px -${bgY}px`;
            }

            container.addEventListener('mouseenter', () => {
                if (window.innerWidth <= 1024) return;
                updateZoomBackground();
                lens.style.display = 'block';
                result.style.display = 'block';
            });

            container.addEventListener('mouseleave', () => {
                lens.style.display = 'none';
                result.style.display = 'none';
            });

            container.addEventListener('mousemove', moveLens);
        }

        initImageZoom();

        updateCartBadge();


        // =================================================
        // PRODUCT PAGE
        // =================================================

        const urlParams =
            new URLSearchParams(
                window.location.search
            );


        let productId =
            urlParams.get('id');


        const titleEl =
            document.getElementById(
                'product-title'
            );


        if (titleEl) {

            if (!productId) {

                productId =
                    'minimalist-trench';
            }


            const product =
                catalogProducts.find(
                    p =>
                        p.id ===
                        productId
                );


            if (product) {

                document.title =
                    `${product.name} - LUXE`;


                const descriptionMeta =
                    document.querySelector(
                        'meta[name="description"]'
                    );


                if (descriptionMeta) {

                    descriptionMeta.content =
                        product.description;
                }


                titleEl.textContent =
                    product.name;


                // -----------------------------------------
                // PRICE
                // -----------------------------------------

                const priceEl =
                    document.getElementById(
                        'product-price'
                    );


                if (priceEl) {

                    if (
                        isProductOnSale(
                            product
                        )
                    ) {

                        priceEl.innerHTML = `

                            <span
                                class="product-old-price"
                            >
                                ${product.price}
                            </span>

                            <span
                                class="product-sale-price"
                            >
                                ${formatMoney(
                            getSalePrice(product)
                        )}
                            </span>

                        `;

                    } else {

                        priceEl.textContent =
                            product.price;
                    }
                }


                // -----------------------------------------
                // REVIEWS
                // -----------------------------------------

                const reviewCountEl =
                    document.getElementById(
                        'review-count'
                    );


                if (reviewCountEl) {

                    reviewCountEl.textContent =
                        `(${product.rating} Reviews)`;
                }


                // -----------------------------------------
                // DESCRIPTION
                // -----------------------------------------

                const descEl =
                    document.getElementById(
                        'product-desc'
                    );


                if (descEl) {

                    descEl.textContent =
                        product.description;
                }


                // -----------------------------------------
                // BREADCRUMB
                // -----------------------------------------

                const breadcrumbEl =
                    document.getElementById(
                        'breadcrumb-current'
                    );


                if (breadcrumbEl) {

                    breadcrumbEl.textContent =
                        product.name;
                }


                // -----------------------------------------
                // MAIN IMAGE
                // -----------------------------------------

                const mainImg =
                    document.getElementById(
                        'main-product-img'
                    );


                if (mainImg) {

                    mainImg.src =
                        product.images[0];

                    mainImg.alt =
                        product.name;
                }


                // -----------------------------------------
                // SALE CHIP
                // -----------------------------------------

                const mainChip =
                    document.getElementById(
                        'main-product-chip'
                    );


                if (mainChip) {

                    if (product.chip) {

                        mainChip.textContent =
                            product.chip.text;

                        mainChip.className =
                            `chip ${product.chip.class}`;

                        mainChip.style.display =
                            'inline-block';

                    } else {

                        mainChip.style.display =
                            'none';
                    }


                    // Add small Sale chip
                    // if product is discounted
                    const discount =
                        getSaleDiscount(
                            product
                        );


                    if (
                        discount >
                        0
                    ) {

                        mainChip.textContent =
                            `SALE -${discount}%`;

                        mainChip.className =
                            'chip chip-sale';

                        mainChip.style.display =
                            'inline-block';
                    }
                }


                // -----------------------------------------
                // GALLERY
                // -----------------------------------------

                const thumbnails =
                    document.getElementById(
                        'thumbnails'
                    );


                if (thumbnails) {

                    thumbnails.innerHTML =
                        '';


                    product.images.forEach(
                        (image, index) => {

                            const thumbnail =
                                document.createElement(
                                    'button'
                                );


                            thumbnail.className =
                                `thumb ${index === 0
                                    ? 'active'
                                    : ''
                                }`;


                            thumbnail.dataset.index =
                                index;


                            thumbnail.type =
                                'button';


                            thumbnail.innerHTML = `
                                <img
                                    src="${image}"
                                    alt="${product.name} - view ${index + 1}"
                                />
                            `;


                            thumbnails.appendChild(
                                thumbnail
                            );
                        }
                    );
                }


                // -----------------------------------------
                // COLORS
                // -----------------------------------------

                const colorSwatchesContainer =
                    document.getElementById(
                        'color-swatches'
                    );


                if (
                    colorSwatchesContainer
                ) {

                    colorSwatchesContainer.innerHTML =
                        '';


                    product.colors.forEach(
                        (color, index) => {

                            const button =
                                document.createElement(
                                    'button'
                                );


                            button.className =
                                `color-swatch ${index === 0
                                    ? 'active'
                                    : ''
                                }`;


                            button.style.background =
                                color.hex;


                            button.dataset.color =
                                color.name;


                            button.setAttribute(
                                'aria-label',
                                `Select ${color.name} color`
                            );


                            colorSwatchesContainer
                                .appendChild(
                                    button
                                );
                        }
                    );


                    const colorNameLabel =
                        document.getElementById(
                            'color-name'
                        );


                    if (colorNameLabel) {

                        colorNameLabel.textContent =
                            product.colors[0].name;
                    }


                    colorSwatchesContainer
                        .querySelectorAll(
                            '.color-swatch'
                        )
                        .forEach(
                            swatch => {

                                swatch.addEventListener(
                                    'click',
                                    () => {

                                        colorSwatchesContainer
                                            .querySelectorAll(
                                                '.color-swatch'
                                            )
                                            .forEach(
                                                item =>
                                                    item.classList
                                                        .remove(
                                                            'active'
                                                        )
                                            );


                                        swatch.classList.add(
                                            'active'
                                        );


                                        if (
                                            colorNameLabel
                                        ) {

                                            colorNameLabel
                                                .textContent =
                                                swatch.dataset
                                                    .color;
                                        }
                                    }
                                );
                            }
                        );
                }


                // -----------------------------------------
                // RELATED PRODUCTS
                // -----------------------------------------

                const relatedGrid =
                    document.querySelector(
                        '.related-grid'
                    );


                if (relatedGrid) {

                    const relatedProducts =
                        catalogProducts
                            .filter(
                                item =>
                                    item.id !==
                                    product.id
                            )
                            .filter(
                                item =>
                                    !product.category ||
                                    item.category ===
                                    product.category
                            )
                            .slice(
                                0,
                                4
                            );


                    relatedGrid.innerHTML =
                        '';


                    relatedProducts.forEach(
                        item => {

                            const card =
                                document.createElement(
                                    'a'
                                );


                            card.className =
                                'related-card';


                            card.href =
                                `product.html?id=${encodeURIComponent(
                                    item.id
                                )}`;


                            card.innerHTML = `
                                <div class="related-card-image">

                                    <img
                                        src="${item.images[0]}"
                                        alt="${item.name}"
                                    />

                                    <button
                                        type="button"
                                        class="wishlist-btn"
                                        aria-label="Add ${item.name} to wishlist"
                                    >

                                        <span
                                            class="material-symbols-outlined"
                                            style="font-size:18px;"
                                        >
                                            favorite_border
                                        </span>

                                    </button>

                                </div>

                                <h3
                                    class="related-card-name"
                                >
                                    ${item.name}
                                </h3>

                                <p
                                    class="related-card-price"
                                >
                                    ${isProductOnSale(
                                item
                            )
                                    ? formatMoney(
                                        getSalePrice(
                                            item
                                        )
                                    )
                                    : item.price
                                }
                                </p>
                            `;


                            relatedGrid.appendChild(
                                card
                            );
                        }
                    );
                }
            }
        }


        // =================================================
        // MOBILE MENU
        // =================================================

        const menuToggle =
            document.getElementById(
                'menu-toggle'
            );


        const navLinks =
            document.getElementById(
                'nav-links'
            );


        if (
            menuToggle &&
            navLinks
        ) {

            menuToggle.addEventListener(
                'click',
                () => {

                    navLinks.classList.toggle(
                        'open'
                    );
                }
            );
        }


        // =================================================
        // CATEGORY LANDING PAGE
        // =================================================

        const categoryPage =
            document.getElementById(
                'category-page'
            );


        if (categoryPage) {

            const categorySlug =
                new URLSearchParams(
                    window.location.search
                ).get('category');


            const categoryKey =
                curatedCategories[
                    categorySlug
                ]
                    ? categorySlug
                    : 'new-arrivals';


            const category =
                curatedCategories[
                categoryKey
                ];


            const title =
                document.getElementById(
                    'category-title'
                );


            const description =
                document.getElementById(
                    'category-description'
                );


            const breadcrumb =
                document.getElementById(
                    'category-breadcrumb'
                );


            const hero =
                document.getElementById(
                    'category-hero'
                );


            const shopLink =
                document.getElementById(
                    'category-shop-link'
                );


            if (title) {

                title.textContent =
                    category.title;
            }


            if (description) {

                description.textContent =
                    category.description;
            }


            if (breadcrumb) {

                breadcrumb.textContent =
                    category.title;
            }


            if (hero) {

                hero.style.backgroundImage =
                    `url("${category.image}")`;

                hero.setAttribute(
                    'role',
                    'img'
                );

                hero.setAttribute(
                    'aria-label',
                    category.imageAlt
                );
            }


            if (shopLink) {

                shopLink.href =
                    category.shopHref;
            }


            document.title =
                `${category.title} - LUXE`;


            const pageDescription =
                document.querySelector(
                    'meta[name="description"]'
                );


            if (pageDescription) {

                pageDescription.content =
                    category.description;
            }
        }


        // =================================================
        // ALL CATEGORY CARDS
        // =================================================

        document
            .querySelectorAll(
                '.all-category-card[data-category]'
            )
            .forEach(
                card => {

                    const category =
                        curatedCategories[
                        card.dataset.category
                        ];


                    if (category) {

                        card.style.backgroundImage =
                            `url("${category.image}")`;
                    }
                }
            );


        // =================================================
        // FILTER TOGGLES
        // =================================================

        const filterToggles = [

            {
                toggleId:
                    'filter-category-toggle',
                contentId:
                    'filter-category-options'
            },

            {
                toggleId:
                    'filter-price-toggle',
                contentId:
                    'filter-price-options'
            },

            {
                toggleId:
                    'filter-size-toggle',
                contentId:
                    'filter-size-options'
            }

        ];


        filterToggles.forEach(
            filter => {

                const toggleBtn =
                    document.getElementById(
                        filter.toggleId
                    );


                const content =
                    document.getElementById(
                        filter.contentId
                    );


                if (
                    toggleBtn &&
                    content
                ) {

                    toggleBtn.addEventListener(
                        'click',
                        () => {

                            const icon =
                                toggleBtn.querySelector(
                                    '.material-symbols-outlined'
                                );


                            if (
                                content.style.display ===
                                'none'
                            ) {

                                content.style.display =
                                    content.dataset
                                        .displayType ||
                                    'block';


                                if (
                                    content.id ===
                                    'filter-size-options'
                                ) {

                                    content.style.display =
                                        'grid';
                                }


                                if (
                                    content.id ===
                                    'filter-price-options'
                                ) {

                                    content.style.display =
                                        'flex';
                                }


                                if (
                                    content.id ===
                                    'filter-category-options'
                                ) {

                                    content.style.display =
                                        'flex';
                                }


                                if (icon) {

                                    icon.textContent =
                                        'expand_less';
                                }

                            } else {

                                content.dataset
                                    .displayType =
                                    window.getComputedStyle(
                                        content
                                    ).display;


                                content.style.display =
                                    'none';


                                if (icon) {

                                    icon.textContent =
                                        'expand_more';
                                }
                            }
                        }
                    );
                }
            }
        );


        // =================================================
        // SIZE SELECTOR
        // =================================================

        const sizeContainers =
            document.querySelectorAll(
                '.size-filter-grid, #size-grid'
            );


        sizeContainers.forEach(
            container => {

                const sizeBtns =
                    container.querySelectorAll(
                        '.size-btn:not(.disabled)'
                    );


                sizeBtns.forEach(
                    btn => {

                        btn.addEventListener(
                            'click',
                            () => {

                                sizeBtns.forEach(
                                    item =>
                                        item.classList
                                            .remove(
                                                'active'
                                            )
                                );


                                btn.classList.add(
                                    'active'
                                );
                            }
                        );
                    }
                );
            }
        );


        // =================================================
        // IMAGE GALLERY
        // =================================================

        const thumbnailsContainer =
            document.getElementById(
                'thumbnails'
            );


        const mainProductImg =
            document.getElementById(
                'main-product-img'
            );


        if (
            thumbnailsContainer &&
            mainProductImg
        ) {

            thumbnailsContainer
                .querySelectorAll(
                    '.thumb'
                )
                .forEach(
                    thumb => {

                        thumb.addEventListener(
                            'click',
                            () => {

                                thumbnailsContainer
                                    .querySelectorAll(
                                        '.thumb'
                                    )
                                    .forEach(
                                        item =>
                                            item.classList
                                                .remove(
                                                    'active'
                                                )
                                    );


                                thumb.classList.add(
                                    'active'
                                );


                                const img =
                                    thumb.querySelector(
                                        'img'
                                    );


                                if (img) {

                                    mainProductImg.src =
                                        img.src;

                                    mainProductImg.alt =
                                        img.alt;
                                }
                            }
                        );
                    }
                );
        }


        // =================================================
        // QUANTITY SELECTOR
        // =================================================

        const qtySelectors =
            document.querySelectorAll(
                '.qty-selector'
            );


        qtySelectors.forEach(
            selector => {

                const minusBtn =
                    selector.querySelector(
                        'button[aria-label="Decrease quantity"]'
                    );


                const plusBtn =
                    selector.querySelector(
                        'button[aria-label="Increase quantity"]'
                    );


                const input =
                    selector.querySelector(
                        '.qty-value'
                    );


                if (
                    minusBtn &&
                    plusBtn &&
                    input
                ) {

                    minusBtn.addEventListener(
                        'click',
                        () => {

                            let value =
                                parseInt(
                                    input.value,
                                    10
                                ) || 1;


                            if (
                                value > 1
                            ) {

                                value--;
                            }


                            input.value =
                                value;
                        }
                    );


                    plusBtn.addEventListener(
                        'click',
                        () => {

                            let value =
                                parseInt(
                                    input.value,
                                    10
                                ) || 1;


                            value++;


                            input.value =
                                value;
                        }
                    );


                    input.addEventListener(
                        'change',
                        () => {

                            let value =
                                parseInt(
                                    input.value,
                                    10
                                );


                            if (
                                Number.isNaN(
                                    value
                                ) ||
                                value < 1
                            ) {

                                value = 1;
                            }


                            input.value =
                                value;
                        }
                    );
                }
            }
        );


        // =================================================
        // WISHLIST
        // =================================================

        document
            .querySelectorAll(
                '.wishlist-action, .wishlist-btn'
            )
            .forEach(
                btn => {

                    btn.addEventListener(
                        'click',
                        event => {

                            event.preventDefault();
                            event.stopPropagation();


                            const icon =
                                btn.querySelector(
                                    '.material-symbols-outlined'
                                );


                            if (!icon) {
                                return;
                            }


                            if (
                                icon.textContent.trim() ===
                                'favorite_border'
                            ) {

                                icon.textContent =
                                    'favorite';

                                icon.classList.add(
                                    'filled'
                                );

                                icon.style.color =
                                    'var(--primary)';

                            } else {

                                icon.textContent =
                                    'favorite_border';

                                icon.classList.remove(
                                    'filled'
                                );

                                icon.style.color =
                                    '';
                            }
                        }
                    );
                }
            );


        // =================================================
        // QUICK ADD TO CART
        // =================================================

        document.addEventListener(
            'click',
            event => {

                const quickAdd =
                    event.target.closest(
                        '.quick-add'
                    );


                if (!quickAdd) {
                    return;
                }


                event.preventDefault();
                event.stopPropagation();


                const productId =
                    quickAdd.dataset.productId;


                if (!productId) {

                    console.error(
                        'LUXE: Quick Add has no product ID.'
                    );

                    return;
                }


                const product =
                    catalogProducts.find(
                        item =>
                            String(
                                item.id
                            ) ===
                            String(
                                productId
                            )
                    );


                if (!product) {

                    console.error(
                        'LUXE: Product not found:',
                        productId
                    );

                    return;
                }


                addToCart(
                    product,
                    1,
                    product.variant
                );


                const originalHTML =
                    quickAdd.innerHTML;


                quickAdd.innerHTML = `

                    <span
                        class="material-symbols-outlined"
                        style="font-size:20px;"
                    >
                        check
                    </span>

                `;


                setTimeout(
                    () => {

                        quickAdd.innerHTML =
                            originalHTML;

                    },
                    800
                );
            }
        );


        // =================================================
        // PRODUCT PAGE ADD TO CART
        // =================================================

        const addToCartButton =
            document.getElementById(
                'add-to-cart'
            );


        if (addToCartButton) {

            addToCartButton.addEventListener(
                'click',
                () => {

                    const currentProductId =
                        new URLSearchParams(
                            window.location.search
                        ).get('id');


                    const product =
                        catalogProducts.find(
                            item =>
                                item.id ===
                                currentProductId
                        );


                    if (!product) {

                        console.error(
                            'LUXE: Product not found:',
                            currentProductId
                        );

                        return;
                    }


                    const quantityInput =
                        document.getElementById(
                            'qty-value'
                        );


                    let quantity =
                        parseInt(
                            quantityInput?.value,
                            10
                        ) || 1;


                    if (
                        quantity < 1
                    ) {

                        quantity = 1;
                    }


                    const activeColor =
                        document.querySelector(
                            '#color-swatches .color-swatch.active'
                        );


                    const selectedVariant =
                        activeColor?.dataset.color ||
                        product.variant;


                    addToCart(
                        product,
                        quantity,
                        selectedVariant
                    );


                    const originalText =
                        addToCartButton.textContent;


                    addToCartButton.textContent =
                        'Added ✓';


                    setTimeout(
                        () => {

                            addToCartButton.textContent =
                                originalText;

                        },
                        1000
                    );
                }
            );
        }


        // =================================================
        // CHECKOUT FORM
        // =================================================

        const checkoutForm =
            document.getElementById(
                'checkout-form'
            );


        if (checkoutForm) {

            checkoutForm.addEventListener(
                'submit',
                event => {

                    event.preventDefault();


                    const cart =
                        getCart();


                    if (
                        cart.length ===
                        0
                    ) {

                        alert(
                            'Your cart is empty.'
                        );

                        return;
                    }


                    const modal =
                        document.getElementById(
                            'success-modal'
                        );


                    if (modal) {

                        modal.style.display =
                            'flex';
                    }
                }
            );
        }


        // =================================================
        // CLOSE MODAL
        // =================================================

        const closeModalBtn =
            document.getElementById(
                'close-modal'
            );


        if (closeModalBtn) {

            closeModalBtn.addEventListener(
                'click',
                () => {

                    localStorage.removeItem(
                        CART_KEY
                    );


                    updateCartBadge();


                    window.location.href =
                        'index.html';
                }
            );
        }


        // =================================================
        // SHOP PAGE
        // =================================================

        const isShopPage =
            window.location.pathname
                .toLowerCase()
                .endsWith(
                    'shop.html'
                ) ||
            window.location.pathname ===
            '/shop.html';


        if (isShopPage) {

            const shopUrlParams =
                new URLSearchParams(
                    window.location.search
                );


            const savedPage = parseInt(
                shopUrlParams.get('page') || sessionStorage.getItem('luxe_shop_page'),
                10
            );
            const initialPage = Number.isNaN(savedPage) || savedPage < 1 ? 1 : savedPage;


            const category =
                shopUrlParams.get(
                    'category'
                );


            const categoryMap =
                Object.fromEntries(
                    Object.entries(
                        curatedCategories
                    ).map(
                        ([slug, details]) =>
                            [
                                slug,
                                details.title
                            ]
                    )
                );


            const categoryView =
                categoryMap[
                category
                ];


            const productGrid =
                document.getElementById(
                    'product-grid'
                );


            /*
             * IMPORTANT:
             *
             * Category pages use homeProducts.
             *
             * Shop All uses catalogProducts,
             * which contains:
             *
             * products + homeProducts
             */

            const shopProducts =
                categoryView
                    ? homeProducts.filter(
                        product =>
                            product.category ===
                            category
                    )
                    : catalogProducts;


            if (productGrid) {

                productGrid.innerHTML =
                    '';


                shopProducts.forEach(
                    product => {

                        const card =
                            document.createElement(
                                'a'
                            );


                        card.className =
                            'product-card';


                        card.href =
                            `product.html?id=${encodeURIComponent(
                                product.id
                            )}`;


                        card.id =
                            product.id;


                        if (product.category) {

                            card.dataset.category =
                                product.category;
                        }


                        const chipMarkup =
                            product.chip
                                ? `
                                    <span
                                        class="chip ${product.chip.class}"
                                    >
                                        ${product.chip.text}
                                    </span>
                                `
                                : '';


                        const saleBadgeMarkup =
                            getSaleBadgeMarkup(
                                product
                            );


                        const priceMarkup =
                            getProductPriceMarkup(
                                product
                            );


                        card.innerHTML = `

                            <div
                                class="product-card-image"
                            >

                                <img
                                    src="${product.images[0]}"
                                    alt="${product.name}"
                                />


                                ${chipMarkup}


                                ${saleBadgeMarkup}


                                <button
                                    type="button"
                                    class="quick-add"
                                    data-product-id="${product.id}"
                                    aria-label="Quick add ${product.name} to cart"
                                >

                                    <span
                                        class="material-symbols-outlined"
                                        style="font-size:20px;"
                                    >
                                        shopping_bag
                                    </span>

                                </button>

                            </div>


                            <div
                                class="product-card-info"
                            >

                                <div>

                                    <h3
                                        class="product-card-name"
                                    >
                                        ${product.name}
                                    </h3>


                                    <p
                                        class="product-card-variant"
                                    >
                                        ${product.variant}
                                    </p>

                                </div>


                                ${priceMarkup}

                            </div>
                        `;


                        productGrid.appendChild(
                            card
                        );
                    }
                );
            }


            // =================================================
            // PAGINATION
            // =================================================

            const allProducts =
                Array.from(
                    document.querySelectorAll(
                        '.product-card'
                    )
                );


            const pagination =
                document.getElementById(
                    'pagination'
                );


            const productsForView =
                allProducts;


            const itemsPerPage =
                5;


            const pageCount =
                Math.max(
                    1,
                    Math.ceil(
                        productsForView.length /
                        itemsPerPage
                    )
                );


            let currentPage =
                1;


            // =================================================
            // NAVIGATION
            // =================================================

            document
                .querySelectorAll(
                    '.nav-link'
                )
                .forEach(
                    link => {

                        const href =
                            link.getAttribute(
                                'href'
                            );


                        const isCurrent =
                            categoryView
                                ? href ===
                                `shop.html?category=${category}`
                                : href ===
                                'shop.html';


                        link.classList.toggle(
                            'active',
                            isCurrent
                        );


                        if (
                            isCurrent
                        ) {

                            link.setAttribute(
                                'aria-current',
                                'page'
                            );

                        } else {

                            link.removeAttribute(
                                'aria-current'
                            );
                        }
                    }
                );


            // =================================================
            // SHOP HEADER
            // =================================================

            const pageTitle =
                document.querySelector(
                    '.shop-header h1'
                );


            const breadcrumbCurrent =
                document.querySelector(
                    '#breadcrumbs .current'
                );


            const itemCount =
                document.querySelector(
                    '.shop-header .body-md'
                );


            const viewTitle =
                categoryView ||
                'Shop All';


            if (pageTitle) {

                pageTitle.textContent =
                    viewTitle;
            }


            if (breadcrumbCurrent) {

                breadcrumbCurrent.textContent =
                    viewTitle;
            }


            if (itemCount) {

                const count =
                    productsForView.length;


                itemCount.textContent =
                    `Showing ${count} ${count === 1
                        ? 'item'
                        : 'items'
                    }`;
            }


            document.title =
                `${viewTitle} - LUXE`;


            // =================================================
            // CATEGORY FILTER
            // =================================================

            document
                .querySelectorAll(
                    '#filter-category-options input[data-category]'
                )
                .forEach(
                    input => {

                        input.checked =
                            input.dataset.category ===
                            category;


                        input.addEventListener(
                            'change',
                            () => {

                                window.location.href =
                                    input.checked
                                        ? `shop.html?category=${encodeURIComponent(
                                            input.dataset.category
                                        )}`
                                        : 'shop.html';
                            }
                        );
                    }
                );


            // =================================================
            // SHOW PAGE
            // =================================================

            const showPage =
                page => {

                    currentPage =
                        Math.min(
                            Math.max(
                                page,
                                1
                            ),
                            pageCount
                        );

                    // ==========================================
                    // СОХРАНЯЕМ СТРАНИЦУ В ПАМЯТЬ И В АДРЕСНУЮ СТРОКУ
                    // ==========================================
                    sessionStorage.setItem('luxe_shop_page', currentPage);

                    const currentUrl = new URL(window.location.href);
                    if (currentPage > 1) {
                        currentUrl.searchParams.set('page', currentPage);
                    } else {
                        currentUrl.searchParams.delete('page');
                    }
                    // Меняем URL без перезагрузки страницы
                    window.history.replaceState({ page: currentPage }, '', currentUrl);
                    // ==========================================

                    const firstItem = (currentPage - 1) * itemsPerPage;

                    const cardsOnPage =
                        productsForView.slice(
                            firstItem,
                            firstItem +
                            itemsPerPage
                        );


                    allProducts.forEach(
                        card => {

                            card.style.display =
                                cardsOnPage.includes(
                                    card
                                )
                                    ? 'block'
                                    : 'none';
                        }
                    );


                    if (itemCount) {

                        if (
                            productsForView.length ===
                            0
                        ) {

                            itemCount.textContent =
                                'No products found';

                        } else if (
                            productsForView.length ===
                            1
                        ) {

                            itemCount.textContent =
                                'Showing 1 of 1 item';

                        } else {

                            const firstVisible =
                                firstItem + 1;


                            const lastVisible =
                                Math.min(
                                    firstItem +
                                    itemsPerPage,
                                    productsForView.length
                                );


                            itemCount.textContent =
                                `Showing ${firstVisible}-${lastVisible} of ${productsForView.length} items`;
                        }
                    }


                    renderPagination();
                };


            // =================================================
            // PAGE BUTTON
            // =================================================

            const createPageButton =
                page => {

                    const button =
                        document.createElement(
                            'button'
                        );


                    button.className =
                        `page-btn ${page === currentPage
                            ? 'active'
                            : ''
                        }`;


                    button.type =
                        'button';


                    button.textContent =
                        page;


                    button.setAttribute(
                        'aria-label',
                        `Page ${page}`
                    );


                    if (
                        page ===
                        currentPage
                    ) {

                        button.setAttribute(
                            'aria-current',
                            'page'
                        );
                    }


                    button.addEventListener(
                        'click',
                        () => {

                            showPage(
                                page
                            );
                        }
                    );


                    return button;
                };


            // =================================================
            // ARROW BUTTON
            // =================================================

            const createArrowButton =
                direction => {

                    const isPrevious =
                        direction ===
                        'previous';


                    const button =
                        document.createElement(
                            'button'
                        );


                    button.className =
                        'page-arrow';


                    button.type =
                        'button';


                    button.disabled =
                        isPrevious
                            ? currentPage ===
                            1
                            : currentPage ===
                            pageCount;


                    button.setAttribute(
                        'aria-label',
                        isPrevious
                            ? 'Previous page'
                            : 'Next page'
                    );


                    button.innerHTML = `
                        <span
                            class="material-symbols-outlined"
                        >
                            ${isPrevious
                            ? 'chevron_left'
                            : 'chevron_right'
                        }
                        </span>
                    `;


                    button.addEventListener(
                        'click',
                        () => {

                            showPage(
                                currentPage +
                                (
                                    isPrevious
                                        ? -1
                                        : 1
                                )
                            );
                        }
                    );


                    return button;
                };


            // =================================================
            // PAGINATION
            // =================================================

            function renderPagination() {

                if (!pagination) {
                    return;
                }


                pagination.innerHTML =
                    '';


                if (
                    pageCount <=
                    1
                ) {

                    pagination.hidden =
                        true;

                    return;
                }


                pagination.hidden =
                    false;


                pagination.appendChild(
                    createArrowButton(
                        'previous'
                    )
                );


                for (
                    let page = 1;
                    page <= pageCount;
                    page++
                ) {

                    pagination.appendChild(
                        createPageButton(
                            page
                        )
                    );
                }


                pagination.appendChild(
                    createArrowButton(
                        'next'
                    )
                );
            }


            // Открываем сохраненную страницу вместо жесткой единицы
            showPage(initialPage);

            // Слушаем стрелки браузера «Назад» и «Вперед»
            window.addEventListener('popstate', () => {
                const params = new URLSearchParams(window.location.search);
                const pageFromUrl = parseInt(params.get('page'), 10) || 1;
                showPage(pageFromUrl);
            });
        }


        // =================================================
        // FINAL CART BADGE
        // =================================================

        updateCartBadge();

    }
);