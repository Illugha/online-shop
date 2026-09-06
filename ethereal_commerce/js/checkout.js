/**
 * LUXE — Checkout Logic (With Multi-Payment Support)
 */

document.addEventListener('DOMContentLoaded', () => {

    const CART_KEY = 'luxeCart';

    const checkoutForm = document.getElementById('checkout-form');
    const orderSummary = document.querySelector('.order-summary');
    const placeOrderButton = checkoutForm?.querySelector('button[type="submit"]');
    const successModal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('close-modal');

    // Блоки способов оплаты
    const paymentMethods = document.querySelectorAll('.payment-method');
    const cardPaymentView = document.getElementById('card-payment-view');
    const paypalPaymentView = document.getElementById('paypal-payment-view');
    const applePaymentView = document.getElementById('apple-payment-view');

    let selectedPaymentMethod = 'card'; // 'card' | 'paypal' | 'apple'

    // Элементы карты и профиля
    const savedCardSection = document.getElementById('saved-card-section');
    const savedCardPreview = document.getElementById('saved-card-preview');
    const savedCardExpPreview = document.getElementById('saved-card-exp-preview');
    const toggleAddPaymentBtn = document.getElementById('toggle-add-payment-btn');
    const cardFormWrapper = document.getElementById('card-form-wrapper');
    const rememberCardWrapper = document.getElementById('remember-card-wrapper');
    const rememberCardCheckbox = document.getElementById('remember-card');

    const cardInput = document.getElementById('card');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');

    // =====================================================
    // 1. АВТОЗАПОЛНЕНИЕ ДАННЫХ ИЗ ПРОФИЛЯ
    // =====================================================
    let currentUser = null;
    try {
        currentUser = JSON.parse(localStorage.getItem('luxeCurrentUser'));
    } catch {
        currentUser = null;
    }

    if (currentUser) {
        const emailInput = document.getElementById('email');
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const zipInput = document.getElementById('zip');

        if (emailInput && currentUser.email) emailInput.value = currentUser.email;
        if (firstNameInput && currentUser.firstName) firstNameInput.value = currentUser.firstName;
        if (lastNameInput && currentUser.lastName) lastNameInput.value = currentUser.lastName;
        if (zipInput && currentUser.zip) zipInput.value = currentUser.zip;

        if (currentUser.card && currentUser.card.last4) {
            if (savedCardSection) savedCardSection.style.display = 'block';
            if (savedCardPreview) savedCardPreview.textContent = `•••• •••• •••• ${currentUser.card.last4}`;
            if (savedCardExpPreview) savedCardExpPreview.textContent = `Expires ${currentUser.card.expiry}`;
            if (cardFormWrapper) cardFormWrapper.style.display = 'none';
            if (rememberCardWrapper) rememberCardWrapper.style.display = 'none';

            if (toggleAddPaymentBtn) {
                toggleAddPaymentBtn.addEventListener('click', () => {
                    if (cardFormWrapper.style.display === 'none') {
                        cardFormWrapper.style.display = 'block';
                        toggleAddPaymentBtn.textContent = 'Cancel';
                        cardInput?.focus();
                    } else {
                        cardFormWrapper.style.display = 'none';
                        toggleAddPaymentBtn.textContent = '+ Add payment';
                    }
                });
            }
        } else {
            if (savedCardSection) savedCardSection.style.display = 'none';
            if (cardFormWrapper) cardFormWrapper.style.display = 'block';
            if (rememberCardWrapper) rememberCardWrapper.style.display = 'block';
        }
    } else {
        if (savedCardSection) savedCardSection.style.display = 'none';
        if (cardFormWrapper) cardFormWrapper.style.display = 'block';
    }

    // =====================================================
    // 2. ПЕРЕКЛЮЧЕНИЕ СПОСОБОВ ОПЛАТЫ
    // =====================================================
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(item => item.classList.remove('active'));
            method.classList.add('active');

            selectedPaymentMethod = method.dataset.method || 'card';

            // Скрываем все блоки
            if (cardPaymentView) cardPaymentView.style.display = 'none';
            if (paypalPaymentView) paypalPaymentView.style.display = 'none';
            if (applePaymentView) applePaymentView.style.display = 'none';

            // Показываем выбранный блок
            if (selectedPaymentMethod === 'card') {
                if (cardPaymentView) cardPaymentView.style.display = 'block';
            } else if (selectedPaymentMethod === 'paypal') {
                if (paypalPaymentView) paypalPaymentView.style.display = 'block';
            } else if (selectedPaymentMethod === 'apple') {
                if (applePaymentView) applePaymentView.style.display = 'block';
            }

            updateButtonLabel();
        });
    });

    function updateButtonLabel() {
        if (!placeOrderButton) return;
        const { total } = calculateOrder();
        const price = formatPrice(total);

        if (selectedPaymentMethod === 'paypal') {
            placeOrderButton.textContent = `Pay with PayPal - ${price}`;
        } else if (selectedPaymentMethod === 'apple') {
            placeOrderButton.textContent = `Pay with Apple Pay - ${price}`;
        } else {
            placeOrderButton.textContent = `Place Order - ${price}`;
        }
    }

    // =====================================================
    // 3. ПОДСЧЕТ И РАСЧЕТЫ ЗАКАЗА
    // =====================================================
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch {
            return [];
        }
    }

    function formatPrice(value) {
        return `$${Number(value).toFixed(2)}`;
    }

    function parsePrice(price) {
        if (typeof price === 'number') return price;
        return Number(String(price).replace('$', '').replace(/,/g, '').trim()) || 0;
    }

    function calculateOrder() {
        const cart = getCart();
        const subtotal = cart.reduce((total, item) => {
            const price = parsePrice(item.price);
            const quantity = Number(item.quantity) || 0;
            return total + price * quantity;
        }, 0);

        const shipping = 0;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        return { cart, subtotal, shipping, tax, total };
    }

    function renderOrderSummary() {
        const { cart, subtotal, shipping, tax, total } = calculateOrder();

        if (!orderSummary) return;

        if (cart.length === 0) {
            orderSummary.innerHTML = `
                <h2 class="headline-md" style="color:var(--primary);">Your Order</h2>
                <div style="text-align:center; padding:30px 10px;">
                    <span class="material-symbols-outlined" style="font-size:48px; margin-bottom:16px;">shopping_bag</span>
                    <p style="color:var(--on-surface-variant); margin-bottom:20px;">Your cart is empty.</p>
                    <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
                </div>
            `;
            if (placeOrderButton) {
                placeOrderButton.disabled = true;
                placeOrderButton.textContent = 'Cart is Empty';
            }
            return;
        }

        const itemsMarkup = cart.map(item => {
            const quantity = Number(item.quantity) || 0;
            const price = parsePrice(item.price);
            return `
                <div class="summary-line">
                    <span>${item.name} ${quantity > 1 ? ` × ${quantity}` : ''}</span>
                    <span>${formatPrice(price * quantity)}</span>
                </div>
            `;
        }).join('');

        orderSummary.innerHTML = `
            <h2 class="headline-md" style="color:var(--primary);">Order Summary</h2>
            <div class="summary-lines">
                ${itemsMarkup}
                <div class="divider" style="margin:16px 0;"></div>
                <div class="summary-line"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
                <div class="summary-line"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
                <div class="summary-line"><span>Tax</span><span>${formatPrice(tax)}</span></div>
            </div>
            <div class="summary-total" style="margin-bottom:0;">
                <span class="total-label">Total</span>
                <span class="total-amount">${formatPrice(total)}</span>
            </div>
        `;

        if (placeOrderButton) {
            placeOrderButton.disabled = false;
            updateButtonLabel();
        }
    }

    // =====================================================
    // 4. МАСКИ ДЛЯ КАРТЫ
    // =====================================================
    if (cardInput) {
        cardInput.addEventListener('input', () => {
            let val = cardInput.value.replace(/\D/g, '').slice(0, 16);
            cardInput.value = val.replace(/(.{4})/g, '$1 ').trim();
        });
    }
    if (expiryInput) {
        expiryInput.addEventListener('input', () => {
            let val = expiryInput.value.replace(/\D/g, '').slice(0, 4);
            if (val.length > 2) val = `${val.slice(0, 2)}/${val.slice(2)}`;
            expiryInput.value = val;
        });
    }
    if (cvvInput) {
        cvvInput.addEventListener('input', () => {
            cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 4);
        });
    }

    // =====================================================
    // 5. ОТПРАВКА ФОРМЫ (ОФОРМЛЕНИЕ ЗАКАЗА)
    // =====================================================
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', event => {
            event.preventDefault();

            const order = calculateOrder();
            if (order.cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }

            // Валидируем карту ТОЛЬКО если выбран метод "Credit Card"
            if (selectedPaymentMethod === 'card') {
                const isEnteringNewCard = cardFormWrapper && cardFormWrapper.style.display !== 'none';
                if (isEnteringNewCard) {
                    const rawCard = cardInput.value.replace(/\s/g, '');
                    if (rawCard.length < 15) {
                        alert('Please enter a valid card number.');
                        return;
                    }

                    // Сохраняем карту в профиль, если стоит чекбокс
                    if (currentUser && rememberCardCheckbox && rememberCardCheckbox.checked) {
                        currentUser.card = {
                            number: cardInput.value.trim(),
                            last4: rawCard.slice(-4),
                            expiry: expiryInput.value.trim(),
                            cvv: cvvInput.value.trim()
                        };
                        localStorage.setItem('luxeCurrentUser', JSON.stringify(currentUser));

                        try {
                            const users = JSON.parse(localStorage.getItem('luxeUsers')) || [];
                            const idx = users.findIndex(u => u.email === currentUser.email);
                            if (idx !== -1) {
                                users[idx] = currentUser;
                                localStorage.setItem('luxeUsers', JSON.stringify(users));
                            }
                        } catch { }
                    }
                }
            }

            // Формируем заказ
            let orders = [];
            try {
                orders = JSON.parse(localStorage.getItem('luxeOrders')) || [];
            } catch {
                orders = [];
            }

            const paymentTitles = {
                card: 'Credit Card',
                paypal: 'PayPal',
                apple: 'Apple Pay'
            };

            const newOrder = {
                id: `LUXE-${Date.now()}`,
                date: new Date().toISOString(),
                paymentMethod: paymentTitles[selectedPaymentMethod],
                items: order.cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    variant: item.variant || 'Default',
                    quantity: Number(item.quantity) || 1,
                    image: item.image || ''
                })),
                subtotal: order.subtotal,
                shipping: order.shipping,
                tax: order.tax,
                total: order.total,
                status: 'Processing'
            };

            orders.unshift(newOrder);
            localStorage.setItem('luxeOrders', JSON.stringify(orders));

            if (successModal) {
                successModal.style.display = 'flex';
            } else {
                alert(`Order ${newOrder.id} confirmed via ${paymentTitles[selectedPaymentMethod]}!`);
            }
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            localStorage.removeItem(CART_KEY);
            window.location.href = '../index.html';
        });
    }

    renderOrderSummary();
});