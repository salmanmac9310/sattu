/* =========================
   Royal Sattu – app.js (fixed to match index.html)
   ========================= */

// ---------- Loader Animation ----------
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.style.opacity = 0;
    setTimeout(() => (loader.style.display = 'none'), 700);
  }, 1200);
});

// ---------- Navbar Toggle (Mobile) ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// ---------- Smooth Scroll Navigation ----------
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// ---------- GSAP Animations ----------
window.addEventListener('load', () => {
  // Register ScrollTrigger if available
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Entrance animations
  gsap.from('.navbar', { y: -60, opacity: 0, duration: 1, ease: 'power2.out' });
  gsap.from('.hero-title', { x: -80, opacity: 0, duration: 1, delay: 0.3, ease: 'power2.out' });
  gsap.from('.hero-desc', { x: -60, opacity: 0, duration: 1, delay: 0.5, ease: 'power2.out' });
  gsap.from('.hero-buy-btn', { scale: 0.7, opacity: 0, duration: 0.7, delay: 0.8, ease: 'back.out(1.7)' });
  gsap.from('.drink-img', { scale: 0.7, opacity: 0, duration: 1.2, delay: 0.6, ease: 'power2.out' });

  // Products
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: { trigger: card, start: 'top 80%' },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // Features
  gsap.utils.toArray('.feature').forEach((feature, i) => {
    gsap.to(feature, {
      scrollTrigger: { trigger: feature, start: 'top 85%' },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // Testimonials
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: { trigger: card, start: 'top 90%' },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // Infinite Brand Logos
  gsap.to('.logos-track', {
    xPercent: -50,
    repeat: -1,
    duration: 18,
    ease: 'linear'
  });

  // Drag-to-scroll Testimonials Carousel
  const carousel = document.querySelector('.testimonials-carousel');
  let isDown = false,
    startX,
    scrollLeft;
  if (carousel) {
    carousel.addEventListener('mousedown', e => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    ['mouseleave', 'mouseup'].forEach(evt =>
      carousel.addEventListener(evt, () => {
        isDown = false;
        carousel.classList.remove('active');
      })
    );
    carousel.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }
});

// ---------- Hover Animations ----------
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.12, boxShadow: '0 4px 32px #ffd700', duration: 0.25, ease: 'back.out(2)' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, boxShadow: '0 2px 18px #ffd700', duration: 0.25, ease: 'power2.out' });
  });
});
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { scale: 1.04, boxShadow: '0 8px 40px #ffd70080', duration: 0.25 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { scale: 1, boxShadow: '0 8px 32px 0 rgba(24,24,24,0.18)', duration: 0.25 });
  });
});

// ---------- Demo Checkout Modal (kept, but not triggered by product buttons) ----------
const modal = document.getElementById('modal');
document.querySelectorAll('.nav-buy-btn, .hero-buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!modal) return;
    modal.style.display = 'flex';
    gsap.from('.modal-content', { scale: 0.7, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });
  });
});
document.querySelectorAll('.close-modal, .close-modal-btn').forEach(el => {
  el.addEventListener('click', () => {
    if (modal) modal.style.display = 'none';
  });
});
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// ---------- Animated Background Gradient ----------
let gradStep = 0;
function animateGradient() {
  gradStep += 0.002;
  const angle = 135 + Math.sin(gradStep) * 30;
  document.body.style.background = `linear-gradient(${angle}deg, #181818 0%, #920025ff 100%)`;
  requestAnimationFrame(animateGradient);
}
animateGradient();

// ---------- Particle Animation ----------
const canvas = document.getElementById('particles');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  if (!canvas) return;
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 1,
      d: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.3
    });
  }
}

function drawParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255,215,0,${p.alpha})`;
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 12;
    ctx.fill();
    p.y += p.d;
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});
resizeCanvas();
createParticles();
drawParticles();

// ---------- Interactive Cursor Glow Trail ----------
const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', e => {
  if (!cursor) return;
  gsap.to(cursor, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.15, ease: 'power2.out' });
});
document.querySelectorAll('button, a, .product-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor && (cursor.style.opacity = 1));
  el.addEventListener('mouseleave', () => cursor && (cursor.style.opacity = 0.7));
});

// ========== CART FUNCTIONALITY (aligned with HTML) ==========

// Products exactly as shown in the Products section
const products = [
  { id: 'classic', name: 'Classic Sattu Masala', price: 59, img: './images/drink3.jpeg' },
  { id: 'onion',   name: 'Onion Sattu',          price: 69, img: './images/drink4.jpeg' },
  { id: 'mint',    name: 'Mint Sattu',           price: 59, img: './images/drink2.jpeg' }
];

let cart = [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = count;
}

function addToCart(product) {
  const found = cart.find(i => i.id === product.id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  updateCartCount();
  updateCartUI();
}

function formatINR(n) {
  return new Intl.NumberFormat('en-IN').format(n);
}

function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const totalItemsEl = document.getElementById('cartTotalItems');
  const totalPriceEl = document.getElementById('cartTotalPrice');
  if (!cartItems || !totalItemsEl || !totalPriceEl) return;

  cartItems.innerHTML = '';
  let totalItems = 0,
    totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.qty;
    totalPrice += item.qty * item.price;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div>₹${formatINR(item.price)}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-minus" aria-label="Decrease quantity">-</button>
        <span>${item.qty}</span>
        <button class="qty-plus" aria-label="Increase quantity">+</button>
      </div>
      <button class="cart-item-remove" title="Remove" aria-label="Remove item">&times;</button>
    `;

    div.querySelector('.qty-minus').onclick = () => changeQty(item.id, -1);
    div.querySelector('.qty-plus').onclick = () => changeQty(item.id, 1);
    div.querySelector('.cart-item-remove').onclick = () => removeFromCart(item.id);

    cartItems.appendChild(div);
  });

  totalItemsEl.textContent = totalItems;
  totalPriceEl.textContent = formatINR(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = '<div style="color:#fff;text-align:center;">Your cart is empty.</div>';
    totalItemsEl.textContent = 0;
    totalPriceEl.textContent = 0;
  }
}

// Cart Modal Open/Close
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');

if (cartBtn && cartModal) {
  cartBtn.addEventListener('click', () => {
    updateCartUI();
    cartModal.style.display = 'flex';
  });
}
if (closeCart && cartModal) {
  closeCart.addEventListener('click', () => (cartModal.style.display = 'none'));
}
window.addEventListener('click', e => {
  if (e.target === cartModal) cartModal.style.display = 'none';
});

// Map product cards' "Buy Now" buttons to products (in order)
const productBuyButtons = document.querySelectorAll('.products-grid .buy-btn');
productBuyButtons.forEach((btn, idx) => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    addToCart(products[idx]);
    // Open cart right away for feedback
    if (cartModal) {
      updateCartUI();
      cartModal.style.display = 'flex';
    }
  });
});

// Add to Cart from Hero / CTA
// NOTE: CTA is inside an <a>; preventDefault keeps user on-site. Remove preventDefault() if you prefer to navigate.
document.querySelectorAll('.hero-buy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    addToCart(products[0]);
    if (cartModal) {
      updateCartUI();
      cartModal.style.display = 'flex';
    }
  });
});
document.querySelectorAll('.cta-buy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault(); // comment this line out if you want to open the WhatsApp link instead
    addToCart(products[0]);
    if (cartModal) {
      updateCartUI();
      cartModal.style.display = 'flex';
    }
  });
});

// Checkout Button
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
  checkoutBtn.onclick = function () {
    if (cart.length === 0) return;
    alert('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    updateCartUI();
    if (cartModal) cartModal.style.display = 'none';
  };
}

// Initialize cart count on page load
updateCartCount();


// ========== FEEDBACK FORM (EmailJS) ==========
// IMPORTANT: You already load EmailJS CDN and init in <head>.
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userEmail = document.getElementById('feedbackEmail').value.trim();
    const msg = document.getElementById('feedbackMsg').value.trim();
    const status = document.getElementById('feedbackStatus');

    if (!userEmail || !msg) {
      status.textContent = 'Please fill in all fields.';
      return;
    }

    status.textContent = 'Sending...';

    // Use your service/template/public keys (already in your HTML init)
    emailjs
      .send(
        'service_1wtf0aw',
        'template_0bgyky7',
        { from_email: userEmail, message: msg },
        'IiUTl4ywJDLZ_Yqsq'
      )
      .then(function (response) {
        console.log('Feedback sent successfully', response);
        status.textContent = 'Thank you for your feedback!';
        feedbackForm.reset();
      })
      .catch(function (error) {
        console.error('Error sending feedback', error);
        status.textContent = 'An error occurred. Please try again.';
      });
  });
}

// ========== Google Docs Embed Controls ==========
function reloadDoc() {
  const iframe = document.getElementById('googleDocFrame');
  if (iframe) iframe.src = iframe.src;
}
function toggleDoc() {
  const container = document.getElementById('docContainer');
  const btn = document.getElementById('toggleBtn');
  if (!container || !btn) return;
  if (container.style.display === 'none') {
    container.style.display = '';
    btn.textContent = 'Hide';
  } else {
    container.style.display = 'none';
    btn.textContent = 'Show';
  }
}
function openDoc() {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSfkx1oVbi6xNhzJbpedf3AJqial1TEeHxukOJmlvElSkn3eqA/viewform?usp=header');
}
// expose for inline onclick handlers
window.reloadDoc = reloadDoc;
window.toggleDoc = toggleDoc;
window.openDoc = openDoc;
