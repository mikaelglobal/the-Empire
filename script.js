    // ── NAV SCROLL ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── INTERSECTION OBSERVER ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.service-card, .project-item, .stat-item, .reveal').forEach(el => {
      observer.observe(el);
    });

    // ── COUNT-UP ANIMATION ──
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nums = entry.target.querySelectorAll('[data-target]');
          nums.forEach(num => {
            const target = +num.dataset.target;
            const suffix = target === 100 ? '%' : '+';
            let current = 0;
            const step = Math.ceil(target / 40);
            const interval = setInterval(() => {
              current = Math.min(current + step, target);
              num.textContent = current + (current === target ? suffix : '');
              if (current >= target) clearInterval(interval);
            }, 40);
          });
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-bar').forEach(el => countObserver.observe(el));

    // ── HERO GLOBE TILT ──
    const globeWrap = document.querySelector('.hero-globe-wrap');
    const globeEl = document.querySelector('.hero-globe');
    if (globeWrap && globeEl) {
      globeWrap.addEventListener('mousemove', (e) => {
        const rect = globeWrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        globeEl.style.transform = `rotateX(${y * -22}deg) rotateY(${x * 22}deg)`;
      });
      globeWrap.addEventListener('mouseleave', () => {
        globeEl.style.transform = '';
      });
    }

    // ── SMOOTH ACTIVE NAV ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
      });
    });

