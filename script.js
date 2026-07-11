    // ── CURSOR ──
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    });

    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.8)';
        ring.style.transform += ' scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {});
    });

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

    // ── PARALLAX ORB ──
    window.addEventListener('mousemove', e => {
      const ox = (e.clientX / window.innerWidth - 0.5) * 30;
      const oy = (e.clientY / window.innerHeight - 0.5) * 30;
      document.querySelector('.hero-orb-1').style.transform = `translate(${ox}px, ${oy}px)`;
      document.querySelector('.hero-orb-2').style.transform = `translate(${-ox * 0.6}px, ${-oy * 0.6}px)`;
    });