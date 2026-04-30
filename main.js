// =========================================
// GLOKOM BİLGİ SİTESİ — Ana JavaScript
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar Scroll Effect ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ── Active Nav Link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Hamburger Menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Scroll Fade-Up Animation ──
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

  // ── Counter Animation (for stats) ──
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString('tr-TR');
    }, 16);
  }

  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  // ── Tab System (publications) ──
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(target)?.classList.add('active');
      });
    });
  }

  // ── Doctor City Filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const doctorCards = document.querySelectorAll('.doctor-card');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const city = btn.dataset.city;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        doctorCards.forEach(card => {
          if (city === 'all' || card.dataset.city === city) {
            card.style.display = '';
            card.classList.add('fade-up', 'visible');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Accordion (FAQ) ──
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        accordionItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ── Contact Form ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = '✓ Mesajınız alındı!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btn.disabled = true;
      setTimeout(() => {
        contactForm.reset();
        btn.textContent = 'Gönder';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  }

});
