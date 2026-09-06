/**
 * LUXE — Wishlist Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById('wishlist-grid');
    const emptyState = document.getElementById('wishlist-empty');
    const itemCountEl = document.getElementById('wishlist-item-count');
    const actionsBar = document.getElementById('wishlist-actions-bar');
    const moveAllBtn = document.getElementById('move-all-to-cart-btn');
    const clearBtn = document.getElementById('clear-wishlist-btn');

    function getWishlistProducts() {
        const wishlistIds = typeof window.getWishlist === 'function'
            ? window.getWishlist()
            : [];

        const catalog = window.catalogProducts || [];

        return wishlistIds
            .map(id => catalog.find(p => String(p.id) === String(id)))
            .filter(Boolean);
    }

    function renderWishlist() {
        if (!grid || !emptyState) return;

        const products = getWishlistProducts();
        const count = products.length;

        // Update item count heading
        if (itemCountEl) {
            if (count === 0) {
                itemCountEl.textContent = 'Your wishlist is currently empty.';
            } else if (count === 1) {
                itemCountEl.textContent = 'Showing 1 saved item';
            } else {
                itemCountEl.textContent = `Showing ${count} saved items`;
            }
        }

        // Empty state
        if (count === 0) {
            grid.style.display = 'none';
            grid.innerHTML = '';
            if (actionsBar) actionsBar.style.display = 'none';

            emptyState.style.display = 'block';
            emptyState.innerHTML = `
                <div class="wishlist-empty-state">
                    <div class="wishlist-empty-icon">
                        <span class="material-symbols-outlined">favorite_border</span>
                    </div>
                    <h2 class="headline-md">Your Wishlist is Empty</h2>
                    <p>Save pieces you love to revisit them anytime, compare your favorites, and purchase when you are ready.</p>
                    <a href="shop.html" class="btn btn-primary">
                        Explore Collection
                        <span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>
                    </a>
                </div>
            `;
            return;
        }

        // Render products
        emptyState.style.display = 'none';
        emptyState.innerHTML = '';
        if (actionsBar) actionsBar.style.display = 'flex';
        grid.style.display = 'grid';
        grid.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('article');
            card.className = 'wishlist-card';
            card.id = `wishlist-card-${product.id}`;

            const isOnSale = typeof window.isProductOnSale === 'function' && window.isProductOnSale(product);
            const discount = typeof window.getSaleDiscount === 'function' ? window.getSaleDiscount(product) : 0;
            const salePrice = typeof window.getSalePrice === 'function' ? window.getSalePrice(product) : 0;
            const originalPrice = typeof window.getNumericPrice === 'function' ? window.getNumericPrice(product.price) : product.price;

            const saleBadge = isOnSale
                ? `<span class="chip chip-sale" style="position:absolute; top:12px; left:12px; z-index:2;">SALE -${discount}%</span>`
                : '';


            const priceMarkup = isOnSale
                ? `
                    <div class="product-card-price sale-price wishlist-card-pricing">
                        <span class="old-price">${window.formatMoney ? window.formatMoney(originalPrice) : product.price}</span>
                        <span class="new-price">${window.formatMoney ? window.formatMoney(salePrice) : product.price}</span>
                    </div>
                `
                : `
                    <div class="product-card-price wishlist-card-pricing">
                        <span>${product.price}</span>
                    </div>
                `;

            const imageSrc = product.images?.[0] || 'img/products/placeholder.jpg';

            card.innerHTML = `
                <div class="wishlist-card-image-wrap">
                    <a href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}">
                        <img src="${imageSrc}" alt="${product.name}" loading="lazy" />
                    </a>
                    ${saleBadge}
                    <button
                        type="button"
                        class="wishlist-card-remove"
                        data-product-id="${product.id}"
                        aria-label="Remove ${product.name} from wishlist"
                        title="Remove from wishlist"
                    >
                        <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
                    </button>
                </div>

                <div class="wishlist-card-content">
                    <div class="wishlist-card-meta">
                        <a href="product.html?id=${encodeURIComponent(product.id)}" class="wishlist-card-name">
                            ${product.name}
                        </a>
                        <p class="wishlist-card-variant">
                            Variant: ${product.variant || 'Standard'}
                        </p>
                        <span class="chip chip-champagne" style="width: fit-content; margin-top: 2px;">
                            In Stock
                        </span>
                        ${priceMarkup}
                    </div>

                    <div class="wishlist-card-actions">
                        <button
                            type="button"
                            class="btn btn-outline wishlist-add-cart-btn"
                            data-product-id="${product.id}"
                        >
                            <span class="material-symbols-outlined" style="font-size:18px;">shopping_bag</span>
                            In Cart
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary wishlist-buy-now-btn"
                            data-product-id="${product.id}"
                        >
                            Buy Now
                            <span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>
                        </button>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    // Event delegation on grid
    if (grid) {
        grid.addEventListener('click', event => {
            // 1. Remove button
            const removeBtn = event.target.closest('.wishlist-card-remove');
            if (removeBtn) {
                event.preventDefault();
                event.stopPropagation();
                const productId = removeBtn.dataset.productId;
                if (productId && typeof window.toggleWishlist === 'function') {
                    window.toggleWishlist(productId);
                    renderWishlist();
                }
                return;
            }


            // 2. Add to Cart button
            const addBtn = event.target.closest('.wishlist-add-cart-btn');
            if (addBtn) {
                event.preventDefault();
                event.stopPropagation();
                const productId = addBtn.dataset.productId;
                const catalog = window.catalogProducts || [];
                const product = catalog.find(p => String(p.id) === String(productId));

                if (product && typeof window.addToCart === 'function') {
                    window.addToCart(product, 1, product.variant);

                    const originalHTML = addBtn.innerHTML;
                    addBtn.innerHTML = `
                        <span class="material-symbols-outlined" style="font-size:18px;">check</span>
                        Added ✓
                    `;
                    addBtn.style.borderColor = 'var(--primary)';

                    setTimeout(() => {
                        addBtn.innerHTML = originalHTML;
                        addBtn.style.borderColor = '';
                    }, 1000);
                }
                return;
            }

            // 3. Buy Now button
            const buyBtn = event.target.closest('.wishlist-buy-now-btn');
            if (buyBtn) {
                event.preventDefault();
                event.stopPropagation();
                const productId = buyBtn.dataset.productId;
                const catalog = window.catalogProducts || [];
                const product = catalog.find(p => String(p.id) === String(productId));

                if (product && typeof window.addToCart === 'function') {
                    window.addToCart(product, 1, product.variant);

                    // Remove from wishlist when Buy Now is pressed
                    try {
                        let list = typeof window.getWishlist === 'function'
                            ? window.getWishlist()
                            : JSON.parse(localStorage.getItem('luxeWishlist')) || [];
                        list = list.filter(id => String(id) !== String(productId));
                        if (typeof window.saveWishlist === 'function') {
                            window.saveWishlist(list);
                        } else {
                            localStorage.setItem('luxeWishlist', JSON.stringify(list));
                        }
                        if (typeof window.updateWishlistBadge === 'function') {
                            window.updateWishlistBadge();
                        }
                    } catch (err) {
                        console.error('Error removing item from wishlist on Buy Now:', err);
                    }

                    // Navigate to cart page to complete purchase
                    window.location.href = 'cart.html';
                }
            }
        });
    }

    // Move All to Cart
    if (moveAllBtn) {
        moveAllBtn.addEventListener('click', () => {
            const products = getWishlistProducts();
            if (products.length === 0) return;

            if (typeof window.addToCart === 'function') {
                products.forEach(product => {
                    window.addToCart(product, 1, product.variant);
                });

                if (typeof window.updateCartBadge === 'function') {
                    window.updateCartBadge();
                }

                moveAllBtn.textContent = 'All Added ✓';
                setTimeout(() => {
                    moveAllBtn.innerHTML = `
                        <span class="material-symbols-outlined" style="font-size: 18px;">shopping_bag</span>
                        Add All to Cart
                    `;
                }, 1200);
            }
        });
    }


    // Clear All
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (typeof window.saveWishlist === 'function') {
                window.saveWishlist([]);
                if (typeof window.updateWishlistBadge === 'function') {
                    window.updateWishlistBadge();
                }
                renderWishlist();
            }
        });
    }

    // Initial render
    renderWishlist();

    // Re-render if tab becomes visible (in case user modified favorites in another tab)
    window.addEventListener('focus', () => {
        renderWishlist();
        if (typeof window.updateWishlistBadge === 'function') {
            window.updateWishlistBadge();
        }
    });

});