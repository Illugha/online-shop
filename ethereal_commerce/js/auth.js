/**
 * LUXE — Auth & Profile System
 */

// Читаем текущего вошедшего пользователя
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('luxeCurrentUser')) || null;
    } catch {
        return null;
    }
}

// Сохраняем текущую сессию
function saveCurrentUser(user) {
    localStorage.setItem('luxeCurrentUser', JSON.stringify(user));
    // Обновляем также в общем списке аккаунтов
    const users = getAllUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (index !== -1) {
        users[index] = user;
    } else {
        users.push(user);
    }
    localStorage.setItem('luxeUsers', JSON.stringify(users));
}

function getAllUsers() {
    try {
        return JSON.parse(localStorage.getItem('luxeUsers')) || [];
    } catch {
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');
    const profileContainer = document.getElementById('profile-container');

    const tabRegisterBtn = document.getElementById('tab-register-btn');
    const tabLoginBtn = document.getElementById('tab-login-btn');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    const skipCardCheckbox = document.getElementById('reg-skip-card');
    const cardInputsWrapper = document.getElementById('reg-card-inputs');

    const cardNumInput = document.getElementById('reg-card-number');
    const cardExpInput = document.getElementById('reg-card-exp');
    const cardCvvInput = document.getElementById('reg-card-cvv');

    // Форматирование ввода карты
    if (cardNumInput) {
        cardNumInput.addEventListener('input', () => {
            let val = cardNumInput.value.replace(/\D/g, '').slice(0, 16);
            cardNumInput.value = val.replace(/(.{4})/g, '$1 ').trim();
        });
    }
    if (cardExpInput) {
        cardExpInput.addEventListener('input', () => {
            let val = cardExpInput.value.replace(/\D/g, '').slice(0, 4);
            if (val.length > 2) val = `${val.slice(0, 2)}/${val.slice(2)}`;
            cardExpInput.value = val;
        });
    }
    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', () => {
            cardCvvInput.value = cardCvvInput.value.replace(/\D/g, '').slice(0, 4);
        });
    }

    // Чекбокс "Добавить карту позже"
    if (skipCardCheckbox && cardInputsWrapper) {
        skipCardCheckbox.addEventListener('change', () => {
            if (skipCardCheckbox.checked) {
                cardInputsWrapper.style.display = 'none';
                cardNumInput.value = '';
                cardExpInput.value = '';
                cardCvvInput.value = '';
            } else {
                cardInputsWrapper.style.display = 'block';
            }
        });
    }

    // Переключение табов Register / Login
    if (tabRegisterBtn && tabLoginBtn) {
        tabRegisterBtn.addEventListener('click', () => {
            tabRegisterBtn.classList.add('active');
            tabLoginBtn.classList.remove('active');
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
        });

        tabLoginBtn.addEventListener('click', () => {
            tabLoginBtn.classList.add('active');
            tabRegisterBtn.classList.remove('active');
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });
    }

    // Регистрация
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const lastName = document.getElementById('reg-last-name').value.trim();
            const firstName = document.getElementById('reg-first-name').value.trim();
            const middleName = document.getElementById('reg-middle-name').value.trim();
            const zip = document.getElementById('reg-zip').value.trim();

            const users = getAllUsers();
            if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                alert('Account with this email already exists.');
                return;
            }

            let card = null;
            if (!skipCardCheckbox.checked && cardNumInput.value.trim().length >= 15) {
                card = {
                    number: cardNumInput.value.trim(),
                    last4: cardNumInput.value.replace(/\s/g, '').slice(-4),
                    expiry: cardExpInput.value.trim(),
                    cvv: cardCvvInput.value.trim()
                };
            }

            const newUser = {
                email,
                password,
                lastName,
                firstName,
                middleName,
                zip,
                card
            };

            saveCurrentUser(newUser);
            renderProfile();
        });
    }

    // Вход
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            const user = getAllUsers().find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );

            if (!user) {
                alert('Invalid email or password.');
                return;
            }

            saveCurrentUser(user);
            renderProfile();
        });
    }

    // Выход
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('luxeCurrentUser');
            renderProfile();
        });
    }

    // Отрисовка профиля
    function renderProfile() {
        const user = getCurrentUser();
        if (user && profileContainer && authContainer) {
            authContainer.style.display = 'none';
            profileContainer.style.display = 'block';

            document.getElementById('profile-name').textContent = `${user.lastName} ${user.firstName}`;
            document.getElementById('profile-email').textContent = user.email;
            document.getElementById('profile-zip').textContent = user.zip;
            document.getElementById('profile-middle').textContent = user.middleName || 'Не указано';

            const cardStatus = document.getElementById('profile-card-status');
            if (user.card && user.card.last4) {
                cardStatus.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding: 12px; border: 1px solid var(--outline-variant); border-radius: var(--radius-sm);">
                        <span>💳 Card ending in <strong>•••• ${user.card.last4}</strong> (Exp: ${user.card.expiry})</span>
                        <button type="button" class="remove-btn" id="delete-saved-card-btn">Remove Card</button>
                    </div>
                `;
                document.getElementById('delete-saved-card-btn').addEventListener('click', () => {
                    user.card = null;
                    saveCurrentUser(user);
                    renderProfile();
                });
            } else {
                cardStatus.innerHTML = `
                    <p style="color: var(--on-surface-variant); margin-bottom: 8px;">No card saved yet.</p>
                `;
            }
        } else if (authContainer && profileContainer) {
            authContainer.style.display = 'block';
            profileContainer.style.display = 'none';
        }
    }

    renderProfile();
});