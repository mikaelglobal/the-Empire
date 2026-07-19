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

// ── HERO GLOBE: build 3D wireframe sphere ──
function buildHeroGlobe() {
  const wrap = document.querySelector('.hero-globe-wrap');
  const spin = document.querySelector('.globe-spin');
  if (!wrap || !spin) return;

  const size = wrap.clientWidth;
  const R = size / 2;
  spin.innerHTML = '';

  const core = document.createElement('div');
  core.className = 'globe-core';
  spin.appendChild(core);

  [0, 30, 60, 90, 120, 150].forEach(angle => {
    const m = document.createElement('div');
    m.className = 'meridian';
    m.style.transform = `rotateY(${angle}deg)`;
    spin.appendChild(m);
  });

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

// ── HERO GLOBE TILT ──
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

// ── BLOG: Load and render posts from posts.json ──
document.addEventListener('DOMContentLoaded', function() {
  const blogGrid = document.getElementById('blogGrid');
  const postView = document.getElementById('blogPostView');
  const backBtn = document.getElementById('backToFeed');

  if (blogGrid) {
    blogGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 0;color:var(--text);opacity:0.5;">
        Loading posts…
      </div>
    `;
  }

  fetch('posts.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load posts');
      return res.json();
    })
    .then(data => {
      const posts = data.posts || [];
      if (posts.length === 0) {
        blogGrid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:4rem 0;color:var(--text);opacity:0.4;">
            No posts yet. Check back soon.
          </div>
        `;
        return;
      }
      renderPostCards(posts);
    })
    .catch(err => {
      console.error('Blog error:', err);
      blogGrid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:4rem 0;color:var(--text);opacity:0.5;">
          Could not load posts. Please try again later.
        </div>
      `;
    });

  function renderPostCards(posts) {
    const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

    blogGrid.innerHTML = sorted.map(post => `
      <article class="blog-card" data-id="${post.id}" data-tags="${post.tags.join(',')}">
        <div class="blog-card-date">${formatDate(post.date)}</div>
        <h3 class="blog-card-title">${post.title}</h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="blog-card-footer">
          <span class="blog-card-readtime">${post.readTime} min read</span>
          <button class="blog-card-link" data-id="${post.id}">Read →</button>
        </div>
      </article>
    `).join('');

    document.querySelectorAll('.blog-card-link').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const id = parseInt(this.dataset.id);
        const post = posts.find(p => p.id === id);
        if (post) showPost(post);
      });
    });

    document.querySelectorAll('.blog-card').forEach(card => {
      card.addEventListener('click', function() {
        const id = parseInt(this.dataset.id);
        const post = posts.find(p => p.id === id);
        if (post) showPost(post);
      });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.blog-card').forEach(card => {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            const tags = card.dataset.tags.split(',');
            card.style.display = tags.includes(filter) ? '' : 'none';
          }
        });
      });
    });

    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) {
      activeFilter.click();
    }
  }

  function showPost(post) {
    document.getElementById('blog-grid').style.display = 'none';
    postView.style.display = 'block';

    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postDate').textContent = formatDate(post.date);
    document.getElementById('postReadTime').textContent = `${post.readTime} min read`;
    document.getElementById('postContent').innerHTML = post.content;

    const tagsContainer = document.getElementById('postTags');
    tagsContainer.innerHTML = post.tags.map(tag =>
      `<span class="post-tag">${tag}</span>`
    ).join('');

    postView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', `#post-${post.slug}`);
  }

  if (backBtn) {
    backBtn.addEventListener('click', function() {
      postView.style.display = 'none';
      document.getElementById('blog-grid').style.display = '';
      history.pushState(null, '', '#blog-grid');
      window.scrollTo({ top: document.getElementById('blog-grid').offsetTop - 80, behavior: 'smooth' });
    });
  }

  function checkHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#post-')) {
      const slug = hash.replace('#post-', '');
      fetch('posts.json')
        .then(res => res.json())
        .then(data => {
          const post = data.posts.find(p => p.slug === slug);
          if (post) {
            renderPostCards(data.posts);
            setTimeout(() => showPost(post), 100);
          }
        })
        .catch(() => {});
    }
  }

  setTimeout(checkHash, 300);

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
});
