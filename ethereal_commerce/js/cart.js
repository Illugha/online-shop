/**
 * LUXE — Cart Page
 */

document.addEventListener('DOMContentLoaded', () => {

    const CART_KEY = 'luxeCart';

    const cartItemsContainer =
        document.querySelector('.cart-items');

    const cartBadge =
        document.getElementById('cart-badge');

    const subtotalElement =
        document.querySelector(
            '.summary-line:nth-child(1) span:last-child'
        );

    const taxElement =
        document.querySelector(
            '.summary-line:nth-child(3) span:last-child'
        );

    const totalElement =
        document.querySelector(
            '.total-amount'
        );


    const TAX_RATE = 0.08;


    // =====================================================
    // GET CART
    // =====================================================

    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    CART_KEY
                )
            ) || [];

        } catch (error) {

            console.error(
                'Cart loading error:',
                error
            );

            return [];
        }
    }


    // =====================================================
    // SAVE CART
    // =====================================================

    function saveCart(cart) {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );
    }


    // =====================================================
    // PRICE
    // =====================================================

    function parsePrice(price) {

        if (
            typeof price ===
            'number'
        ) {
            return price;
        }

        return Number(
            String(price)
                .replace('$', '')
                .replace(/,/g, '')
                .trim()
        ) || 0;
    }


    function formatPrice(price) {

        return `$${Number(price).toFixed(2)}`;
    }


    // =====================================================
    // CART BADGE
    // =====================================================

    function updateBadge() {

        const cart =
            getCart();

        const quantity =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.quantity || 0
                    ),
                0
            );


        if (cartBadge) {

            cartBadge.textContent =
                quantity;


            cartBadge.style.display =
                quantity > 0
                    ? 'flex'
                    : 'none';
        }
    }


    // =====================================================
    // EMPTY CART
    // =====================================================

    function renderEmptyCart() {

        if (!cartItemsContainer) {
            return;
        }


        cartItemsContainer.innerHTML = `

            <div
                class="empty-cart"
                style="
                    text-align:center;
                    padding:70px 20px;
                    border:1px solid var(--surface-variant);
                "
            >

                <span
                    class="material-symbols-outlined"
                    style="
                        font-size:56px;
                        margin-bottom:18px;
                    "
                >
                    shopping_bag
                </span>


                <h2
                    style="
                        margin-bottom:10px;
                        color:var(--primary);
                    "
                >
                    Your Cart is Empty
                </h2>


                <p
                    style="
                        margin-bottom:25px;
                        color:var(--on-surface-variant);
                    "
                >
                    Discover our latest collection.
                </p>


                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    Continue Shopping
                </a>

            </div>
        `;
    }


    // =====================================================
    // RENDER CART
    // =====================================================

    function renderCart() {

        const cart =
            getCart();


        if (!cartItemsContainer) {
            return;
        }


        cartItemsContainer.innerHTML =
            '';


        if (
            cart.length ===
            0
        ) {

            renderEmptyCart();

            updateSummary();
            updateBadge();

            return;
        }


        cart.forEach(
            item => {

                const price =
                    parsePrice(
                        item.price
                    );


                const cartItem =
                    document.createElement(
                        'div'
                    );


                cartItem.className =
                    'cart-item';


                cartItem.innerHTML = `

                    <div class="cart-item-image">

                        <img
                            src="${
                                item.image ||
                                'img/products/placeholder.jpg'
                            }"
                            alt="${item.name}"
                        />

                    </div>


                    <div class="cart-item-details">

                        <div>

                            <div class="cart-item-top">

                                <div>

                                    <h3
                                        class="cart-item-name"
                                    >
                                        ${item.name}
                                    </h3>


                                    <p
                                        class="cart-item-variant"
                                    >
                                        Variant: ${
                                            item.variant ||
                                            'Default'
                                        }
                                    </p>


                                    <span
                                        class="chip chip-champagne"
                                    >
                                        In Stock
                                    </span>

                                </div>


                                <div
                                    class="cart-item-price"
                                >
                                    ${
                                        formatPrice(
                                            price *
                                            Number(
                                                item.quantity
                                            )
                                        )
                                    }
                                </div>

                            </div>

                        </div>


                        <div
                            class="cart-item-bottom"
                        >

                            <div
                                class="qty-selector"
                            >

                                <button
                                    type="button"
                                    class="cart-minus"
                                    data-id="${item.id}"
                                    data-variant="${
                                        item.variant ||
                                        ''
                                    }"
                                    aria-label="Decrease quantity"
                                >

                                    <span
                                        class="material-symbols-outlined"
                                    >
                                        remove
                                    </span>

                                </button>


                                <input
                                    type="text"
                                    class="qty-value cart-quantity"
                                    value="${item.quantity}"
                                    data-id="${item.id}"
                                    data-variant="${
                                        item.variant ||
                                        ''
                                    }"
                                    aria-label="Quantity"
                                />


                                <button
                                    type="button"
                                    class="cart-plus"
                                    data-id="${item.id}"
                                    data-variant="${
                                        item.variant ||
                                        ''
                                    }"
                                    aria-label="Increase quantity"
                                >

                                    <span
                                        class="material-symbols-outlined"
                                    >
                                        add
                                    </span>

                                </button>

                            </div>


                            <button
                                type="button"
                                class="remove-btn"
                                data-id="${item.id}"
                                data-variant="${
                                    item.variant ||
                                    ''
                                }"
                            >

                                <span
                                    class="material-symbols-outlined"
                                >
                                    delete
                                </span>


                                <span>
                                    Remove
                                </span>

                            </button>

                        </div>

                    </div>
                `;


                cartItemsContainer.appendChild(
                    cartItem
                );
            }
        );


        updateSummary();
        updateBadge();
    }


    // =====================================================
    // SUMMARY
    // =====================================================

    function updateSummary() {

        const cart =
            getCart();


        const subtotal =
            cart.reduce(
                (total, item) => {

                    const price =
                        parsePrice(
                            item.price
                        );


                    return (
                        total +
                        price *
                        Number(
                            item.quantity ||
                            0
                        )
                    );
                },
                0
            );


        const tax =
            subtotal *
            TAX_RATE;


        const total =
            subtotal +
            tax;


        if (subtotalElement) {

            subtotalElement.textContent =
                formatPrice(
                    subtotal
                );
        }


        if (taxElement) {

            taxElement.textContent =
                formatPrice(
                    tax
                );
        }


        if (totalElement) {

            totalElement.textContent =
                formatPrice(
                    total
                );
        }
    }


    // =====================================================
    // CHANGE QUANTITY
    // =====================================================

    function changeQuantity(
        id,
        variant,
        amount
    ) {

        const cart =
            getCart();


        const item =
            cart.find(
                product =>
                    String(product.id) ===
                        String(id) &&
                    String(
                        product.variant || ''
                    ) ===
                        String(
                            variant || ''
                        )
            );


        if (!item) {
            return;
        }


        item.quantity =
            Number(
                item.quantity || 0
            ) +
            amount;


        if (
            item.quantity <=
            0
        ) {

            const updatedCart =
                cart.filter(
                    product =>
                        !(
                            String(
                                product.id
                            ) ===
                                String(id) &&
                            String(
                                product.variant ||
                                ''
                            ) ===
                                String(
                                    variant ||
                                    ''
                                )
                        )
                );


            saveCart(
                updatedCart
            );

        } else {

            saveCart(
                cart
            );
        }


        renderCart();
    }


    // =====================================================
    // SET QUANTITY
    // =====================================================

    function setQuantity(
        id,
        variant,
        value
    ) {

        const cart =
            getCart();


        const item =
            cart.find(
                product =>
                    String(product.id) ===
                        String(id) &&
                    String(
                        product.variant || ''
                    ) ===
                        String(
                            variant || ''
                        )
            );


        if (!item) {
            return;
        }


        let quantity =
            parseInt(
                value,
                10
            );


        if (
            Number.isNaN(quantity) ||
            quantity < 1
        ) {

            quantity = 1;
        }


        item.quantity =
            quantity;


        saveCart(
            cart
        );


        renderCart();
    }


    // =====================================================
    // REMOVE
    // =====================================================

    function removeFromCart(
        id,
        variant
    ) {

        const cart =
            getCart();


        const updatedCart =
            cart.filter(
                product =>
                    !(
                        String(
                            product.id
                        ) ===
                            String(id) &&
                        String(
                            product.variant ||
                            ''
                        ) ===
                            String(
                                variant ||
                                ''
                            )
                    )
            );


        saveCart(
            updatedCart
        );


        renderCart();
    }


    // =====================================================
    // BUTTON EVENTS
    // =====================================================

    if (cartItemsContainer) {

        cartItemsContainer.addEventListener(
            'click',
            event => {

                const plusButton =
                    event.target.closest(
                        '.cart-plus'
                    );


                if (plusButton) {

                    changeQuantity(
                        plusButton.dataset.id,
                        plusButton.dataset.variant,
                        1
                    );

                    return;
                }


                const minusButton =
                    event.target.closest(
                        '.cart-minus'
                    );


                if (minusButton) {

                    changeQuantity(
                        minusButton.dataset.id,
                        minusButton.dataset.variant,
                        -1
                    );

                    return;
                }


                const removeButton =
                    event.target.closest(
                        '.remove-btn'
                    );


                if (removeButton) {

                    removeFromCart(
                        removeButton.dataset.id,
                        removeButton.dataset.variant
                    );
                }
            }
        );


        cartItemsContainer.addEventListener(
            'change',
            event => {

                const input =
                    event.target;


                if (
                    !input.classList.contains(
                        'cart-quantity'
                    )
                ) {
                    return;
                }


                setQuantity(
                    input.dataset.id,
                    input.dataset.variant,
                    input.value
                );
            }
        );
    }


    // =====================================================
    // PROMO CODE
    // =====================================================

    const promoInput =
        document.getElementById(
            'promo'
        );


    const promoButton =
        document.getElementById(
            'apply-promo'
        );


    if (
        promoInput &&
        promoButton
    ) {

        promoButton.addEventListener(
            'click',
            () => {

                const code =
                    promoInput.value
                        .trim()
                        .toUpperCase();


                if (!code) {

                    alert(
                        'Enter a promo code.'
                    );

                    return;
                }


                // Temporary demo promo
                if (
                    code ===
                    'LUXE10'
                ) {

                    alert(
                        'Promo code applied: 10% off.'
                    );

                } else {

                    alert(
                        'Invalid promo code.'
                    );
                }
            }
        );
    }


    // =====================================================
    // INITIALIZE
    // =====================================================

    renderCart();
    updateBadge();
});