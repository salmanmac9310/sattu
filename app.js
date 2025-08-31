// Loader Animation
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = 0;
    setTimeout(() => document.getElementById('loader').style.display = 'none', 700);
  }, 1200);
});

// Navbar Toggle (Mobile)
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Smooth Scroll Navigation
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// GSAP Animations
window.addEventListener('load', () => {
  gsap.from('.navbar', { y: -60, opacity: 0, duration: 1, ease: "power2.out" });
  gsap.from('.hero-title', { x: -80, opacity: 0, duration: 1, delay: 0.3, ease: "power2.out" });
  gsap.from('.hero-desc', { x: -60, opacity: 0, duration: 1, delay: 0.5, ease: "power2.out" });
  gsap.from('.hero-buy-btn', { scale: 0.7, opacity: 0, duration: 0.7, delay: 0.8, ease: "back.out(1.7)" });
  gsap.from('.drink-img', { scale: 0.7, opacity: 0, duration: 1.2, delay: 0.6, ease: "power2.out" });

  // Products
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: { trigger: card, start: "top 80%" },
      opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power2.out"
    });
  });

  // Features
  gsap.utils.toArray('.feature').forEach((feature, i) => {
    gsap.to(feature, {
      scrollTrigger: { trigger: feature, start: "top 85%" },
      opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power2.out"
    });
  });

  // Testimonials
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: { trigger: card, start: "top 90%" },
      opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power2.out"
    });
  });

  // GSAP Infinite Brand Logos
  gsap.to('.logos-track', {
    xPercent: -50,
    repeat: -1,
    duration: 18,
    ease: "linear"
  });

  // GSAP Carousel for Testimonials
  let carousel = document.querySelector('.testimonials-carousel');
  let isDown = false, startX, scrollLeft;
  if (carousel) {
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('mouseleave', () => { isDown = false; carousel.classList.remove('active'); });
    carousel.addEventListener('mouseup', () => { isDown = false; carousel.classList.remove('active'); });
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }
});

// GSAP Hover Animations
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.12, boxShadow: "0 4px 32px #ffd700", duration: 0.25, ease: "back.out(2)" });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, boxShadow: "0 2px 18px #ffd700", duration: 0.25, ease: "power2.out" });
  });
});
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { scale: 1.04, boxShadow: "0 8px 40px #ffd70080", duration: 0.25 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { scale: 1, boxShadow: "0 8px 32px 0 rgba(24,24,24,0.18)", duration: 0.25 });
  });
});

// Modal for Buy Now
const modal = document.getElementById('modal');
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (!btn.classList.contains('subscribe-btn') && !btn.closest('.contact-form')) {
      modal.style.display = 'flex';
      gsap.from('.modal-content', { scale: 0.7, opacity: 0, duration: 0.5, ease: "back.out(1.7)" });
    }
  });
});
document.querySelectorAll('.close-modal, .close-modal-btn').forEach(el => {
  el.addEventListener('click', () => { modal.style.display = 'none'; });
});
window.onclick = function(event) {
  if (event.target == modal) modal.style.display = "none";
};

// Newsletter Subscribe Animation
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.subscribe-btn');
  gsap.to(btn, { scale: 1.15, background: "linear-gradient(135deg, #ffd700 0%, #b8002f 100%)", color: "#181818", duration: 0.3, yoyo: true, repeat: 1 });
  setTimeout(() => this.reset(), 800);
});

// Contact Form Animation
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  gsap.to(this, { scale: 1.04, background: "#ffd70020", duration: 0.3, yoyo: true, repeat: 1 });
  setTimeout(() => this.reset(), 800);
});

// Animated Background Gradient
let gradStep = 0;
function animateGradient() {
  gradStep += 0.002;
  const angle = 135 + Math.sin(gradStep) * 30;
  document.body.style.background = `linear-gradient(${angle}deg, #b8002f 0%, #ffd700 100%)`;
  requestAnimationFrame(animateGradient);
}
animateGradient();

