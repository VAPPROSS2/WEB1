'use strict';

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
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80'
  },
  {
    id: 2,
    title: 'Chablis Premier Cru Domaine',
    category: 'wine',
    meta: 'Франция, Бургундия • 12.5% об. • 0.75 л',
    price: 8900,
    description: 'Элегантное белое сухое вино из винограда Шардоне с кристальной минеральностью, тонами цитрусов и белых цветов.',
    image: 'https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=600&q=80'
  },
  {
    id: 3,
    title: 'Tignanello Toscana Antinori',
    category: 'wine',
    meta: 'Италия, Тоскана • 14.0% об. • 0.75 л',
    price: 21900,
    description: 'Культовое супертосканское вино на основе Санджовезе и Каберне Совиньон. Ноты спелой вишни, табака и темного шоколада.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80'
  },

  // ================= ВИСКИ =================
  {
    id: 4,
    title: 'The Macallan 12 Years Double Cask',
    category: 'whiskey',
    meta: 'Шотландия, Спейсайд • 40.0% об. • 0.7 л',
    price: 11500,
    description: 'Сингл молт, выдержанный в бочках из американского и европейского дуба из-под хереса Oloroso. Ноты ириса и цукатов.',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&q=80'
  },
  {
    id: 5,
    title: 'Lagavulin 16 Years Old Single Malt',
    category: 'whiskey',
    meta: 'Шотландия, Айла • 43.0% об. • 0.7 л',
    price: 14800,
    description: 'Один из самых знаменитых торфяных виски мира. Глубокий аромат кострового дыма, морских водорослей и сухофруктов.',
    image: 'https://images.unsplash.com/photo-1582819509241-913417cba4b4?w=600&q=80'
  },
  {
    id: 6,
    title: 'Jameson Black Barrel Triple Distilled',
    category: 'whiskey',
    meta: 'Ирландия, Корк • 40.0% об. • 0.7 л',
    price: 4990,
    description: 'Ирландский бленд тройной дистилляции, дозревающий в дважды обожженных бочках из-под бурбона. Бархатистый ванильный вкус.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&q=80'
  },

  // ================= ШАМПАНСКОЕ =================
  {
    id: 7,
    title: 'Dom Pérignon Vintage Brut',
    category: 'champagne',
    meta: 'Франция, Шампань • 12.5% об. • 0.75 л',
    price: 34900,
    description: 'Винтажное премиальное шампанское. Тонкий перляж, оттенки бриоши, поджаренного миндаля и свежих белых персиков.',
    image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=600&q=80'
  },
  {
    id: 8,
    title: 'Moët & Chandon Impérial Brut',
    category: 'champagne',
    meta: 'Франция, Эперне • 12.0% об. • 0.75 л',
    price: 8900,
    description: 'Эталон классического французского шампанского. Яркий свежий фруктовый букет с тонами зеленых яблок и цитрусовых.',
    image: 'https://images.unsplash.com/photo-1580657274234-7339717f4541?w=600&q=80'
  },
  {
    id: 9,
    title: 'Veuve Clicquot Yellow Label Brut',
    category: 'champagne',
    meta: 'Франция, Реймс • 12.0% об. • 0.75 л',
    price: 9400,
    description: 'Знаменитое шампанское «Вдова Клико». Доминирующий сорт Пино Нуар придает напитку выразительную структуру и мощь.',
    image: 'https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=600&q=80'
  },

  // ================= КОНЬЯК =================
  {
    id: 10,
    title: 'Hennessy X.O Extra Old',
    category: 'cognac',
    meta: 'Франция, Коньяк • 40.0% об. • 0.7 л',
    price: 27900,
    description: 'Оригинальный коньяк класса XO. Ассамбляж сотни зрелых спиртов с нотами засахаренных фруктов, кожи и специй.',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&q=80'
  },
  {
    id: 11,
    title: 'Rémy Martin V.S.O.P Fine Champagne',
    category: 'cognac',
    meta: 'Франция, Коньяк • 40.0% об. • 0.7 л',
    price: 7600,
    description: 'Создан исключительно из винограда Гранд и Пти Шампань. Округлый вкус с оттенками спелых абрикосов, ванили и лакрицы.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80'
  },
  {
    id: 12,
    title: 'Courvoisier X.O Imperial',
    category: 'cognac',
    meta: 'Франция, Жарнак • 40.0% об. • 0.7 л',
    price: 24500,
    description: 'Императорский коньяк с бархатным насыщенным вкусом, нюансами крем-брюле, апельсинового джема и благородного ириса.',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=600&q=80'
  }
];

// Ключи LocalStorage
const STORAGE_KEY = 'spirits_store_cart_v1';
const AGE_STORAGE_KEY = 'spirits_age_confirmed_v1';

