/**
 * LUXE — Sale Page
 */

document.addEventListener('DOMContentLoaded', () => {

    const saleGrid = document.getElementById('sale-product-grid');

    if (!saleGrid) {
        return;
    }

    // Получаем основной каталог
    const catalog = window.catalogProducts || [];

    // Получаем только товары со скидкой
    const saleProducts = catalog.filter(product => {
        return window.isProductOnSale(product);
    });

    // Если товаров нет
    if (saleProducts.length === 0) {
        saleGrid.innerHTML = `
            <div
                style="
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 80px 20px;
                "
            >
                <h2 class="headline-md">
                    No Sale Products
                </h2>

                <p
                    style="
                        margin-top: 12px;
                        color: var(--on-surface-variant);
                    "
                >
                    Check back soon for new offers.
                </p>
            </div>
        `;

        return;
    }

    // Отображаем товары
    saleProducts.forEach(product => {

        const discount =
            window.getSaleDiscount(product);

        const originalPrice =
            window.getNumericPrice(product.price);

        const salePrice =
            window.getSalePrice(product);

        const image =
            product.images && product.images.length > 0
                ? product.images[0]
                : '';

        const card =
            document.createElement('a');

        card.className = 'product-card';

        card.href =
            `product.html?id=${encodeURIComponent(product.id)}`;

        card.id = product.id;

        if (product.category) {
            card.dataset.category = product.category;
        }

        card.innerHTML = `
            <div class="product-card-image">

                <img
                    src="${image}"
                    alt="${product.name}"
                >

                <span class="chip chip-sale">
                    SALE -${discount}%
                </span>

                <button
                    type="button"
                    class="quick-add"
                    data-product-id="${product.id}"
                    aria-label="Quick add ${product.name} to cart"
                >
                    <span
                        class="material-symbols-outlined"
                        style="font-size: 20px;"
                    >
                        shopping_bag
                    </span>
                </button>

            </div>

            <div class="product-card-info">

                <div>

                    <h3 class="product-card-name">
                        ${product.name}
                    </h3>

                    <p class="product-card-variant">
                        ${product.variant || ''}
                    </p>

                </div>

                <div class="product-card-price sale-price">

                    <span class="old-price">
                        ${window.formatMoney(originalPrice)}
                    </span>

                    <span class="new-price">
                        ${window.formatMoney(salePrice)}
                    </span>

                </div>

            </div>
        `;

        saleGrid.appendChild(card);
    });

    // Корзина
    if (typeof window.updateCartBadge === 'function') {
        window.updateCartBadge();
    }

});