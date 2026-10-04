/**
 * LUXE — Checkout Logic
 * WayForPay payment integration
 */

document.addEventListener('DOMContentLoaded', () => {

    const CART_KEY = 'luxeCart';

    const WAYFORPAY_URL = "https://secure.wayforpay.com/button/b9e4c24615e14"

    const checkoutForm =
        document.getElementById('checkout-form');

    const orderSummary =
        document.querySelector('.order-summary');

    const placeOrderButton =
        checkoutForm?.querySelector('button[type="submit"]');

    const successModal =
        document.getElementById('success-modal');

    const closeModalButton =
        document.getElementById('close-modal');


    // =====================================================
    // СПОСОБИ ОПЛАТИ
    // =====================================================

    const paymentMethods =
        document.querySelectorAll('.payment-method');

    const cardPaymentView =
        document.getElementById('card-payment-view');

    const paypalPaymentView =
        document.getElementById('paypal-payment-view');

    const applePaymentView =
        document.getElementById('apple-payment-view');


    let selectedPaymentMethod = 'card';


    // =====================================================
    // ДАНІ КОРИСТУВАЧА
    // =====================================================

    let currentUser = null;

    try {
        currentUser =
            JSON.parse(
                localStorage.getItem('luxeCurrentUser')
            );
    } catch {
        currentUser = null;
    }


    // =====================================================
    // ЕЛЕМЕНТИ КАРТКИ
    // =====================================================

    const savedCardSection =
        document.getElementById('saved-card-section');

    const savedCardPreview =
        document.getElementById('saved-card-preview');

    const savedCardExpPreview =
        document.getElementById('saved-card-exp-preview');

    const toggleAddPaymentBtn =
        document.getElementById('toggle-add-payment-btn');

    const cardFormWrapper =
        document.getElementById('card-form-wrapper');

    const rememberCardWrapper =
        document.getElementById('remember-card-wrapper');

    const cardInput =
        document.getElementById('card');

    const expiryInput =
        document.getElementById('expiry');

    const cvvInput =
        document.getElementById('cvv');


    // =====================================================
    // 1. АВТОЗАПОВНЕННЯ ПРОФІЛЮ
    // =====================================================

    if (currentUser) {

        const emailInput =
            document.getElementById('email');

        const firstNameInput =
            document.getElementById('firstName');

        const lastNameInput =
            document.getElementById('lastName');

        const zipInput =
            document.getElementById('zip');


        if (emailInput && currentUser.email) {
            emailInput.value = currentUser.email;
        }

        if (firstNameInput && currentUser.firstName) {
            firstNameInput.value = currentUser.firstName;
        }

        if (lastNameInput && currentUser.lastName) {
            lastNameInput.value = currentUser.lastName;
        }

        if (zipInput && currentUser.zip) {
            zipInput.value = currentUser.zip;
        }


        // Якщо в профілі є збережена картка,
        // показуємо тільки останні 4 цифри.
        if (
            currentUser.card &&
            currentUser.card.last4
        ) {

            if (savedCardSection) {
                savedCardSection.style.display = 'block';
            }

            if (savedCardPreview) {
                savedCardPreview.textContent =
                    `•••• •••• •••• ${currentUser.card.last4}`;
            }

            if (savedCardExpPreview) {
                savedCardExpPreview.textContent =
                    `Expires ${currentUser.card.expiry}`;
            }

            if (cardFormWrapper) {
                cardFormWrapper.style.display = 'none';
            }

            if (rememberCardWrapper) {
                rememberCardWrapper.style.display = 'none';
            }


            // Кнопка додавання нової картки
            if (toggleAddPaymentBtn) {

                toggleAddPaymentBtn.addEventListener(
                    'click',
                    () => {

                        if (
                            cardFormWrapper.style.display ===
                            'none'
                        ) {

                            cardFormWrapper.style.display =
                                'block';

                            toggleAddPaymentBtn.textContent =
                                'Cancel';

                            cardInput?.focus();

                        } else {

                            cardFormWrapper.style.display =
                                'none';

                            toggleAddPaymentBtn.textContent =
                                '+ Add payment';
                        }

                    }
                );
            }


        } else {

            if (savedCardSection) {
                savedCardSection.style.display = 'none';
            }

            if (cardFormWrapper) {
                cardFormWrapper.style.display = 'block';
            }

            if (rememberCardWrapper) {
                rememberCardWrapper.style.display = 'block';
            }
        }


    } else {

        if (savedCardSection) {
            savedCardSection.style.display = 'none';
        }

        if (cardFormWrapper) {
            cardFormWrapper.style.display = 'block';
        }

    }


    // =====================================================
    // 2. ПЕРЕМИКАННЯ СПОСОБІВ ОПЛАТИ
    // =====================================================

    paymentMethods.forEach(method => {

        method.addEventListener('click', () => {

            paymentMethods.forEach(item => {
                item.classList.remove('active');
            });

            method.classList.add('active');


            selectedPaymentMethod =
                method.dataset.method || 'card';


            // Ховаємо всі блоки
            if (cardPaymentView) {
                cardPaymentView.style.display = 'none';
            }

            if (paypalPaymentView) {
                paypalPaymentView.style.display = 'none';
            }

            if (applePaymentView) {
                applePaymentView.style.display = 'none';
            }


            // Показуємо потрібний блок
            if (selectedPaymentMethod === 'card') {

                if (cardPaymentView) {
                    cardPaymentView.style.display = 'block';
                }

            } else if (
                selectedPaymentMethod === 'paypal'
            ) {

                if (paypalPaymentView) {
                    paypalPaymentView.style.display = 'block';
                }

            } else if (
                selectedPaymentMethod === 'apple'
            ) {

                if (applePaymentView) {
                    applePaymentView.style.display = 'block';
                }

            }


            updateButtonLabel();

        });

    });


    // =====================================================
    // 3. ТЕКСТ КНОПКИ
    // =====================================================

    function updateButtonLabel() {

        if (!placeOrderButton) return;


        const { total } =
            calculateOrder();

        const price =
            formatPrice(total);


        if (
            selectedPaymentMethod ===
            'paypal'
        ) {

            placeOrderButton.textContent =
                `Pay with PayPal - ${price}`;

        } else if (
            selectedPaymentMethod ===
            'apple'
        ) {

            placeOrderButton.textContent =
                `Pay with Apple Pay - ${price}`;

        } else {

            placeOrderButton.textContent =
                `Pay with WayForPay - ${price}`;

        }

    }


    // =====================================================
    // 4. ОТРИМАННЯ КОШИКА
    // =====================================================

    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem(CART_KEY)
            ) || [];

        } catch {

            return [];

        }

    }


    // =====================================================
    // 5. ФОРМАТУВАННЯ ЦІНИ
    // =====================================================

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
    // 6. РОЗРАХУНОК ЗАМОВЛЕННЯ
    // =====================================================

    function calculateOrder() {

        const cart = getCart();


        const subtotal =
            cart.reduce(
                (total, item) => {

                    const price =
                        parsePrice(item.price);

                    const quantity =
                        Number(item.quantity) || 0;


                    return total +
                        price * quantity;

                },
                0
            );

        const appliedPromo = window.LuxePromo ? window.LuxePromo.getApplied() : null;
        let discount = 0;
        if (appliedPromo && appliedPromo.percent && subtotal > 0) {
            discount = Number((subtotal * (appliedPromo.percent / 100)).toFixed(2));
        }

        const shipping = 0;
        const discountedSubtotal = Math.max(0, subtotal - discount);
        const tax = Number((discountedSubtotal * 0.08).toFixed(2));

        const total =
            discountedSubtotal +
            shipping +
            tax;


        return {
            cart,
            subtotal,
            discount,
            appliedPromo,
            shipping,
            tax,
            total
        };

    }


    // =====================================================
    // 7. ВІДОБРАЖЕННЯ ORDER SUMMARY
    // =====================================================

    function renderOrderSummary() {

        const {
            cart,
            subtotal,
            discount,
            appliedPromo,
            shipping,
            tax,
            total
        } = calculateOrder();


        if (!orderSummary) return;


        // Якщо кошик порожній
        if (cart.length === 0) {

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


            return;

        }


        // Товари
        const itemsMarkup =
            cart.map(item => {

                const quantity =
                    Number(item.quantity) || 0;

                const price =
                    parsePrice(item.price);


                return `
                    <div class="summary-line">

                        <span>
                            ${item.name}

                            ${quantity > 1
                        ? ` × ${quantity}`
                        : ''
                    }
                        </span>

                        <span>
                            ${formatPrice(
                        price * quantity
                    )}
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

                ${discount > 0 && appliedPromo ? `
                <div class="summary-line" style="color: #2e7d32; font-weight: 600;">
                    <span>
                        Discount (${appliedPromo.code} -${appliedPromo.percent}%)
                    </span>
                    <span>
                        -${formatPrice(discount)}
                    </span>
                </div>
                ` : ''}

                <div class="summary-line">

                    <span>
                        Shipping
                    </span>

                    <span>
                        ${shipping === 0
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

            <!-- PROMO CODE BOX IN CHECKOUT -->
            <div class="checkout-promo-box" style="margin: 16px 0; padding: 12px 14px; background: var(--surface-container-low); border-radius: 12px; border: 1px dashed var(--outline-variant);">
                ${appliedPromo ? `
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-size: 13px; font-weight: 600; color: #2e7d32;">
                            ✓ Промокод ${appliedPromo.code} (-${appliedPromo.percent}%)
                        </span>
                        <button type="button" id="checkout-remove-promo" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 12px; font-weight: 600; padding: 2px 4px;">Удалить</button>
                    </div>
                ` : `
                    <div style="display: flex; gap: 8px;">
                        <input type="text" id="checkout-promo-input" class="input-field" placeholder="Промокод (e.g. LUXE15)" style="padding: 8px 12px; font-size: 13px; flex-grow: 1;" />
                        <button type="button" id="checkout-apply-promo" class="btn btn-secondary" style="padding: 8px 14px; font-size: 13px; white-space: nowrap;">Применить</button>
                    </div>
                    <div id="checkout-promo-error" style="display: none; color: var(--error); font-size: 12px; margin-top: 6px;"></div>
                `}
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

        // Event listeners for promo in checkout
        const checkoutApplyBtn = orderSummary.querySelector('#checkout-apply-promo');
        const checkoutPromoInput = orderSummary.querySelector('#checkout-promo-input');
        const checkoutPromoError = orderSummary.querySelector('#checkout-promo-error');
        const checkoutRemoveBtn = orderSummary.querySelector('#checkout-remove-promo');

        if (checkoutApplyBtn && checkoutPromoInput) {
            const applyCheckoutPromo = () => {
                const code = checkoutPromoInput.value.trim().toUpperCase();
                if (!code) {
                    if (checkoutPromoError) {
                        checkoutPromoError.textContent = 'Пожалуйста, введите промокод.';
                        checkoutPromoError.style.display = 'block';
                    }
                    return;
                }
                if (window.LuxePromo) {
                    const res = window.LuxePromo.apply(code);
                    if (res.success) {
                        renderOrderSummary();
                    } else if (checkoutPromoError) {
                        checkoutPromoError.textContent = res.message;
                        checkoutPromoError.style.display = 'block';
                    }
                }
            };

            checkoutApplyBtn.addEventListener('click', applyCheckoutPromo);
            checkoutPromoInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    applyCheckoutPromo();
                }
            });
        }

        if (checkoutRemoveBtn) {
            checkoutRemoveBtn.addEventListener('click', () => {
                if (window.LuxePromo) {
                    window.LuxePromo.remove();
                    renderOrderSummary();
                }
            });
        }

        if (placeOrderButton) {

            placeOrderButton.disabled = false;

            updateButtonLabel();

        }

    }


    // =====================================================
    // 8. МАСКА НОМЕРА КАРТКИ
    // =====================================================

    if (cardInput) {

        cardInput.addEventListener(
            'input',
            () => {

                let value =
                    cardInput.value
                        .replace(/\D/g, '')
                        .slice(0, 16);


                cardInput.value =
                    value
                        .replace(/(.{4})/g, '$1 ')
                        .trim();

            }
        );

    }


    // =====================================================
    // 9. МАСКА ТЕРМІНУ ДІЇ
    // =====================================================

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


                expiryInput.value = value;

            }
        );

    }


    // =====================================================
    // 10. CVV
    // =====================================================

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
    // 11. ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
    // =====================================================

    if (checkoutForm) {

        checkoutForm.addEventListener(
            'submit',
            event => {

                event.preventDefault();


                const order =
                    calculateOrder();


                // Перевіряємо кошик
                if (order.cart.length === 0) {

                    alert(
                        'Your cart is empty.'
                    );

                    return;

                }


                // =================================================
                // WAYFORPAY
                // =================================================

                if (
                    selectedPaymentMethod ===
                    'card'
                ) {

                    /*
                     * ВАЖЛИВО:
                     *
                     * Номер картки НЕ обробляємо
                     * і НЕ зберігаємо тут.
                     *
                     * Користувач вводить дані картки
                     * безпосередньо на сторінці WayForPay.
                     */


                    window.location.href =
                        WAYFORPAY_URL;


                    return;

                }


                // =================================================
                // PAYPAL / APPLE PAY
                // =================================================

                let orders = [];


                try {

                    orders =
                        JSON.parse(
                            localStorage.getItem(
                                'luxeOrders'
                            )
                        ) || [];

                } catch {

                    orders = [];

                }


                const paymentTitles = {

                    card: 'Credit Card',

                    paypal: 'PayPal',

                    apple: 'Apple Pay'

                };


                const newOrder = {

                    id:
                        `LUXE-${Date.now()}`,

                    date:
                        new Date().toISOString(),

                    paymentMethod:
                        paymentTitles[
                        selectedPaymentMethod
                        ],

                    items:
                        order.cart.map(item => ({

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

                        })),

                    subtotal:
                        order.subtotal,

                    discount:
                        order.discount || 0,

                    promoCode:
                        order.appliedPromo ? order.appliedPromo.code : null,

                    shipping:
                        order.shipping,

                    tax:
                        order.tax,

                    total:
                        order.total,

                    status:
                        'Processing'

                };


                orders.unshift(newOrder);


                localStorage.setItem(
                    'luxeOrders',
                    JSON.stringify(orders)
                );

                if (window.LuxePromo) {
                    window.LuxePromo.remove();
                }


                if (successModal) {

                    successModal.style.display =
                        'flex';

                } else {

                    alert(
                        `Order ${newOrder.id} confirmed via ${paymentTitles[selectedPaymentMethod]}!`
                    );

                }

            }
        );

    }


    // =====================================================
    // 12. ЗАКРИТТЯ SUCCESS MODAL
    // =====================================================

    if (closeModalButton) {

        closeModalButton.addEventListener(
            'click',
            () => {

                localStorage.removeItem(
                    CART_KEY
                );
                if (window.LuxePromo) {
                    window.LuxePromo.remove();
                }

                window.location.href =
                    '../index.html';

            }
        );

    }


    // =====================================================
    // 13. ПЕРШИЙ РЕНДЕР
    // =====================================================

    renderOrderSummary();

});