'use strict';

// 1. Исходные данные каталога товаров
const PRODUCTS = [
  {
    id: 1,
    title: 'Беспроводные наушники Pro',
    price: 9990,
    description: 'Активное шумоподавление, до 30 часов автономной работы и чистый звук.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
  },
  {
    id: 2,
    title: 'Смарт-часы FitPulse',
    price: 14500,
    description: 'AMOLED-экран, датчик пульса, мониторинг сна и GPS-трекинг.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'
  },
  {
    id: 3,
    title: 'Механическая клавиатура RGB',
    price: 6800,
    description: 'Надежные переключатели Red Switches, эргономичный корпус и кастомная подсветка.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80'
  },
  {
    id: 4,
    title: 'Беспроводная мышь Master',
    price: 4200,
    description: 'Высокоточный сенсор 4000 DPI, тихие клики и подключение к трем устройствам.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80'
  },
  {
    id: 5,
    title: 'Портативная колонка Boom',
    price: 5900,
    description: 'Мощный бас, защита от воды IPX7 и воспроизведение до 15 часов.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80'
  },
  {
    id: 6,
    title: 'Внешний аккумулятор 20000 mAh',
    price: 2990,
    description: 'Быстрая зарядка Power Delivery 65W для смартфонов и ноутбуков.',
    image: 'https://images.unsplash.com/photo-1609592426860-26f63458ff6d?w=500&q=80'
  }
];

const STORAGE_KEY = 'store_cart_data';

// 2. Состояние приложения (Корзина)
let cart = loadCart();

// DOM элементы
const productsGrid = document.getElementById('productsGrid');
const cartBadge = document.getElementById('cartBadge');
const cartModal = document.getElementById('cartModal');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartList = document.getElementById('cartList');
const cartEmptyMsg = document.getElementById('cartEmptyMsg');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

const orderModal = document.getElementById('orderModal');
const closeOrderBtn = document.getElementById('closeOrderBtn');
const orderOverlay = document.getElementById('orderOverlay');
const orderForm = document.getElementById('orderForm');
const toastEl = document.getElementById('toast');

// Форматирование цены (например, 9 990 ₽)
const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`;

// ==========================================================================
// LocalStorage
// ==========================================================================
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Ошибка загрузки корзины:', e);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Ошибка сохранения корзины:', e);
  }
}

// ==========================================================================
// Отрисовка каталога товаров
// ==========================================================================
function renderProducts() {
  productsGrid.innerHTML = PRODUCTS.map((item) => `
    <article class="product-card">
      <div class="product-card__image-wrap">
        <img class="product-card__img" src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
      <div class="product-card__body">
        <h2 class="product-card__title">${item.title}</h2>
        <p class="product-card__description">${item.description}</p>
        <div class="product-card__footer">
          <span class="product-card__price">${formatPrice(item.price)}</span>
          <button class="btn btn--primary" onclick="addToCart(${item.id})">
            В корзину
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// ==========================================================================
// Логика корзины (Добавление, изменение, удаление)
// ==========================================================================
window.addToCart = function(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast('Товар добавлен в корзину');
};

window.changeQuantity = function(productId, delta) {
  const item = cart.find((p) => p.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartUI();
};

window.removeFromCart = function(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
};

function updateCartUI() {
  // 1. Бейдж количества
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartBadge.textContent = totalCount;

  // 2. Итоговая сумма
  const totalSum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotalPrice.textContent = formatPrice(totalSum);

  // 3. Состояние кнопки "Оформить"
  checkoutBtn.disabled = cart.length === 0;

  // 4. Отрисовка списка товаров
  if (cart.length === 0) {
    cartList.innerHTML = '';
    cartEmptyMsg.style.display = 'block';
  } else {
    cartEmptyMsg.style.display = 'none';
    cartList.innerHTML = cart.map((item) => `
      <li class="cart-item">
        <img class="cart-item__img" src="${item.image}" alt="${item.title}">
        <div class="cart-item__info">
          <div class="cart-item__title">${item.title}</div>
          <div class="cart-item__price">${formatPrice(item.price)}</div>
        </div>
        <div class="cart-item__controls">
          <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)" aria-label="Уменьшить">-</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)" aria-label="Увеличить">+</button>
        </div>
        <button class="cart-item__remove" onclick="removeFromCart(${item.id})" title="Удалить товар">&times;</button>
      </li>
    `).join('');
  }
}

// ==========================================================================
// Управление модальными окнами
// ==========================================================================
function openModal(modalEl) {
  modalEl.classList.add('is-active');
  modalEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  modalEl.classList.remove('is-active');
  modalEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// События корзины
openCartBtn.addEventListener('click', () => openModal(cartModal));
closeCartBtn.addEventListener('click', () => closeModal(cartModal));
cartOverlay.addEventListener('click', () => closeModal(cartModal));

// Переход из корзины в окно оформления
checkoutBtn.addEventListener('click', () => {
  closeModal(cartModal);
  openModal(orderModal);
});

// Закрытие модального окна заказа
closeOrderBtn.addEventListener('click', () => closeModal(orderModal));
orderOverlay.addEventListener('click', () => closeModal(orderModal));

// ==========================================================================
// Валидация и отправка формы
// ==========================================================================
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = orderForm.querySelectorAll('.form-input');
  let isValid = true;

  inputs.forEach((input) => {
    const parent = input.closest('.form-group');
    if (!input.checkValidity()) {
      parent.classList.add('has-error');
      isValid = false;
    } else {
      parent.classList.remove('has-error');
    }
  });

  if (!isValid) return;

  // Если всё заполнено корректно:
  closeModal(orderModal);
  orderForm.reset();

  // Очистка корзины
  cart = [];
  saveCart();
  updateCartUI();

  // Сообщение по ТЗ
  alert('Заказ создан!');
  showToast('Заказ успешно создан!', 'success');
});

// Снятие ошибки при вводе
orderForm.querySelectorAll('.form-input').forEach((input) => {
  input.addEventListener('input', () => {
    input.closest('.form-group').classList.remove('has-error');
  });
});

// ==========================================================================
// Toast-уведомления
// ==========================================================================
let toastTimeout;
function showToast(message, type = 'normal') {
  clearTimeout(toastTimeout);
  toastEl.textContent = message;
  toastEl.className = 'toast is-show';
  if (type === 'success') toastEl.classList.add('toast--success');

  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('is-show');
  }, 2500);
}

// ==========================================================================
// Инициализация приложения
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
});
