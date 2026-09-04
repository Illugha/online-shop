/**
 * LUXE — Checkout Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    const CART_KEY = 'luxeCart';

    const checkoutForm =
        document.getElementById('checkout-form');

    const orderSummary =
        document.querySelector('.order-summary');

    const placeOrderButton =
        checkoutForm?.querySelector(
            'button[type="submit"]'
        );

    const successModal =
        document.getElementById('success-modal');

    const closeModalButton =
        document.getElementById('close-modal');


    // =====================================================
    // HELPERS
    // =====================================================

    function getCart() {
        try {
            return JSON.parse(
                localStorage.getItem(CART_KEY)
            ) || [];
        } catch (error) {
            console.error(
                'LUXE: Could not read cart',
                error
            );

            return [];
        }
    }


    function formatPrice(value) {
        return `$${Number(value).toFixed(2)}`;
    }


    function parsePrice(price) {
        if (typeof price === 'number') {
            return price;
        }

        return Number(
            String(price)
                .replace('$', '')
                .replace(/,/g, '')
                .trim()
        ) || 0;
    }


    // =====================================================
    // CALCULATE ORDER
    // =====================================================

    function calculateOrder() {

        const cart = getCart();

        const subtotal = cart.reduce(
            (total, item) => {

                const price =
                    parsePrice(item.price);

                const quantity =
                    Number(item.quantity) || 0;

                return total + price * quantity;
            },
            0
        );

        // Бесплатная доставка
        const shipping = 0;

        // 8% tax
        const tax = subtotal * 0.08;

        const total =
            subtotal +
            shipping +
            tax;

        return {
            cart,
            subtotal,
            shipping,
            tax,
            total
        };
    }


    // =====================================================
    // EMPTY CHECKOUT
    // =====================================================

    function showEmptyCheckout() {

        if (!orderSummary) {
            return;
        }

        orderSummary.innerHTML = `

            <h2
                class="headline-md"
                style="color:var(--primary);"
            >
                Your Order
            </h2>

            <div
                style="
                    text-align:center;
                    padding:30px 10px;
                "
            >

                <span
                    class="material-symbols-outlined"
                    style="
                        font-size:48px;
                        margin-bottom:16px;
                    "
                >
                    shopping_bag
                </span>

                <p
                    style="
                        color:var(--on-surface-variant);
                        margin-bottom:20px;
                    "
                >
                    Your cart is empty.
                </p>

                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    Continue Shopping
                </a>

            </div>
        `;

        if (placeOrderButton) {
            placeOrderButton.disabled = true;
            placeOrderButton.textContent =
                'Cart is Empty';
        }
    }


    // =====================================================
    // RENDER ORDER SUMMARY
    // =====================================================

    function renderOrderSummary() {

        const order =
            calculateOrder();

        const {
            cart,
            subtotal,
            shipping,
            tax,
            total
        } = order;


        if (!orderSummary) {
            return;
        }


        if (cart.length === 0) {
            showEmptyCheckout();
            return;
        }


        const itemsMarkup =
            cart.map(item => {

                const quantity =
                    Number(item.quantity) || 0;

                const price =
                    parsePrice(item.price);

                const itemTotal =
                    price * quantity;

                return `
                    <div class="summary-line">

                        <span>
                            ${item.name}
                            ${
                                quantity > 1
                                    ? ` × ${quantity}`
                                    : ''
                            }
                        </span>

                        <span>
                            ${formatPrice(itemTotal)}
                        </span>

                    </div>
                `;

            }).join('');


        orderSummary.innerHTML = `

            <h2
                class="headline-md"
                style="color:var(--primary);"
            >
                Order Summary
            </h2>


            <div class="summary-lines">

                ${itemsMarkup}


                <div
                    class="divider"
                    style="margin:16px 0;"
                ></div>


                <div class="summary-line">

                    <span>
                        Subtotal
                    </span>

                    <span>
                        ${formatPrice(subtotal)}
                    </span>

                </div>


                <div class="summary-line">

                    <span>
                        Shipping
                    </span>

                    <span>
                        ${
                            shipping === 0
                                ? 'Free'
                                : formatPrice(shipping)
                        }
                    </span>

                </div>


                <div class="summary-line">

                    <span>
                        Tax
                    </span>

                    <span>
                        ${formatPrice(tax)}
                    </span>

                </div>

            </div>


            <div
                class="summary-total"
                style="margin-bottom:0;"
            >

                <span class="total-label">
                    Total
                </span>

                <span class="total-amount">
                    ${formatPrice(total)}
                </span>

            </div>
        `;


        // Update Place Order button
        if (placeOrderButton) {

            placeOrderButton.textContent =
                `Place Order - ${formatPrice(total)}`;

            placeOrderButton.disabled =
                false;
        }
    }


    // =====================================================
    // PAYMENT METHOD
    // =====================================================

    const paymentMethods =
        document.querySelectorAll(
            '.payment-method'
        );


    paymentMethods.forEach(method => {

        method.addEventListener(
            'click',
            () => {

                paymentMethods.forEach(
                    item => {
                        item.classList.remove(
                            'active'
                        );
                    }
                );

                method.classList.add(
                    'active'
                );
            }
        );
    });


    // =====================================================
    // CARD NUMBER FORMAT
    // =====================================================

    const cardInput =
        document.getElementById('card');


    if (cardInput) {

        cardInput.addEventListener(
            'input',
            () => {

                let value =
                    cardInput.value
                        .replace(/\D/g, '')
                        .slice(0, 16);

                value =
                    value.replace(
                        /(.{4})/g,
                        '$1 '
                    ).trim();

                cardInput.value =
                    value;
            }
        );
    }


    // =====================================================
    // EXPIRY FORMAT
    // =====================================================

    const expiryInput =
        document.getElementById(
            'expiry'
        );


    if (expiryInput) {

        expiryInput.addEventListener(
            'input',
            () => {

                let value =
                    expiryInput.value
                        .replace(/\D/g, '')
                        .slice(0, 4);

                if (value.length > 2) {

                    value =
                        `${value.slice(0, 2)}/${value.slice(2)}`;
                }

                expiryInput.value =
                    value;
            }
        );
    }


    // =====================================================
    // CVV FORMAT
    // =====================================================

    const cvvInput =
        document.getElementById('cvv');


    if (cvvInput) {

        cvvInput.addEventListener(
            'input',
            () => {

                cvvInput.value =
                    cvvInput.value
                        .replace(/\D/g, '')
                        .slice(0, 4);
            }
        );
    }


    // =====================================================
    // PLACE ORDER
    // =====================================================

    if (checkoutForm) {

        checkoutForm.addEventListener(
            'submit',
            event => {

                event.preventDefault();


                const order =
                    calculateOrder();


                if (
                    order.cart.length === 0
                ) {

                    alert(
                        'Your cart is empty.'
                    );

                    return;
                }


                // =========================================
                // SAVE ORDER HISTORY
                // =========================================

                let orders = [];

                try {

                    orders =
                        JSON.parse(
                            localStorage.getItem(
                                'luxeOrders'
                            )
                        ) || [];

                } catch (error) {

                    orders = [];
                }


                const newOrder = {

                    id:
                        `LUXE-${Date.now()}`,

                    date:
                        new Date().toISOString(),

                    items:
                        order.cart.map(
                            item => ({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                variant:
                                    item.variant ||
                                    'Default',
                                quantity:
                                    Number(
                                        item.quantity
                                    ) || 1,
                                image:
                                    item.image || ''
                            })
                        ),

                    subtotal:
                        order.subtotal,

                    shipping:
                        order.shipping,

                    tax:
                        order.tax,

                    total:
                        order.total,

                    status:
                        'Processing'
                };


                orders.unshift(
                    newOrder
                );


                localStorage.setItem(
                    'luxeOrders',
                    JSON.stringify(
                        orders
                    )
                );


                // =========================================
                // SHOW SUCCESS MODAL
                // =========================================

                if (successModal) {

                    successModal.style.display =
                        'flex';

                } else {

                    alert(
                        `Order ${newOrder.id} confirmed!`
                    );
                }
            }
        );
    }


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    if (closeModalButton) {

        closeModalButton.addEventListener(
            'click',
            () => {

                // Очистить корзину
                localStorage.removeItem(
                    CART_KEY
                );


                // Вернуться на главную
                window.location.href =
                    'index.html';
            }
        );
    }


    // =====================================================
    // INITIAL RENDER
    // =====================================================

    renderOrderSummary();
});