'use strict';
// Гарантированное скрытие окна 18+
window.confirmAge = function() {
  const modal = document.getElementById('ageModal');
  if (modal) {
    modal.style.setProperty('display', 'none', 'important');
    localStorage.setItem('spirits_age_confirmed', 'true');
  }
};

// Проверка при загрузке: если уже нажимали "Да", сразу скрываем
if (localStorage.getItem('spirits_age_confirmed') === 'true') {
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('ageModal');
    if (modal) modal.style.setProperty('display', 'none', 'important');
  });
}
// 1. Каталог благородных напитков
const PRODUCTS = [
  // ================= ВИНА =================
  {
    id: 1,
    title: 'Château Margaux Grand Cru',
    category: 'wine',
    meta: 'Франция, Бордо • 13.5% об. • 0.75 л',
    price: 48500,
    description: 'Легендарное красное сухое вино высшей категории. Богатый букет с нотами черной смородины, кедра и фиалок.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=80'
  },
  {
    id: 2,
    title: 'Chablis Premier Cru Domaine',
    category: 'wine',
    meta: 'Франция, Бургундия • 12.5% об. • 0.75 л',
    price: 8900,
    description: 'Элегантное белое сухое вино из винограда Шардоне с кристальной минеральностью, тонами цитрусов и белых цветов.',
    image: 'https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=700&q=80'
  },
  {
    id: 3,
    title: 'Tignanello Toscana Antinori',
    category: 'wine',
    meta: 'Италия, Тоскана • 14.0% об. • 0.75 л',
    price: 21900,
    description: 'Культовое супертосканское вино на основе Санджовезе и Каберне Совиньон. Ноты спелой вишни, табака и темного шоколада.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=700&q=80'
  },

  // ================= ВИСКИ =================
  {
    id: 4,
    title: 'The Macallan 12 Years Double Cask',
    category: 'whiskey',
    meta: 'Шотландия, Спейсайд • 40.0% об. • 0.7 л',
    price: 11500,
    description: 'Сингл молт, выдержанный в бочках из американского и европейского дуба из-под хереса Oloroso. Ноты ириса и цукатов.',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=700&q=80'
  },
  {
    id: 5,
    title: 'Lagavulin 16 Years Old Single Malt',
    category: 'whiskey',
    meta: 'Шотландия, Айла • 43.0% об. • 0.7 л',
    price: 14800,
    description: 'Один из самых знаменитых торфяных виски мира. Глубокий аромат кострового дыма, морских водорослей и сухофруктов.',
    image: 'https://images.unsplash.com/photo-1582819509241-913417cba4b4?w=700&q=80'
  },
  {
    id: 6,
    title: 'Jameson Black Barrel Triple Distilled',
    category: 'whiskey',
    meta: 'Ирландия, Корк • 40.0% об. • 0.7 л',
    price: 4990,
    description: 'Ирландский бленд тройной дистилляции, дозревающий в дважды обожженных бочках из-под бурбона. Бархатистый ванильный вкус.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=700&q=80'
  },

  // ================= ШАМПАНСКОЕ =================
  {
    id: 7,
    title: 'Dom Pérignon Vintage Brut',
    category: 'champagne',
    meta: 'Франция, Шампань • 12.5% об. • 0.75 л',
    price: 34900,
    description: 'Винтажное премиальное шампанское. Тонкий перляж, оттенки бриоши, поджаренного миндаля и свежих белых персиков.',
    image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=700&q=80'
  },
  {
    id: 8,
    title: 'Moët & Chandon Impérial Brut',
    category: 'champagne',
    meta: 'Франция, Эперне • 12.0% об. • 0.75 л',
    price: 8900,
    description: 'Эталон классического французского шампанского. Яркий свежий фруктовый букет с тонами зеленых яблок и цитрусовых.',
    image: 'https://images.unsplash.com/photo-1580657274234-7339717f4541?w=700&q=80'
  },
  {
    id: 9,
    title: 'Veuve Clicquot Yellow Label Brut',
    category: 'champagne',
    meta: 'Франция, Реймс • 12.0% об. • 0.75 л',
    price: 9400,
    description: 'Знаменитое шампанское «Вдова Клико». Доминирующий сорт Пино Нуар придает напитку выразительную структуру и мощь.',
    image: 'https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=700&q=80'
  },

  // ================= КОНЬЯК =================
  {
    id: 10,
    title: 'Hennessy X.O Extra Old',
    category: 'cognac',
    meta: 'Франция, Коньяк • 40.0% об. • 0.7 л',
    price: 27900,
    description: 'Оригинальный коньяк класса XO. Ассамбляж сотни зрелых спиртов с нотами засахаренных фруктов, кожи и специй.',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=700&q=80'
  },
  {
    id: 11,
    title: 'Rémy Martin V.S.O.P Fine Champagne',
    category: 'cognac',
    meta: 'Франция, Коньяк • 40.0% об. • 0.7 л',
    price: 7600,
    description: 'Создан исключительно из винограда Гранд и Пти Шампань. Округлый вкус с оттенками спелых абрикосов, ванили и лакрицы.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&q=80'
  },
  {
    id: 12,
    title: 'Courvoisier X.O Imperial',
    category: 'cognac',
    meta: 'Франция, Жарнак • 40.0% об. • 0.7 л',
    price: 24500,
    description: 'Императорский коньяк с бархатным насыщенным вкусом, нюансами крем-брюле, апельсинового джема и благородного ириса.',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=700&q=80'
  }
];

