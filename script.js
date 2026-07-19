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

    document.querySelectorAll('.service-card, .project-item, .stat-item, .skill-group, .blog-item, .reveal').forEach(el => {
      observer.observe(el);
    });

    // ── PROJECT CATEGORY FILTER ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        projectItems.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('filtered-out', !show);
        });
      });
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

    // ── HERO GLOBE: build 3D wireframe sphere (meridians + latitude rings + MK face) ──
    function buildHeroGlobe() {
      const wrap = document.querySelector('.hero-globe-wrap');
      const spin = document.querySelector('.globe-spin');
      if (!wrap || !spin) return;

      const size = wrap.clientWidth;
      const R = size / 2;
      spin.innerHTML = '';

      // solid core (suggests volume behind the wireframe)
      const core = document.createElement('div');
      core.className = 'globe-core';
      spin.appendChild(core);

      // meridians (longitude lines) — flat circles rotated around Y axis
      [0, 30, 60, 90, 120, 150].forEach(angle => {
        const m = document.createElement('div');
        m.className = 'meridian';
        m.style.transform = `rotateY(${angle}deg)`;
        spin.appendChild(m);
      });

      // latitude rings — flat circles rotated to horizontal, sized/offset by latitude
      [-60, -30, 0, 30, 60].forEach(lat => {
        const rad = (lat * Math.PI) / 180;
        const w = size * Math.cos(rad);
        const yOff = -R * Math.sin(rad);
        const l = document.createElement('div');
        l.className = 'latitude' + (lat === 0 ? ' equator' : '');
        l.style.width = `${w}px`;
        l.style.height = `${w}px`;
        l.style.marginLeft = `-${w / 2}px`;
        l.style.marginTop = `-${w / 2}px`;
        l.style.transform = `translateY(${yOff}px) rotateX(90deg)`;
        spin.appendChild(l);
      });

      // MK embossed on the sphere's front face
      const label = document.createElement('div');
      label.className = 'globe-label';
      label.style.transform = `translateZ(${R}px)`;
      label.style.fontSize = `${size * 0.22}px`;
      label.textContent = 'MK';
      spin.appendChild(label);
    }

    buildHeroGlobe();
    let globeResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(globeResizeTimer);
      globeResizeTimer = setTimeout(buildHeroGlobe, 150);
    });

    // ── HERO GLOBE TILT (mouse-driven, independent of the auto-spin layer) ──
    const globeWrap = document.querySelector('.hero-globe-wrap');
    const globeTilt = document.querySelector('.globe-tilt');
    if (globeWrap && globeTilt) {
      globeWrap.addEventListener('mousemove', (e) => {
        const rect = globeWrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        globeTilt.style.transform = `rotateX(${y * -25}deg) rotateY(${x * 25}deg)`;
      });
      globeWrap.addEventListener('mouseleave', () => {
        globeTilt.style.transform = '';
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