/* ====================================================================
   不懂统计的坏咸鱼 - Personal Academic Website
   JavaScript: Theme, Menu, Particles, Notebook Toggle, Sidebar
   ==================================================================== */

(function() {
  'use strict';

  // ==================== 1. Theme Toggle ====================
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('phd-site-theme');
  if (storedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  if (themeToggle) {
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
  }

  // ==================== 2. Mobile Hamburger Menu ====================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
  }

  // ==================== 3. Navbar Shadow on Scroll ====================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 50
        ? '0 2px 20px rgba(0,0,0,0.08)'
        : 'none';
    }
  });

  // ==================== 4. Hero Particles ====================
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    particlesContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;
    let w, h;
    function resize() { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);
    class Particle {
      constructor() { this.reset(); }
      reset() { this.x = Math.random() * w; this.y = Math.random() * h; this.size = Math.random() * 3 + 1; this.speedX = (Math.random() - 0.5) * 0.5; this.speedY = (Math.random() - 0.5) * 0.5; this.opacity = Math.random() * 0.5 + 0.1; }
      update() { this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > w) this.speedX *= -1; if (this.y < 0 || this.y > h) this.speedY *= -1; }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(79, 70, 229, ${this.opacity})`; ctx.fill(); }
    }
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    function animateParticles() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
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

  // ==================== 5. Visit Counter ====================
  const countNum = document.getElementById('countNum');
  if (countNum) {
    let count = parseInt(localStorage.getItem('phd-site-visits') || '0');
    count++;
    localStorage.setItem('phd-site-visits', count);
    countNum.textContent = count;
  }

})();


// ==================== GLOBAL: Notebook Toggle Functions ====================

/**
 * Toggle a note card's expand/collapse state.
 * Called from HTML onclick on the card header.
 */
function toggleNote(headerEl) {
  const card = headerEl.closest('.note-card-expandable');
  if (!card) return;

  const body = card.querySelector('.note-card-body');
  const isOpen = body.classList.contains('open');

  body.classList.toggle('open');
  headerEl.classList.toggle('open');

  // Update the sidebar highlight
  const noteId = card.id;
  document.querySelectorAll('.toc-leaf').forEach(el => el.classList.remove('active-leaf'));
  if (!isOpen) {
    const leaf = document.querySelector(`.toc-leaf[data-note="${noteId}"]`);
    if (leaf) leaf.classList.add('active-leaf');
  }
}

/**
 * Toggle a subtopic group's expand/collapse state in the main content area.
 * Called from HTML onclick on the subtopic group header.
 */
function toggleSubtopicSection(headerEl) {
  headerEl.classList.toggle('open');
  const body = headerEl.nextElementSibling;
  if (body && body.classList.contains('subtopic-group-body')) {
    body.classList.toggle('open');
  }
}

/**
 * Open a specific note card from sidebar click.
 */
function openNoteFromSidebar(noteId) {
  const card = document.getElementById(noteId);
  if (!card) return;

  // Expand the note card itself
  const body = card.querySelector('.note-card-body');
  const header = card.querySelector('.note-card-header');
  if (!body.classList.contains('open')) {
    body.classList.add('open');
    header.classList.add('open');
  }

  // Expand parent subtopic group
  const parentGroup = card.closest('.subtopic-group');
  if (parentGroup) {
    const groupHeader = parentGroup.querySelector('.subtopic-group-header');
    const groupBody = parentGroup.querySelector('.subtopic-group-body');
    if (groupHeader && !groupHeader.classList.contains('open')) {
      groupHeader.classList.add('open');
      if (groupBody) groupBody.classList.add('open');
    }
  }

  // Scroll to the card
  const offset = 90;
  const top = card.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ==================== DOCUMENT READY: Notebook Initialization ====================
document.addEventListener('DOMContentLoaded', function() {

  // --- Sidebar toggles: category (level 1) + subtopic (level 2) ---
  document.querySelectorAll('.toc-toggle[data-target], .toc-label[data-target], .toc-subtopic-label[data-target]').forEach(el => {
    el.addEventListener('click', function(e) {
      const targetId = this.dataset.target;
      if (!targetId) return;
      const children = document.getElementById(targetId);
      if (!children) return;

      children.classList.toggle('open');

      // Rotate the toggle icon within the same toc-item
      const item = this.closest('.toc-item');
      const toggleIcon = item?.querySelector(':scope > .toc-toggle');
      if (toggleIcon) toggleIcon.classList.toggle('open');
    });
  });

  // --- Sidebar leaf click -> open note + set active + expand subtopic ---
  document.querySelectorAll('.toc-leaf a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const noteId = href.substring(1);

      // Remove all active-leaf
      document.querySelectorAll('.toc-leaf').forEach(el => el.classList.remove('active-leaf'));
      this.closest('.toc-leaf')?.classList.add('active-leaf');

      openNoteFromSidebar(noteId);
    });
  });

  // --- Auto-open from URL hash on page load ---
  if (window.location.hash) {
    const noteId = window.location.hash.substring(1);
    openNoteFromSidebar(noteId);

    // Also highlight in sidebar
    const leaf = document.querySelector(`.toc-leaf[data-note="${noteId}"]`);
    if (leaf) {
      document.querySelectorAll('.toc-leaf').forEach(el => el.classList.remove('active-leaf'));
      leaf.classList.add('active-leaf');

      // Open all parent levels in sidebar: category + subtopic
      let parent = leaf.closest('.toc-children');
      while (parent) {
        parent.classList.add('open');
        const toggle = parent.closest('.toc-item')?.querySelector(':scope > .toc-toggle');
        if (toggle) toggle.classList.add('open');
        parent = parent.parentElement?.closest('.toc-children');
      }
    }
  }

  // --- Mobile sidebar toggle ---
  const sidebarHeader = document.querySelector('.sidebar-header');
  const sidebarToc = document.getElementById('sidebarToc');
  if (sidebarHeader && sidebarToc && window.innerWidth <= 768) {
    sidebarHeader.addEventListener('click', function() {
      sidebarToc.classList.toggle('open');
      this.classList.toggle('open');
    });
  }

  // --- Reveal animation for note cards ---
  const noteCards = document.querySelectorAll('.note-card-expandable');
  if (noteCards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    noteCards.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
});