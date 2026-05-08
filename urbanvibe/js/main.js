// ===== URBANVIBE - MAIN JS =====

// Cart state
let cart = JSON.parse(localStorage.getItem('uv_cart') || '[]');

// Update cart count in all pages
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

// Add to cart
function addToCart(id, name, price, emoji = '👕') {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, qty: 1, emoji });
  }
  localStorage.setItem('uv_cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${name} added to cart`);
}

// Toast notification
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Hamburger / Mobile menu
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    mobileMenu.classList.contains('open')
      ? (spans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)')
      : (spans[0].style.transform = '',
         spans[1].style.opacity = '',
         spans[2].style.transform = '');
  });

  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

// Scroll reveal
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// Countdown timer
function initCountdown() {
  const el = document.querySelector('.countdown');
  if (!el) return;
  // Set end time 2 days from now
  const end = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  function update() {
    const diff = end - Date.now();
    if (diff <= 0) return;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const d = Math.floor(h / 24);
    el.querySelector('[data-d]').textContent = String(d).padStart(2, '0');
    el.querySelector('[data-h]').textContent = String(h % 24).padStart(2, '0');
    el.querySelector('[data-m]').textContent = String(m).padStart(2, '0');
    el.querySelector('[data-s]').textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// Active nav link
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// Email form
function initEmailForm() {
  const form = document.querySelector('.signup-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('.signup-input');
    if (input.value.includes('@')) {
      showToast('10% OFF code sent! Check your email');
      input.value = '';
    } else {
      showToast('Please enter a valid email');
    }
  });
}

// Init everything on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCountdown();
  setActiveNav();
  initEmailForm();

  // Product add-to-cart buttons
  document.querySelectorAll('.product-add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const id = card.dataset.id || Math.random().toString(36).slice(2);
      const name = card.querySelector('.product-name')?.textContent || 'Item';
      const price = parseFloat(card.dataset.price || '29.99');
      const emoji = card.dataset.emoji || '👕';
      addToCart(id, name, price, emoji);
    });
  });
});
