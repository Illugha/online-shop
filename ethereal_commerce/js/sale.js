/**
 * LUXE — Sale Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const saleGrid = document.getElementById('sale-product-grid');
    if (!saleGrid) {
        return;
    }

    const saleCountEl = document.getElementById('sale-count');
    const filterToggle = document.getElementById('sale-filter-toggle');
    const filterOptions = document.getElementById('sale-filter-options');
    const checkboxes = document.querySelectorAll('.sale-discount-filter');
    const resetBtn = document.getElementById('sale-filter-reset');
    const mobilePills = document.querySelectorAll('.sale-pill');

    // Получаем основной каталог
    const catalog = window.catalogProducts || [];

    // Получаем только товары со скидкой
    const allSaleProducts = catalog.filter(product => {
        if (typeof window.isProductOnSale === 'function') {
            return window.isProductOnSale(product);
        }
        return typeof window.getSaleDiscount === 'function' && window.getSaleDiscount(product) > 0;
    });

    // Подсчитываем количество товаров для каждого процента скидки
    const discountCounts = {};
    allSaleProducts.forEach(product => {
        const d = typeof window.getSaleDiscount === 'function' ? window.getSaleDiscount(product) : 0;
        if (d > 0) {
            discountCounts[d] = (discountCounts[d] || 0) + 1;
        }
    });

    // Отображаем количество возле каждого чекбокса
    checkboxes.forEach(cb => {
        const val = Number(cb.value);
        const count = discountCounts[val] || 0;
        const countEl = cb.closest('label')?.querySelector('.discount-count');
        if (countEl) {
            countEl.textContent = `(${count})`;
        }
    });

    // Если вообще нет товаров со скидкой в каталоге
    if (allSaleProducts.length === 0) {
        saleGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;">
                <h2 class="headline-md">No Sale Products</h2>
                <p style="margin-top: 12px; color: var(--on-surface-variant);">
                    Check back soon for new offers.
                </p>
            </div>
        `;
        if (saleCountEl) {
            saleCountEl.textContent = 'No sale pieces available';
        }
        return;
    }

    // Получить массив выбранных скидок
    function getSelectedDiscounts() {
        return Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => Number(cb.value));
    }

    // Обновление состояния мобильных кнопок-фильтров (pills)
    function updateMobilePills(selected) {
        if (!mobilePills || mobilePills.length === 0) return;
        mobilePills.forEach(pill => {
            const val = pill.dataset.discount;
            if (val === 'all') {
                pill.classList.toggle('active', selected.length === 0);
            } else {
                pill.classList.toggle('active', selected.includes(Number(val)));
            }
        });
    }

    // Синхронизация с URL параметрами
    function updateUrlParams(selected) {
        const url = new URL(window.location.href);
        if (selected.length > 0) {
            url.searchParams.set('discount', selected.join(','));
        } else {
            url.searchParams.delete('discount');
        }
        window.history.replaceState({}, '', url);
    }

    // Рендеринг карточек товаров
    function renderProducts() {
        const selected = getSelectedDiscounts();

        // Показать/скрыть кнопку сброса в сайдбаре
        if (resetBtn) {
            resetBtn.style.display = selected.length > 0 ? 'inline-block' : 'none';
        }

        // Обновить активные классы мобильных кнопок
        updateMobilePills(selected);

        // Фильтрация товаров
        const filteredProducts = selected.length === 0
            ? allSaleProducts
            : allSaleProducts.filter(product => {
                const discount = typeof window.getSaleDiscount === 'function' ? window.getSaleDiscount(product) : 0;
                return selected.includes(discount);
            });

        // Обновить текст счетчика
        if (saleCountEl) {
            if (selected.length === 0) {
                saleCountEl.textContent = `Showing all ${allSaleProducts.length} sale pieces`;
            } else {
                const percentLabels = selected.map(s => `${s}%`).join(', ');
                saleCountEl.textContent = `Showing ${filteredProducts.length} of ${allSaleProducts.length} sale pieces (${percentLabels} off)`;
            }
        }

        // Очистить сетку
        saleGrid.innerHTML = '';

        // Если по выбранным фильтрам ничего не найдено
        if (filteredProducts.length === 0) {
            saleGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 64px 20px;">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: var(--outline); margin-bottom: 16px;">search_off</span>
                    <h3 class="headline-md" style="margin-bottom: 8px;">No sale products found</h3>
                    <p class="body-md" style="color: var(--on-surface-variant); margin-bottom: 20px;">
                        No items match the selected discount filter.
                    </p>
                    <button type="button" class="btn btn-outline" id="sale-empty-reset-btn" style="padding: 8px 20px;">
                        Reset Filters
                    </button>
                </div>
            `;
            const emptyResetBtn = document.getElementById('sale-empty-reset-btn');
            if (emptyResetBtn) {
                emptyResetBtn.addEventListener('click', resetFilters);
            }
            return;
        }

        // Отрисовать товары
        filteredProducts.forEach(product => {
            const discount = typeof window.getSaleDiscount === 'function' ? window.getSaleDiscount(product) : 0;
            const originalPrice = typeof window.getNumericPrice === 'function' ? window.getNumericPrice(product.price) : product.price;
            const salePrice = typeof window.getSalePrice === 'function' ? window.getSalePrice(product) : originalPrice;
            const image = product.images && product.images.length > 0 ? product.images[0] : '';
            const isFav = typeof window.isInWishlist === 'function' ? window.isInWishlist(product.id) : false;

            const card = document.createElement('a');
            card.className = 'product-card';
            card.href = `product.html?id=${encodeURIComponent(product.id)}`;
            card.id = product.id;

            if (product.category) {
                card.dataset.category = product.category;
            }
            card.dataset.discount = discount;

            card.innerHTML = `
                <div class="product-card-image">
                    <img src="${image}" alt="${product.name}">
                    <span class="chip chip-sale">SALE -${discount}%</span>
                    <button
                        type="button"
                        class="wishlist-btn ${isFav ? 'active' : ''}"
                        data-product-id="${product.id}"
                        aria-label="${isFav ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}"
                    >
                        <span class="material-symbols-outlined" style="font-size: 18px;">
                            ${isFav ? 'favorite' : 'favorite_border'}
                        </span>
                    </button>
                    <button
                        type="button"
                        class="quick-add"
                        data-product-id="${product.id}"
                        aria-label="Quick add ${product.name} to cart"
                    >
                        <span class="material-symbols-outlined" style="font-size: 20px;">
                            shopping_bag
                        </span>
                    </button>
                </div>
                <div class="product-card-info">
                    <div>
                        <h3 class="product-card-name">${product.name}</h3>
                        <p class="product-card-variant">${product.variant || ''}</p>
                    </div>
                    <div class="product-card-price sale-price">
                        <span class="old-price">${typeof window.formatMoney === 'function' ? window.formatMoney(originalPrice) : `$${originalPrice}`}</span>
                        <span class="new-price">${typeof window.formatMoney === 'function' ? window.formatMoney(salePrice) : `$${salePrice}`}</span>
                    </div>
                </div>
            `;

            saleGrid.appendChild(card);
        });
    }

    // Функция сброса всех фильтров
    function resetFilters() {
        checkboxes.forEach(cb => { cb.checked = false; });
        updateUrlParams([]);
        renderProducts();
    }

    // Раскрытие/скрытие аккордеона фильтра скидок
    if (filterToggle && filterOptions) {
        filterToggle.addEventListener('click', () => {
            const icon = filterToggle.querySelector('.material-symbols-outlined');
            if (filterOptions.style.display === 'none') {
                filterOptions.style.display = 'flex';
                if (icon) icon.textContent = 'expand_less';
            } else {
                filterOptions.style.display = 'none';
                if (icon) icon.textContent = 'expand_more';
            }
        });
    }

    // Обработчик изменения чекбоксов
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const selected = getSelectedDiscounts();
            updateUrlParams(selected);
            renderProducts();
        });
    });

    // Обработчик кнопки сброса в сайдбаре
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }

    // Обработчик мобильных фильтров (pills)
    mobilePills.forEach(pill => {
        pill.addEventListener('click', () => {
            const val = pill.dataset.discount;
            if (val === 'all') {
                checkboxes.forEach(cb => { cb.checked = false; });
            } else {
                const targetCb = Array.from(checkboxes).find(cb => cb.value === val);
                if (targetCb) {
                    targetCb.checked = !targetCb.checked;
                }
            }
            const selected = getSelectedDiscounts();
            updateUrlParams(selected);
            renderProducts();
        });
    });

    // Восстановление фильтра из URL параметров при загрузке
    const urlParams = new URLSearchParams(window.location.search);
    const discountParam = urlParams.get('discount');
    if (discountParam) {
        const values = discountParam.split(',').map(s => s.trim());
        checkboxes.forEach(cb => {
            if (values.includes(cb.value)) {
                cb.checked = true;
            }
        });
    }

    // Начальный рендеринг
    renderProducts();

    // Обновление бейджей корзины и вишлиста
    if (typeof window.updateCartBadge === 'function') {
        window.updateCartBadge();
    }
    if (typeof window.updateWishlistBadge === 'function') {
        window.updateWishlistBadge();
    }
});
