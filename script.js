// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PACKAGE FILTER TABS =====
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.package-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== SCROLL DOWN ARROW =====
const scrollDown = document.getElementById('scrollDown');
if (scrollDown) {
  scrollDown.addEventListener('click', () => {
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== NEWSLETTER SUBSCRIPTION =====
document.getElementById('newsletterBtn').addEventListener('click', () => {
  const emailInput = document.getElementById('newsletterEmail');
  const email = emailInput.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  showToast('🙏 Thank you for subscribing! May your journey be blessed.', 'success');
  emailInput.value = '';
});

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 5rem; left: 50%; transform: translateX(-50%);
    background: ${type === 'success' ? 'linear-gradient(135deg,#ff6b00,#f5c518)' : '#b22222'};
    color: #fff; padding: 0.9rem 2rem; border-radius: 50px;
    font-size: 0.9rem; font-weight: 600; z-index: 9999;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    animation: fadeUp 0.3s ease both;
    max-width: 90vw; text-align: center;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== SCROLL ANIMATION (Intersection Observer) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.package-card, .feature-card, .testimonial-card, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== BOOKING BUTTON - confirm before opening form =====
document.querySelectorAll('.btn-book').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const packageName = btn.closest('.package-card').querySelector('.card-title').textContent;
    // Show a quick message (the form will open in new tab)
    showToast(`✈️ Opening booking form for ${packageName}...`, 'success');
  });
});