// DOM элементы
const productsGrid = document.getElementById('productsGrid');
const noProducts = document.getElementById('noProducts');
const cartBadge = document.getElementById('cartBadge');
const cartModal = document.getElementById('cartModal');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartList = document.getElementById('cartList');
const cartEmptyMsg = document.getElementById('cartEmptyMsg');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

const orderModal = document.getElementById('orderModal');
const closeOrderBtn = document.getElementById('closeOrderBtn');
const orderOverlay = document.getElementById('orderOverlay');
const orderForm = document.getElementById('orderForm');
const toastEl = document.getElementById('toast');

const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

const ageModal = document.getElementById('ageModal');
const ageConfirmBtn = document.getElementById('ageConfirmBtn');

const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`;

// ==========================================================================
// 18+ Верификация возраста
// ==========================================================================
function checkAgeVerification() {
  if (localStorage.getItem(AGE_STORAGE_KEY) === 'true') {
    ageModal.classList.add('is-hidden');
  }
}

ageConfirmBtn.addEventListener('click', () => {
  localStorage.setItem(AGE_STORAGE_KEY, 'true');
  ageModal.classList.add('is-hidden');
});

// ==========================================================================
// LocalStorage Корзины
// ==========================================================================
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Ошибка сохранения:', e);
  }
}

// ==========================================================================
// Отрисовка товаров (с учетом фильтра и поиска)
// ==========================================================================
function renderProducts() {
  const filtered = PRODUCTS.filter((item) => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = '';
    noProducts.style.display = 'block';
    return;
  }

  noProducts.style.display = 'none';
  productsGrid.innerHTML = filtered.map((item) => `
    <article class="product-card">
      <div class="product-card__image-wrap">
        <img class="product-card__img" src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="product-card__badges">
          <span class="badge">${item.category.toUpperCase()}</span>
        </div>
      </div>
      <div class="product-card__body">
        <h2 class="product-card__title">${item.title}</h2>
        <div class="product-card__meta">${item.meta}</div>
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
// Логика корзины (Добавление, изменение, удаление, очистка)
// ==========================================================================
window.addToCart = function(productId) {
  const existing = cart.find((i) => i.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (!prod) return;
    cart.push({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      image: prod.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast('Бутылка добавлена в корзину');
};

window.changeQuantity = function(productId, delta) {
  const item = cart.find((i) => i.id === productId);
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
  cart = cart.filter((i) => i.id !== productId);
  saveCart();
  updateCartUI();
};

// Новая функция: полная очистка корзины
clearCartBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  updateCartUI();
  showToast('Корзина полностью очищена');
});

function updateCartUI() {
  const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  cartBadge.textContent = totalCount;

  const totalSum = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  cartTotalPrice.textContent = formatPrice(totalSum);

  checkoutBtn.disabled = cart.length === 0;
  clearCartBtn.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartList.innerHTML = '';
    cartEmptyMsg.style.display = 'block';
  } else {
    cartEmptyMsg.style.display = 'none';
    cartList.innerHTML = cart.map((i) => `
      <li class="cart-item">
        <img class="cart-item__img" src="${i.image}" alt="${i.title}">
        <div class="cart-item__info">
          <div class="cart-item__title">${i.title}</div>
          <div class="cart-item__price">${formatPrice(i.price)}</div>
        </div>
        <div class="cart-item__controls">
          <button class="quantity-btn" onclick="changeQuantity(${i.id}, -1)">-</button>
          <span class="quantity-value">${i.quantity}</span>
          <button class="quantity-btn" onclick="changeQuantity(${i.id}, 1)">+</button>
        </div>
        <button class="cart-item__remove" onclick="removeFromCart(${i.id})" title="Удалить">&times;</button>
      </li>
    `).join('');
  }
}

// ==========================================================================
// Модальные окна
// ==========================================================================
function openModal(modal) {
  modal.classList.add('is-active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('is-active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

openCartBtn.addEventListener('click', () => openModal(cartModal));
closeCartBtn.addEventListener('click', () => closeModal(cartModal));
cartOverlay.addEventListener('click', () => closeModal(cartModal));

checkoutBtn.addEventListener('click', () => {
  closeModal(cartModal);
  openModal(orderModal);
});

closeOrderBtn.addEventListener('click', () => closeModal(orderModal));
orderOverlay.addEventListener('click', () => closeModal(orderModal));

// ==========================================================================
// Оформление заказа (строго по ТЗ)
// ==========================================================================
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = orderForm.querySelectorAll('.form-input');
  let valid = true;

  inputs.forEach((input) => {
    const parent = input.closest('.form-group');
    if (!input.checkValidity()) {
      parent.classList.add('has-error');
      valid = false;
    } else {
      parent.classList.remove('has-error');
    }
  });

  if (!valid) return;

  closeModal(orderModal);
  orderForm.reset();

  cart = [];
  saveCart();
  updateCartUI();

  alert('Заказ создан!');
  showToast('Заказ создан! Менеджер свяжется с вами для подтверждения 18+.');
});

orderForm.querySelectorAll('.form-input').forEach((input) => {
  input.addEventListener('input', () => {
    input.closest('.form-group').classList.remove('has-error');
  });
});

// ==========================================================================
// Фильтры и Поиск
// ==========================================================================
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderProducts();
});

// Toast
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('is-show');
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('is-show');
  }, 2500);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  checkAgeVerification();
  renderProducts();
  updateCartUI();
});
