const THEME_KEY = 'tema';

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (error) {
    return null;
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (meta) {
    meta.content = theme === 'dark' ? '#100e13' : '#faf7f2';
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {}
}

function initTheme() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  applyTheme(document.documentElement.dataset.theme || 'light');

  toggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    toggle.setAttribute('aria-label', next === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
  });

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      if (!getStoredTheme()) {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    });
}

function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setOpen(false);
  });
}

function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-stuck', window.scrollY > 8);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
    observer.observe(item);
  });
}

function initFilters() {
  const buttons = document.querySelectorAll('.filter');
  const grid = document.getElementById('postsGrid');
  const empty = document.getElementById('emptyState');
  if (!buttons.length || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.card'));

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      buttons.forEach((other) => {
        other.setAttribute('aria-pressed', String(other === button));
      });

      let visible = 0;

      cards.forEach((card) => {
        const tags = (card.dataset.tags || '').split(/\s+/);
        const show = filter === 'todos' || tags.includes(filter);
        card.classList.toggle('is-hidden', !show);
        if (show) visible += 1;
      });

      if (empty) {
        empty.classList.toggle('is-visible', visible === 0);
      }
    });
  });
}

function initProgressBar() {
  const bar = document.getElementById('progressBar');
  const article = document.querySelector('.prose');
  if (!bar) return;

  const update = () => {
    const reference = article || document.body;
    const start = reference.offsetTop;
    const total = reference.offsetHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY - start) / total : 0;
    bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count-posts]');
  if (!counters.length) return;

  const cards = document.querySelectorAll('#postsGrid .card');
  const featured = document.querySelector('.featured');
  const total = cards.length + (featured ? 1 : 0);

  counters.forEach((el) => {
    el.textContent = `${total} ${total === 1 ? 'texto' : 'textos'}`;
  });
}

function initToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;

  let timer;
  window.showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };
}

function initShare() {
  const buttons = document.querySelectorAll('[data-share]');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const shareData = {
        title: document.title,
        text: document.querySelector('meta[name="description"]')?.content || '',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          return;
        }
      }

      try {
        await navigator.clipboard.writeText(window.location.href);
        if (window.showToast) window.showToast('Link copiado para a área de transferência');
      } catch (error) {
        if (window.showToast) window.showToast('Não foi possível copiar o link');
      }
    });
  });
}

function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

function init() {
  initTheme();
  initMenu();
  initStickyHeader();
  initReveal();
  initFilters();
  initProgressBar();
  initCounters();
  initToast();
  initShare();
  initYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}