// Безопасная загрузка корзины
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

// Глобальное состояние
let cart = loadCart();
let currentCategory = 'all';
let searchQuery = '';

// Вспомогательная функция форматирования цены
const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`;

// ==========================================================================
// 18+ Верификация возраста
// ==========================================================================
window.confirmAge = function() {
  const modal = document.getElementById('ageModal');
  if (modal) modal.classList.add('is-hidden');
  localStorage.setItem(AGE_STORAGE_KEY, 'true');
};

function checkAge() {
  if (localStorage.getItem(AGE_STORAGE_KEY) === 'true') {
    const modal = document.getElementById('ageModal');
    if (modal) modal.classList.add('is-hidden');
  }
}

// ==========================================================================
// Отрисовка товаров каталога
// ==========================================================================
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noProducts = document.getElementById('noProducts');
  if (!grid) return;

  const filtered = PRODUCTS.filter((item) => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noProducts) noProducts.style.display = 'block';
    return;
  }

  if (noProducts) noProducts.style.display = 'none';

  grid.innerHTML = filtered.map((item) => `
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
          <button type="button" class="btn btn--primary" onclick="addToCart(${item.id})">
            В корзину
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// ==========================================================================
// Логика корзины (Добавление, пересчет, удаление, очистка)
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
    window.removeFromCart(productId);
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

window.clearCart = function() {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  updateCartUI();
  showToast('Корзина полностью очищена');
};

function updateCartUI() {
  const cartBadge = document.getElementById('cartBadge');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const cartList = document.getElementById('cartList');
  const cartEmptyMsg = document.getElementById('cartEmptyMsg');

  if (cartBadge) {
    const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);
    cartBadge.textContent = totalCount;
  }

  if (cartTotalPrice) {
    const totalSum = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
    cartTotalPrice.textContent = formatPrice(totalSum);
  }

  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
  if (clearCartBtn) clearCartBtn.disabled = cart.length === 0;

  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = '';
    if (cartEmptyMsg) cartEmptyMsg.style.display = 'block';
  } else {
    if (cartEmptyMsg) cartEmptyMsg.style.display = 'none';
    cartList.innerHTML = cart.map((i) => `
      <li class="cart-item">
        <img class="cart-item__img" src="${i.image}" alt="${i.title}">
        <div class="cart-item__info">
          <div class="cart-item__title">${i.title}</div>
          <div class="cart-item__price">${formatPrice(i.price)}</div>
        </div>
        <div class="cart-item__controls">
          <button type="button" class="quantity-btn" onclick="changeQuantity(${i.id}, -1)">-</button>
          <span class="quantity-value">${i.quantity}</span>
          <button type="button" class="quantity-btn" onclick="changeQuantity(${i.id}, 1)">+</button>
        </div>
        <button type="button" class="cart-item__remove" onclick="removeFromCart(${i.id})" title="Удалить">&times;</button>
      </li>
    `).join('');
  }
}

// ==========================================================================
// Управление модальными окнами
// ==========================================================================
window.openCartModal = function() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCartModal = function() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
};

window.goToCheckout = function() {
  window.closeCartModal();
  const orderModal = document.getElementById('orderModal');
  if (orderModal) {
    orderModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeOrderModal = function() {
  const orderModal = document.getElementById('orderModal');
  if (orderModal) {
    orderModal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
};

// ==========================================================================
// Оформление заказа (валидация + alert по ТЗ)
// ==========================================================================
document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'orderForm') {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('.form-input');
    let valid = true;

    inputs.forEach((input) => {
      const parent = input.closest('.form-group');
      if (!input.checkValidity()) {
        if (parent) parent.classList.add('has-error');
        valid = false;
      } else {
        if (parent) parent.classList.remove('has-error');
      }
    });

    if (!valid) return;

    window.closeOrderModal();
    form.reset();

    cart = [];
    saveCart();
    updateCartUI();

    alert('Заказ создан!');
    showToast('Заказ создан! Менеджер свяжется с вами.');
  }
});

document.addEventListener('input', (e) => {
  if (e.target && e.target.classList.contains('form-input')) {
    const parent = e.target.closest('.form-group');
    if (parent) parent.classList.remove('has-error');
  }

  if (e.target && e.target.id === 'searchInput') {
    searchQuery = e.target.value;
    renderProducts();
  }
});

// Клик по фильтрам категорий
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('filter-btn')) {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.dataset.category;
    renderProducts();
  }
});

// Toast
let toastTimer;
function showToast(msg) {
  const toastEl = document.getElementById('toast');
  if (!toastEl) return;
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('is-show');
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('is-show');
  }, 2500);
}

// ==========================================================================
// Инициализация
// ==========================================================================
function start() {
  checkAge();
  renderProducts();
  updateCartUI();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
