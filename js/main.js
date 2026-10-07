/* ====================================================================
   Jingliang Huai - Personal Academic Website
   JavaScript: Theme Toggle, Mobile Menu, Particles, Filters, Counter
   ==================================================================== */

(function() {
  'use strict';

  // ==================== 1. Theme Toggle ====================
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('phd-site-theme');

  // Apply stored theme
  if (storedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', function() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
      html.removeAttribute('data-theme');
      localStorage.setItem('phd-site-theme', 'light');
      this.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('phd-site-theme', 'dark');
      this.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });

  // ==================== 2. Mobile Hamburger Menu ====================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // ==================== 3. Navbar Background on Scroll ====================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // ==================== 4. Hero Particles Effect ====================
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    particlesContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const PARTICLE_COUNT = 60;
    let w, h;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > w) this.speedX *= -1;
        if (this.y < 0 || this.y > h) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.08 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ==================== 5. Notes Category Filter ====================
  const catBtns = document.querySelectorAll('.cat-btn');
  const notesList = document.getElementById('notesList');

  if (catBtns.length && notesList) {
    catBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active button
        catBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const cat = this.dataset.cat;
        const entries = notesList.querySelectorAll('.note-entry');

        entries.forEach(entry => {
          if (cat === 'all' || entry.dataset.category === cat) {
            entry.style.display = 'block';
          } else {
            entry.style.display = 'none';
          }
        });
      });
    });
  }

  // ==================== 6. Visit Counter (LocalStorage) ====================
  const countNum = document.getElementById('countNum');
  if (countNum) {
    let count = parseInt(localStorage.getItem('phd-site-visits') || '0');
    count++;
    localStorage.setItem('phd-site-visits', count);
    countNum.textContent = count;
  }

  // ==================== 7. Smooth Reveal Animation on Scroll ====================
  const revealElements = document.querySelectorAll(
    '.research-card, .pub-item, .note-card, .note-entry, .project-card, .news-item'
  );

  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

})();