// Particle Animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function createParticles() {
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255,215,0,${p.alpha})`;
    ctx.shadowColor = "#ffd700";
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
createParticles();
drawParticles();
window.addEventListener('resize', createParticles);

// Interactive Cursor Glow Trail
const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', e => {
  gsap.to(cursor, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.15, ease: "power2.out" });
});
document.querySelectorAll('button, a, .product-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.opacity = 1);
  el.addEventListener('mouseleave', () => cursor.style.opacity = 0.7);
});

// --- Cart Functionality ---

// Example product data (update as per your actual products)
const products = [
  { id: 'pouch', name: 'Pouch Pack', price: 120, img: './images/pouch.png' },
  { id: 'bottle', name: 'Energy Bottle', price: 60, img: './images/bottle.png' },
  { id: 'jar', name: 'Family Jar', price: 220, img: './images/jar.png' }
];

// Cart state
let cart = [];

// Add to Cart
function addToCart(product) {
  const found = cart.find(item => item.id === product.id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
  updateCartUI();
}

// Remove from Cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  updateCartUI();
}

// Change Quantity
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  updateCartCount();
  updateCartUI();
}

// Update Cart Count in Navbar
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartCount').textContent = count;
}

// Update Cart Modal UI
function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let totalItems = 0, totalPrice = 0;
  cart.forEach(item => {
    totalItems += item.qty;
    totalPrice += item.qty * item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div>₹${item.price}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-minus">-</button>
        <span>${item.qty}</span>
        <button class="qty-plus">+</button>
      </div>
      <button class="cart-item-remove" title="Remove">&times;</button>
    `;
    // Quantity handlers
    div.querySelector('.qty-minus').onclick = () => changeQty(item.id, -1);
    div.querySelector('.qty-plus').onclick = () => changeQty(item.id, 1);
    div.querySelector('.cart-item-remove').onclick = () => removeFromCart(item.id);
    cartItems.appendChild(div);
  });
  document.getElementById('cartTotalItems').textContent = totalItems;
  document.getElementById('cartTotalPrice').textContent = totalPrice;
  if (cart.length === 0) {
    cartItems.innerHTML = '<div style="color:#fff;text-align:center;">Your cart is empty.</div>';
    document.getElementById('cartTotalItems').textContent = 0;
    document.getElementById('cartTotalPrice').textContent = 0;
  }
}

// Cart Modal Open/Close
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
cartBtn.addEventListener('click', () => {
  updateCartUI();
  cartModal.style.display = 'flex';
});
closeCart.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === cartModal) cartModal.style.display = 'none';
});

// Add to Cart on Buy Now (Products)
document.querySelectorAll('.cart-btn .cart-icon').forEach((btn, idx) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(products[idx]);
  });
});

// Add to Cart on Hero/CTA Buy Now (default: pouch)
document.querySelectorAll('.hero-buy-btn, .cta-buy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(products[0]);
  });
});

// Checkout Button
document.getElementById('checkoutBtn').onclick = function() {
  if (cart.length === 0) return;
  alert('Thank you for your purchase!');
  cart = [];
  updateCartCount();
  updateCartUI();
  cartModal.style.display = 'none';
};

// Initialize cart count on page load
updateCartCount();

// Add to app.js for feedback form functionality
// filepath: c:\Users\user\Desktop\VS CODE\self practice\royal-sattu\app.js

// Feedback Form Submission (using EmailJS for sending to Gmail)
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const emailjs = document.getElementById('feedbackEmail').value.trim();
  const msg = document.getElementById('feedbackMsg').value.trim();
  const status = document.getElementById('feedbackStatus');
  if (!email || !msg) {
    status.textContent = "Please fill in all fields.";
    return;
  }
  status.textContent = "Sending...";
  // EmailJS integration (you must replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID)
  emailjs.send("service_1wtf0aw", "template_0bgyky7", {
    from_email:emailjs,
    message: msg
  }, "IiUTl4ywJDLZ_Yqsq")
  .then(function() {
    status.textContent = "Thank you for your feedback!";
    document.getElementById('feedbackForm').reset();
  }, function() {
    status.textContent = "Failed to send. Please try again.";
  });
});

// Google Docs Embed Controls
function reloadDoc() {
  const iframe = document.getElementById('googleDocFrame');
  iframe.src = iframe.src;
}
function toggleDoc() {
  const container = document.getElementById('docContainer');
  const btn = document.getElementById('toggleBtn');
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

